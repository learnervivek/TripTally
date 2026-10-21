import app from './src/app.js';
import { connectDB } from './src/config/db.js';

connectDB().catch(console.error);

export default app;
