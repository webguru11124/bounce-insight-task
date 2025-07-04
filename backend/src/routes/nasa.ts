import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const router = express.Router();

const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const NASA_API_URL = 'https://api.nasa.gov';

// simple async wrapper to forward errors with custom messages
const asyncHandler = (
  fn: (req: Request, res: Response) => Promise<void | Response>,
  message = 'Internal Server Error'
) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch((err) => {
      console.error(err);
      next(new Error(message));
    });
  };

// Astronomy Picture of the Day
router.get(
  '/apod',
  asyncHandler(
    async (_req: Request, res: Response) => {
      const { data } = await axios.get(`${NASA_API_URL}/planetary/apod`, {
        params: { api_key: NASA_API_KEY },
      });
      res.json(data);
    },
    'Failed to fetch APOD data'
  )
);

// Mars Rover photos
router.get(
  '/mars-photos',
  asyncHandler(
    async (req: Request, res: Response) => {
      const { rover = 'curiosity', sol = '1000' } = req.query as Record<string, string>;
      const solNum = parseInt(sol, 10) || 1000;
      const { data } = await axios.get(
        `${NASA_API_URL}/mars-photos/api/v1/rovers/${rover}/photos`,
        {
          params: { sol: solNum, api_key: NASA_API_KEY },
        }
      );
      res.json(data);
    },
    'Failed to fetch Mars photos'
  )
);

// Search the NASA image and video library
router.get(
  '/search-images',
  asyncHandler(
    async (req: Request, res: Response) => {
      const { q } = req.query as Record<string, string>;
      if (!q) return res.status(400).json({ error: 'query parameter q is required' });
      const { data } = await axios.get('https://images-api.nasa.gov/search', {
        params: { q },
      });
      res.json(data);
    },
    'Failed to search images'
  )
);

// Near Earth Object feed
router.get(
  '/neo',
  asyncHandler(
    async (req: Request, res: Response) => {
      const { start_date, end_date } = req.query as Record<string, string>;
      if (!start_date || !end_date) {
        return res
          .status(400)
          .json({ error: 'start_date and end_date are required' });
      }
      const { data } = await axios.get(`${NASA_API_URL}/neo/rest/v1/feed`, {
        params: { start_date, end_date, api_key: NASA_API_KEY },
      });
      res.json(data);
    },
    'Failed to fetch NEO data'
  )
);

// Latest EPIC images
router.get(
  '/epic',
  asyncHandler(
    async (_req: Request, res: Response) => {
      const { data } = await axios.get('https://epic.gsfc.nasa.gov/api/natural');
      res.json(data);
    },
    'Failed to fetch EPIC images'
  )
);

export default router;

