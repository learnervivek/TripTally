import * as THREE from 'three';

let cachedEarthTexture = null;

/**
 * Procedurally creates a radiant, ultra-detailed high-tech Earth map texture.
 * Completely offline, zero external image assets, instant 60fps loading.
 * Highlights the Indian subcontinent, flight hubs, and continent contours.
 */
export function getProceduralEarthTexture() {
  if (cachedEarthTexture) {
    return cachedEarthTexture;
  }

  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.Texture();
  }

  // 1. Deep Oceanic Gradient: Deep emerald-sapphire obsidian
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#040d0a');
  oceanGrad.addColorStop(0.25, '#071813');
  oceanGrad.addColorStop(0.5, '#0a221b');
  oceanGrad.addColorStop(0.75, '#071813');
  oceanGrad.addColorStop(1, '#040d0a');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. High-Tech Hexagonal & Dot-Matrix Oceanic Grid
  ctx.strokeStyle = 'rgba(82, 183, 136, 0.07)';
  ctx.lineWidth = 1;

  // Latitudes
  for (let lat = -80; lat <= 80; lat += 15) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Longitudes
  for (let lon = -180; lon <= 180; lon += 20) {
    const x = ((lon + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Equator Highlight
  ctx.strokeStyle = 'rgba(224, 122, 95, 0.25)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();

  // Tropic of Cancer (passes through India at ~23.5° N)
  const tropicY = ((90 - 23.5) / 180) * height;
  ctx.strokeStyle = 'rgba(82, 183, 136, 0.22)';
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(0, tropicY);
  ctx.lineTo(width, tropicY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Helper to map lon/lat to canvas
  const toCanvas = (lon, lat) => [
    ((lon + 180) / 360) * width,
    ((90 - lat) / 180) * height,
  ];

  // Helper to draw landmass polygon with radiant illuminated coastal border
  const drawLandmass = (points, fillColor = '#103023', strokeColor = '#34d399', glowColor = 'rgba(52, 211, 153, 0.2)') => {
    if (points.length < 3) return;
    
    // Outer coastal glow
    ctx.save();
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 12;

    ctx.beginPath();
    const [startX, startY] = toCanvas(points[0][0], points[0][1]);
    ctx.moveTo(startX, startY);
    for (let i = 1; i < points.length; i++) {
      const [px, py] = toCanvas(points[i][0], points[i][1]);
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Fill inner landmass with subtle dot lattice
    const minX = Math.min(...points.map((p) => toCanvas(p[0], p[1])[0]));
    const maxX = Math.max(...points.map((p) => toCanvas(p[0], p[1])[0]));
    const minY = Math.min(...points.map((p) => toCanvas(p[0], p[1])[1]));
    const maxY = Math.max(...points.map((p) => toCanvas(p[0], p[1])[1]));

    ctx.save();
    ctx.clip(); // Clip to the polygon
    ctx.fillStyle = 'rgba(82, 183, 136, 0.18)';
    for (let gx = minX; gx <= maxX; gx += 10) {
      for (let gy = minY; gy <= maxY; gy += 10) {
        ctx.beginPath();
        ctx.arc(gx, gy, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  };

  // 3. Draw Detailed Continents
  // North America
  drawLandmass([
    [-168, 65], [-140, 70], [-100, 72], [-65, 60], [-55, 48],
    [-70, 42], [-75, 35], [-81, 25], [-97, 26], [-90, 16],
    [-83, 9], [-77, 8], [-82, 15], [-105, 20], [-115, 30],
    [-124, 40], [-130, 52], [-160, 58], [-168, 65]
  ], '#0d281e', '#2d6a4f', 'rgba(45,106,79,0.3)');

  // South America
  drawLandmass([
    [-77, 8], [-60, 10], [-50, 0], [-35, -5], [-38, -15],
    [-50, -30], [-65, -55], [-75, -50], [-70, -35], [-78, -15],
    [-81, -5], [-77, 8]
  ], '#0d281e', '#2d6a4f', 'rgba(45,106,79,0.3)');

  // Europe & UK
  drawLandmass([
    [-10, 36], [0, 43], [15, 40], [28, 41], [30, 47],
    [25, 55], [15, 58], [5, 53], [-4, 48], [-9, 43], [-10, 36]
  ], '#12382a', '#40916c', 'rgba(64,145,108,0.3)');

  // Scandinavia
  drawLandmass([
    [5, 58], [15, 58], [25, 70], [18, 71], [10, 64], [5, 58]
  ], '#12382a', '#40916c', 'rgba(64,145,108,0.3)');

  // Africa
  drawLandmass([
    [-17, 32], [-5, 36], [12, 38], [25, 32], [32, 31],
    [43, 12], [51, 11], [40, -10], [33, -28], [26, -34],
    [18, -34], [12, -18], [9, 4], [-15, 12], [-17, 21], [-17, 32]
  ], '#0d281e', '#2d6a4f', 'rgba(45,106,79,0.3)');

  // Asia (Mainland)
  drawLandmass([
    [32, 31], [40, 38], [50, 40], [60, 55], [70, 70],
    [110, 75], [170, 68], [160, 55], [140, 52], [130, 42],
    [122, 32], [108, 22], [105, 10], [98, 8], [90, 22],
    [68, 24], [58, 24], [45, 13], [35, 28], [32, 31]
  ], '#0e2b20', '#2d6a4f', 'rgba(45,106,79,0.3)');

  // 4. Special Detailed & Highlighted Indian Subcontinent (Rich emerald with golden/terracotta radiance)
  drawLandmass([
    [68, 24], // Gujarat Rann of Kutch
    [72, 21], // Gujarat Gulf of Khambhat
    [72.8, 19], // Mumbai / Maharashtra coast
    [74, 15], // Goa / Konkan coast
    [76, 10], // Kerala Malabar coast (Kochi/Alleppey)
    [77.5, 8.1], // Kanyakumari southern tip
    [80, 13], // Coromandel coast (Chennai)
    [83, 18], // Andhra coast (Vizag)
    [87, 22], // Odisha coast
    [89, 22], // Bengal Delta (Sundarbans)
    [92, 25], // Meghalaya / Northeast Hills
    [95, 27], // Arunachal / Assam Brahmaputra
    [88, 27], // Sikkim / Darjeeling
    [80, 30], // Uttarakhand Himalayas
    [75, 34], // Kashmir / Srinagar / Gulmarg
    [77.5, 34.5], // Ladakh / Karakoram
    [74, 32], // Himachal Pradesh (Manali / Solang)
    [70, 28], // Thar Desert / Rajasthan (Jaipur)
    [68, 24]  // Back to Kutch
  ], '#164836', '#52b788', 'rgba(82,183,136,0.5)');

  // Southeast Asia / Indonesia / Bali
  drawLandmass([
    [98, 8], [104, 2], [108, -7], [115, -8], [120, -5],
    [128, -8], [114, -9], [105, -5], [96, 5], [98, 8]
  ], '#12382a', '#40916c', 'rgba(64,145,108,0.3)');

  // Australia
  drawLandmass([
    [114, -22], [125, -15], [138, -12], [148, -20], [153, -28],
    [150, -38], [138, -36], [128, -32], [116, -35], [113, -25], [114, -22]
  ], '#0d281e', '#2d6a4f', 'rgba(45,106,79,0.3)');

  // 5. Radiant City Light Constellations & Indian City Nodes
  const indianHubs = [
    { lon: 77.2, lat: 28.6, name: 'Delhi', major: true },
    { lon: 77.2, lat: 32.2, name: 'Manali', major: true },
    { lon: 74.8, lat: 34.1, name: 'Srinagar', major: true },
    { lon: 77.6, lat: 34.2, name: 'Ladakh', major: true },
    { lon: 75.8, lat: 26.9, name: 'Jaipur', major: true },
    { lon: 74.1, lat: 15.3, name: 'Goa', major: true },
    { lon: 76.3, lat: 9.5, name: 'Kerala', major: true },
    { lon: 83.0, lat: 25.3, name: 'Varanasi', major: true },
    { lon: 91.9, lat: 25.6, name: 'Meghalaya', major: true },
    { lon: 78.3, lat: 30.1, name: 'Rishikesh', major: true },
    { lon: 72.8, lat: 19.1, name: 'Mumbai', major: true },
    { lon: 77.6, lat: 12.9, name: 'Bangalore', major: false },
    { lon: 88.3, lat: 22.6, name: 'Kolkata', major: false },
    { lon: 55.3, lat: 25.2, name: 'Dubai', major: true },
  ];

  // Draw connecting luminous network paths between Indian hubs
  ctx.strokeStyle = 'rgba(224, 122, 95, 0.35)';
  ctx.lineWidth = 1.2;
  const connections = [
    [0, 1], // Delhi - Manali
    [1, 2], // Manali - Srinagar
    [2, 3], // Srinagar - Ladakh
    [0, 4], // Delhi - Jaipur
    [4, 7], // Jaipur - Varanasi
    [7, 8], // Varanasi - Meghalaya
    [10, 5], // Mumbai - Goa
    [5, 6], // Goa - Kerala
    [0, 9], // Delhi - Rishikesh
    [10, 13], // Mumbai - Dubai
  ];

  for (const [fromIdx, toIdx] of connections) {
    const from = indianHubs[fromIdx];
    const to = indianHubs[toIdx];
    if (from && to) {
      const [x1, y1] = toCanvas(from.lon, from.lat);
      const [x2, y2] = toCanvas(to.lon, to.lat);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }

  // Draw glowing city light beacons
  for (const city of indianHubs) {
    const [cx, cy] = toCanvas(city.lon, city.lat);

    // Outer glow ring
    ctx.fillStyle = city.major ? 'rgba(224, 122, 95, 0.45)' : 'rgba(52, 211, 153, 0.35)';
    ctx.beginPath();
    ctx.arc(cx, cy, city.major ? 7 : 4, 0, Math.PI * 2);
    ctx.fill();

    // Core bright star
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, city.major ? 2.5 : 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 6. Wrap into Three.js CanvasTexture with high filtering
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  cachedEarthTexture = texture;
  return texture;
}
