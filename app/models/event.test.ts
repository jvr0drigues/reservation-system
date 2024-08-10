import { Event, createEvent } from './event';

describe('Event Model', () => {
  it('should create an event with specified properties', () => {
    const eventId = '1';
    const eventName = 'Concert';
    const eventType = 'Music';
    const totalSeats = 100;
    const availableSeats = 80;
    const heldSeats: string[] = ['seat1', 'seat2'];
    const reservedSeats: string[] = ['seat3', 'seat4'];

    const event = createEvent(eventId, eventName, eventType, totalSeats, availableSeats, heldSeats, reservedSeats);

    expect(event).toEqual({
      id: eventId,
      name: eventName,
      type: eventType,
      totalSeats,
      availableSeats,
      heldSeats,
      reservedSeats
    });
  });

  it('should create an event with no held or reserved seats', () => {
    const eventId = '2';
    const eventName = 'Conference';
    const eventType = 'Business';
    const totalSeats = 200;
    const availableSeats = 200;
    const heldSeats: string[] = [];
    const reservedSeats: string[] = [];

    const event = createEvent(eventId, eventName, eventType, totalSeats, availableSeats, heldSeats, reservedSeats);

    expect(event).toEqual({
      id: eventId,
      name: eventName,
      type: eventType,
      totalSeats,
      availableSeats,
      heldSeats,
      reservedSeats
    });
  });

  it('should create an event with some held and reserved seats', () => {
    const eventId = '3';
    const eventName = 'Workshop';
    const eventType = 'Educational';
    const totalSeats = 50;
    const availableSeats = 45;
    const heldSeats: string[] = ['seat1'];
    const reservedSeats: string[] = ['seat2', 'seat3', 'seat4', 'seat5'];

    const event = createEvent(eventId, eventName, eventType, totalSeats, availableSeats, heldSeats, reservedSeats);

    expect(event).toEqual({
      id: eventId,
      name: eventName,
      type: eventType,
      totalSeats,
      availableSeats,
      heldSeats,
      reservedSeats
    });
  });
});
