import { Request, Response } from 'express';
import { holdSeat, reserveSeat, refreshHold } from './seatController';
import { holdSeatService, reserveSeatService, refreshHoldService } from '../services/seat';

jest.mock('../services/seat');

describe('Seat Controller', () => {
  it('should hold a seat and return status 200', async () => {
    const req = {
      params: { eventId: '1', seatId: '1' },
      body: { userId: 'user1' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (holdSeatService as jest.Mock).mockResolvedValue({
      eventId: '1',
      seatId: '1',
      status: 'held',
      userId: 'user1',
    });

    await holdSeat(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      eventId: '1',
      seatId: '1',
      status: 'held',
      userId: 'user1',
    });
  });

  it('should reserve a seat and return status 200', async () => {
    const req = {
      params: { eventId: '1', seatId: '1' },
      body: { userId: 'user1' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (reserveSeatService as jest.Mock).mockResolvedValue({
      eventId: '1',
      seatId: '1',
      status: 'reserved',
      userId: 'user1',
    });

    await reserveSeat(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      eventId: '1',
      seatId: '1',
      status: 'reserved',
      userId: 'user1',
    });
  });

  it('should refresh a seat hold and return status 200', async () => {
    const req = {
      params: { eventId: '1', seatId: '1' },
      body: { userId: 'user1' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (refreshHoldService as jest.Mock).mockResolvedValue({
      eventId: '1',
      seatId: '1',
      status: 'hold refreshed',
      userId: 'user1',
    });

    await refreshHold(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      eventId: '1',
      seatId: '1',
      status: 'hold refreshed',
      userId: 'user1',
    });
  });

  it('should handle errors and return status 500', async () => {
    const req = {
      params: { eventId: '1', seatId: '1' },
      body: { userId: 'user1' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    (reserveSeatService as jest.Mock).mockRejectedValue(new Error('Service Error'));

    await reserveSeat(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Service Error' });
  });
});
