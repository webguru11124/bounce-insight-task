import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import nasaRoutes from './routes/nasa';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/nasa', nasaRoutes);

const portNumber = typeof PORT === 'string' ? parseInt(PORT) : PORT;

const server = app.listen(portNumber, () => {
  console.log(`🚀 Server running on port ${portNumber}`);
  console.log(`📡 Health check: http://localhost:${portNumber}/api/health`);
  console.log(`🌌 NASA API endpoints: http://localhost:${portNumber}/api/nasa`);
}).on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${portNumber} is in use, trying port ${portNumber + 1}`);
    const newPort = portNumber + 1;
    app.listen(newPort, () => {
      console.log(`🚀 Server running on port ${newPort}`);
      console.log(`📡 Health check: http://localhost:${newPort}/api/health`);
      console.log(`🌌 NASA API endpoints: http://localhost:${newPort}/api/nasa`);
    });
  } else {
    console.error('Server error:', err);
  }
});