import { describe, expect, it, vi } from 'vitest';
import mongoose from 'mongoose';
import connectDB from '../config/db/connectDB.js';

describe('Database connection', () => {
  it('logs an error when MONGO_URI is missing', async () => {
    const originalUri = process.env.MONGO_URI;
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      delete process.env.MONGO_URI;

      await connectDB();

      expect(errorSpy).toHaveBeenCalledWith('Error connecting to MongoDB: MONGO_URI is not defined in environment variables');
    }
    finally {
      errorSpy.mockRestore();
      process.env.MONGO_URI = originalUri;
    }
  });

  it('connects when MONGO_URI is provided', async () => {
    const originalConnect = mongoose.connect;
    const originalUri = process.env.MONGO_URI;
    process.env.MONGO_URI = 'mongodb://127.0.0.1:27017/test';

    mongoose.connect = async () => ({
      connection: { host: '127.0.0.1' }
    });

    await expect(connectDB()).resolves.toBeUndefined();

    mongoose.connect = originalConnect;
    process.env.MONGO_URI = originalUri;
  });
});