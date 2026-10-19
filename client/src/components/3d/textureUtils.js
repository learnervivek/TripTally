import * as THREE from 'three';

let cachedEarthTexture = null;

/**
 * Procedurally creates a high-resolution, stylized Earth map texture.
 * Completely offline, zero external image dependencies, instant loading.
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

  // 1. Ocean Background: Deep boutique forest-navy gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#061611');
  oceanGrad.addColorStop(0.3, '#0B231B');
  oceanGrad.addColorStop(0.5, '#0D2B21');
  oceanGrad.addColorStop(0.7, '#0B231B');
  oceanGrad.addColorStop(1, '#061611');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Latitude & Longitude Meridians
  ctx.strokeStyle = 'rgba(82, 183, 136, 0.08)';
  ctx.lineWidth = 1;

  // Latitudes
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Equator Highlight
  ctx.strokeStyle = 'rgba(224, 122, 95, 0.18)'; // Subtle terracotta
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();

  // Longitudes
  ctx.strokeStyle = 'rgba(82, 183, 136, 0.08)';
  ctx.lineWidth = 1;
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Helper to map lat/lon to canvas coordinates
  const toCanvas = (lon, lat) => [
    ((lon + 180) / 360) * width,
    ((90 - lat) / 180) * height,
  ];

  // Helper to draw filled landmass polygon with subtle coastal rim
  const drawLandmass = (points, fillColor = '#1B4332', strokeColor = '#52B788') => {
    if (points.length < 3) return;
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
    ctx.lineWidth = 1.5;
    ctx.stroke();
  };

  // 3. Simplified Continents Polygons (Equirectangular lon/lat coordinates)
  // North America
  drawLandmass([
    [-168, 65], [-140, 70], [-100, 72], [-65, 60], [-55, 48],
    [-70, 42], [-75, 35], [-81, 25], [-97, 26], [-90, 16],
    [-83, 9], [-77, 8], [-82, 15], [-105, 20], [-115, 30],
    [-124, 40], [-130, 52], [-160, 58], [-168, 65]
  ], '#15392B', '#2D6A4F');

  // Greenland
  drawLandmass([
    [-52, 60], [-35, 65], [-20, 78], [-40, 83], [-55, 75], [-52, 60]
  ], '#15392B', '#2D6A4F');

  // South America
  drawLandmass([
    [-77, 8], [-60, 10], [-50, 0], [-35, -5], [-38, -15],
    [-50, -30], [-65, -55], [-75, -50], [-70, -35], [-78, -15],
    [-81, -5], [-77, 8]
  ], '#15392B', '#2D6A4F');

  // Europe & UK
  drawLandmass([
    [-10, 36], [0, 43], [15, 40], [28, 41], [30, 47],
    [25, 55], [15, 58], [5, 53], [-4, 48], [-9, 43], [-10, 36]
  ], '#1B4332', '#40916C');

  // Scandinavia
  drawLandmass([
    [5, 58], [15, 58], [25, 70], [18, 71], [10, 64], [5, 58]
  ], '#1B4332', '#40916C');

  // Africa
  drawLandmass([
    [-17, 32], [-5, 36], [12, 38], [25, 32], [32, 31],
    [43, 12], [51, 11], [40, -10], [33, -28], [26, -34],
    [18, -34], [12, -18], [9, 4], [-15, 12], [-17, 21], [-17, 32]
  ], '#15392B', '#2D6A4F');

  // Asia
  drawLandmass([
    [32, 31], [40, 38], [50, 40], [60, 55], [70, 70],
    [110, 75], [170, 68], [160, 55], [140, 52], [130, 42],
    [122, 32], [108, 22], [105, 10], [98, 8], [80, 13],
    [68, 24], [58, 24], [45, 13], [35, 28], [32, 31]
  ], '#173F30', '#2D6A4F');

  // India Subcontinent
  drawLandmass([
    [68, 24], [78, 30], [88, 25], [83, 16], [80, 8], [76, 10], [72, 18], [68, 24]
  ], '#173F30', '#2D6A4F');

  // Japan
  drawLandmass([
    [130, 32], [133, 34], [138, 37], [141, 43], [141, 45], [139, 41], [135, 35], [130, 32]
  ], '#1B4332', '#52B788');

  // Southeast Asia / Indonesia / Bali
  drawLandmass([
    [98, 8], [104, 2], [108, -7], [115, -8], [120, -5],
    [128, -8], [114, -9], [105, -5], [96, 5], [98, 8]
  ], '#1B4332', '#52B788');

  // Australia
  drawLandmass([
    [114, -22], [125, -15], [138, -12], [148, -20], [153, -28],
    [150, -38], [138, -36], [128, -32], [116, -35], [113, -25], [114, -22]
  ], '#15392B', '#2D6A4F');

  // 4. City Lights & Population Dots (Stippling aesthetic)
  ctx.fillStyle = 'rgba(253, 252, 249, 0.75)';
  const cityDots = [
    [-74, 40.7], [-0.1, 51.5], [2.35, 48.8], [139.7, 35.7],
    [115.2, -8.4], [14.6, 40.6], [-21.9, 64.1], [151.2, -33.8],
    [77.2, 28.6], [-122.4, 37.8], [-43.2, -22.9], [55.3, 25.2],
    [31.2, 30.0], [121.5, 31.2], [103.8, 1.3], [12.5, 41.9],
    [-3.7, 40.4], [13.4, 52.5], [4.9, 52.4], [28.0, -26.2]
  ];

  for (const [lon, lat] of cityDots) {
    const [cx, cy] = toCanvas(lon, lat);
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();

    // Subtle glow ring
    ctx.fillStyle = 'rgba(224, 122, 95, 0.4)';
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(253, 252, 249, 0.75)';
  }

  // 5. Wrap into Three.js CanvasTexture
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;

  cachedEarthTexture = texture;
  return texture;
}
