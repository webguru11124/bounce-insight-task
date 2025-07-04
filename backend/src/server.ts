import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import nasaRouter from './routes/nasa.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.NASA_API_KEY) {
  console.warn(
    'Warning: NASA_API_KEY not set, using DEMO_KEY which is heavily rate limited.'
  );
}


// mount API routes under /api
app.use('/api', nasaRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// basic error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
