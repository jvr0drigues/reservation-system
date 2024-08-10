import { redisClient } from '../config/redis';
import { v4 as uuidv4 } from 'uuid';
import { Event, createEvent } from '../models/event';

export const createEventService = async (eventData: Event) => {
  
  const eventId = uuidv4();

  const event = createEvent(
    eventId,
    eventData.name,
    eventData.type,
    eventData.totalSeats,
    eventData.totalSeats,
    [],
    [],
  );

  await redisClient.set(eventId, JSON.stringify(event));
  return event;
};

export const listAvailableSeatsService = async (eventId: string) => {
  const eventString = await redisClient.get(eventId);
  if (!eventString) {
    throw new Error('Event not found');
  }
  const event: Event = JSON.parse(eventString);
  const availableSeats = event.totalSeats - event.heldSeats.length - event.reservedSeats.length;
  return { eventId, availableSeats };
};
