import request from 'supertest';
import express from 'express';
import nasaRouter from '../routes/nasa';
import axios from 'axios';

jest.mock('axios');

const app = express();
app.use('/api', nasaRouter);

describe('NASA routes', () => {
  it('fetches APOD', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { title: 'test' } });

    const res = await request(app).get('/api/apod');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('test');
  });

  it('fetches Mars photos', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { photos: [] } });
    const res = await request(app).get('/api/mars-photos?rover=curiosity&sol=1');
    expect(res.status).toBe(200);
    expect(res.body.photos).toEqual([]);
  });

  it('searches images', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { items: [] } });
    const res = await request(app).get('/api/search-images?q=moon');
    expect(res.status).toBe(200);
    expect(res.body.items).toEqual([]);
  });

  it('validates search query', async () => {
    const res = await request(app).get('/api/search-images');
    expect(res.status).toBe(400);
  });

  it('fetches NEO feed', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { near_earth_objects: [] } });
    const res = await request(app).get('/api/neo?start_date=2024-01-01&end_date=2024-01-01');
    expect(res.status).toBe(200);
  });

  it('fetches EPIC images', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    const res = await request(app).get('/api/epic');
    expect(res.status).toBe(200);
  });
});
