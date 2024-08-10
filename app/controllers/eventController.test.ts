import { Request, Response } from 'express';
import { createEvent } from './eventController';
import { createEventService } from '../services/event';

jest.mock('../services/event');

describe('Event Controller', () => {
  it('should create an event and return status 201', async () => {
    const req = {
      body: {
        name: 'Test Event',
        type: 'concert',
        totalSeats: 100,
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (createEventService as jest.Mock).mockResolvedValue({
      id: '1',
      name: 'Test Event',
      type: 'concert',
      totalSeats: 100,
      availableSeats: 100,
      heldSeats: [],
      reservedSeats: [],
    });

    await createEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: '1',
      name: 'Test Event',
      type: 'concert',
      totalSeats: 100,
      availableSeats: 100,
      heldSeats: [],
      reservedSeats: [],
    });
  });

  it('should handle errors and return status 500', async () => {
    const req = {
      body: {
        name: 'Test Event',
        type: 'concert',
        totalSeats: 100,
      },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (createEventService as jest.Mock).mockRejectedValue(new Error('Service Error'));

    await createEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Service Error' });
  });
});
