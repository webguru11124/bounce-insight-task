import { Router, Request, Response } from 'express';
import { nasaService } from '../services/nasa';

const router = Router();

router.get('/apod', async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    const data = await nasaService.getAPOD(date as string);
    res.json(data);
  } catch (error) {
    console.error('Error fetching APOD:', error);
    res.status(500).json({ error: 'Failed to fetch Astronomy Picture of the Day' });
  }
});

router.get('/apod/range', async (req: Request, res: Response) => {
  try {
    const { start_date, end_date } = req.query;
    
    if (!start_date || !end_date) {
      return res.status(400).json({ error: 'start_date and end_date are required' });
    }
    
    const data = await nasaService.getAPODRange(start_date as string, end_date as string);
    res.json(data);
  } catch (error) {
    console.error('Error fetching APOD range:', error);
    res.status(500).json({ error: 'Failed to fetch APOD range' });
  }
});

router.get('/mars-photos/:rover', async (req: Request, res: Response) => {
  try {
    const { rover } = req.params;
    const { sol, earth_date } = req.query;
    
    let data;
    if (earth_date) {
      data = await nasaService.getMarsRoverPhotosByDate(rover, earth_date as string);
    } else {
      data = await nasaService.getMarsRoverPhotos(rover, sol ? parseInt(sol as string) : 1000);
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching Mars photos:', error);
    res.status(500).json({ error: 'Failed to fetch Mars rover photos' });
  }
});

router.get('/neo', async (req: Request, res: Response) => {
  try {
    const { start_date, end_date } = req.query;
    
    if (!start_date || !end_date) {
      return res.status(400).json({ error: 'start_date and end_date are required' });
    }
    
    const data = await nasaService.getNearEarthObjects(start_date as string, end_date as string);
    res.json(data);
  } catch (error) {
    console.error('Error fetching NEO data:', error);
    res.status(500).json({ error: 'Failed to fetch Near Earth Objects data' });
  }
});

router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    
    const data = await nasaService.searchNASAImageLibrary(q as string);
    res.json(data);
  } catch (error) {
    console.error('Error searching NASA image library:', error);
    res.status(500).json({ error: 'Failed to search NASA image library' });
  }
});

router.get('/earth-imagery', async (req: Request, res: Response) => {
  try {
    const { lat, lon, date } = req.query;
    
    if (!lat || !lon || !date) {
      return res.status(400).json({ error: 'lat, lon, and date are required' });
    }
    
    const data = await nasaService.getEarthImagery(
      parseFloat(lat as string), 
      parseFloat(lon as string), 
      date as string
    );
    res.json(data);
  } catch (error) {
    console.error('Error fetching Earth imagery:', error);
    res.status(500).json({ error: 'Failed to fetch Earth imagery' });
  }
});

export default router;