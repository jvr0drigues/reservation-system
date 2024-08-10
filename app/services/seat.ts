import { redisClient } from '../config/redis';
import { Event } from '../models/event';
import { holdSeat, reserveSeat } from '../models/seat';

export const holdSeatService = async (eventId: string, seatId: string, userId: string) => {
  const eventString = await redisClient.get(eventId);
  if (!eventString) {
    throw new Error('Event not found');
  }
  const event: Event = JSON.parse(eventString);

  if (event.heldSeats.includes(seatId) || event.reservedSeats.includes(seatId)) {
    throw new Error('Seat is not available');
  }

  const seat = holdSeat({ id: seatId, status: 'available' }, userId, 60000);
  event.heldSeats.push(seat.id);
  await redisClient.set(eventId, JSON.stringify(event));

  // Publish hold event
  await redisClient.publish('seat-hold', JSON.stringify({ eventId, seatId, userId }));

  return { eventId, seatId, userId, status: 'held' };
};

export const reserveSeatService = async (eventId: string, seatId: string, userId: string) => {
  const eventString = await redisClient.get(eventId);
  if (!eventString) {
    throw new Error('Event not found');
  }
  const event: Event = JSON.parse(eventString);

  if (!event.heldSeats.includes(seatId)) {
    throw new Error('Seat is not held by this user');
  }

  const seat = reserveSeat({ id: seatId, status: 'held', heldBy: userId }, userId);
  event.heldSeats = event.heldSeats.filter((id) => id !== seatId);
  event.reservedSeats.push(seat.id);
  await redisClient.set(eventId, JSON.stringify(event));

  // Publish reserve event
  await redisClient.publish('seat-reserved', JSON.stringify({ eventId, seatId, userId }));

  return { eventId, seatId, userId, status: 'reserved' };
};

export const refreshHoldService = async (eventId: string, seatId: string, userId: string) => {
  const eventString = await redisClient.get(eventId);
  if (!eventString) {
    throw new Error('Event not found');
  }
  const event: Event = JSON.parse(eventString);

  if (!event.heldSeats.includes(seatId)) {
    throw new Error('Seat is not held by this user');
  }

  await redisClient.set(eventId, JSON.stringify(event));

  // Re-publish hold event to refresh the hold
  await redisClient.publish('seat-hold', JSON.stringify({ eventId, seatId, userId }));

  return { eventId, seatId, userId, status: 'hold refreshed' };
};
