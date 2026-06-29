import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../app.js';

describe('Express app', () => {
  it('responds on GET /', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});