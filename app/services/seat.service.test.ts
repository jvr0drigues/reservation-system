import { redisClient } from '../config/redis';
import { holdSeatService, reserveSeatService, refreshHoldService } from './seat';
import { Event } from '../models/event';

jest.mock('../config/redis');

describe('Seat Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should hold a seat for a user', async () => {
    const eventId = '1';
    const seatId = 'A1';
    const userId = 'user1';
    const event: Event = {
      id: eventId,
      name: 'Concert',
      type: 'Music',
      totalSeats: 100,
      availableSeats: 100,
      heldSeats: [],
      reservedSeats: [],
    };

    (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(event));
    (redisClient.set as jest.Mock).mockResolvedValue('OK');
    (redisClient.publish as jest.Mock).mockResolvedValue(1);

    const result = await holdSeatService(eventId, seatId, userId);

    expect(redisClient.get).toHaveBeenCalledWith(eventId);
    expect(redisClient.set).toHaveBeenCalledTimes(1);
    expect(redisClient.publish).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ eventId, seatId, userId, status: 'held' });
  });

  it('should reserve a held seat for a user', async () => {
    const eventId = '1';
    const seatId = 'A1';
    const userId = 'user1';
    const event: Event = {
      id: eventId,
      name: 'Concert',
      type: 'Music',
      totalSeats: 100,
      availableSeats: 100,
      heldSeats: [seatId],
      reservedSeats: [],
    };

    (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(event));
    (redisClient.set as jest.Mock).mockResolvedValue('OK');
    (redisClient.publish as jest.Mock).mockResolvedValue(1);

    const result = await reserveSeatService(eventId, seatId, userId);

    expect(redisClient.get).toHaveBeenCalledWith(eventId);
    expect(redisClient.set).toHaveBeenCalledTimes(1);
    expect(redisClient.publish).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ eventId, seatId, userId, status: 'reserved' });
  });

  it('should refresh hold for a held seat', async () => {
    const eventId = '1';
    const seatId = 'A1';
    const userId = 'user1';
    const event: Event = {
      id: eventId,
      name: 'Concert',
      type: 'Music',
      totalSeats: 100,
      availableSeats: 100,
      heldSeats: [seatId],
      reservedSeats: [],
    };

    (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(event));
    (redisClient.set as jest.Mock).mockResolvedValue('OK');
    (redisClient.publish as jest.Mock).mockResolvedValue(1);

    const result = await refreshHoldService(eventId, seatId, userId);

    expect(redisClient.get).toHaveBeenCalledWith(eventId);
    expect(redisClient.set).toHaveBeenCalledTimes(1);
    expect(redisClient.publish).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ eventId, seatId, userId, status: 'hold refreshed' });
  });

  it('should throw an error if event is not found', async () => {
    const eventId = '1';
    const seatId = 'A1';
    const userId = 'user1';

    (redisClient.get as jest.Mock).mockResolvedValue(null);

    await expect(holdSeatService(eventId, seatId, userId)).rejects.toThrow('Event not found');
  });

  it('should throw an error if seat is not available for hold', async () => {
    const eventId = '1';
    const seatId = 'A1';
    const userId = 'user1';
    const event: Event = {
      id: eventId,
      name: 'Concert',
      type: 'Music',
      totalSeats: 100,
      availableSeats: 100,
      heldSeats: [seatId],
      reservedSeats: [],
    };

    (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(event));

    await expect(holdSeatService(eventId, seatId, userId)).rejects.toThrow('Seat is not available');
  });

  it('should throw an error if seat is not held by the user for reserve', async () => {
    const eventId = '1';
    const seatId = 'A1';
    const userId = 'user1';
    const event: Event = {
      id: eventId,
      name: 'Concert',
      type: 'Music',
      totalSeats: 100,
      availableSeats: 100,
      heldSeats: [],
      reservedSeats: [],
    };

    (redisClient.get as jest.Mock).mockResolvedValue(JSON.stringify(event));

    await expect(reserveSeatService(eventId, seatId, userId)).rejects.toThrow('Seat is not held by this user');
  });
});
