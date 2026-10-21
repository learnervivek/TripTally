import mongoose from 'mongoose';

let cachedPromise = null;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/triptally';

  cachedPromise = mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })
    .then((conn) => {
      console.log(`[MongoDB] Connected: ${conn.connection.host}`);
      return conn;
    })
    .catch((err) => {
      cachedPromise = null;
      console.warn(`[MongoDB] Warning: Could not connect to MongoDB at ${uri}.`);
      console.warn(`[MongoDB] Detail: ${err.message}`);
      console.warn('[MongoDB] Running in standalone development mode. Set MONGODB_URI to connect Atlas in production.');
      return null;
    });

  return cachedPromise;
}

export function getDBStatus() {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const stateCode = mongoose.connection.readyState;
  return {
    state: states[stateCode] || 'unknown',
    isConnected: stateCode === 1,
  };
}

export default connectDB;
