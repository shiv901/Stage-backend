import { Response } from 'express';

// Helper function to handle errors
export const handleError = (
  res: Response,
  message: string = 'Server Error',
  statusCode: number = 500
) => {
  res.status(statusCode).json({ error: message });
};
