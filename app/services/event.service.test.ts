import { redisClient } from '../config/redis';
import { createEventService, listAvailableSeatsService } from './event';
import { Event } from '../models/event';

jest.mock('../config/redis');

describe('Event Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an event and save it to Redis', async () => {
    const eventData: Event = {
      id: '',
      name: 'Concert',
      type: 'Music',
      totalSeats: 100,
      availableSeats: 100,
      heldSeats: [],
      reservedSeats: [],
    };

    const result = await createEventService(eventData);

    expect(redisClient.set).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: 'Concert',
      type: 'Music',
      totalSeats: 100,
      availableSeats: 100,
      heldSeats: [],
      reservedSeats: [],
    }));
  });

  it('should list available seats for an event', async () => {
    const eventId = '1';
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

    const result = await listAvailableSeatsService(eventId);

    expect(redisClient.get).toHaveBeenCalledWith(eventId);
    expect(result).toEqual({ eventId, availableSeats: 100 });
  });

  it('should throw an error if event is not found', async () => {
    const eventId = '1';

    (redisClient.get as jest.Mock).mockResolvedValue(null);

    await expect(listAvailableSeatsService(eventId)).rejects.toThrow('Event not found');
  });
});
