"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshHoldService = exports.reserveSeatService = exports.holdSeatService = void 0;
const redis_1 = require("../config/redis");
const seat_1 = require("../models/seat");
const holdSeatService = (eventId, seatId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const eventString = yield redis_1.redisClient.get(eventId);
    if (!eventString) {
        throw new Error('Event not found');
    }
    const event = JSON.parse(eventString);
    if (event.heldSeats.includes(seatId) || event.reservedSeats.includes(seatId)) {
        throw new Error('Seat is not available');
    }
    const seat = (0, seat_1.holdSeat)({ id: seatId, status: 'available' }, userId, 60000);
    event.heldSeats.push(seat.id);
    yield redis_1.redisClient.set(eventId, JSON.stringify(event));
    // Publish hold event
    yield redis_1.redisClient.publish('seat-hold', JSON.stringify({ eventId, seatId, userId }));
    return { eventId, seatId, userId, status: 'held' };
});
exports.holdSeatService = holdSeatService;
const reserveSeatService = (eventId, seatId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const eventString = yield redis_1.redisClient.get(eventId);
    if (!eventString) {
        throw new Error('Event not found');
    }
    const event = JSON.parse(eventString);
    if (!event.heldSeats.includes(seatId)) {
        throw new Error('Seat is not held by this user');
    }
    const seat = (0, seat_1.reserveSeat)({ id: seatId, status: 'held', heldBy: userId }, userId);
    event.heldSeats = event.heldSeats.filter((id) => id !== seatId);
    event.reservedSeats.push(seat.id);
    yield redis_1.redisClient.set(eventId, JSON.stringify(event));
    // Publish reserve event
    yield redis_1.redisClient.publish('seat-reserved', JSON.stringify({ eventId, seatId, userId }));
    return { eventId, seatId, userId, status: 'reserved' };
});
exports.reserveSeatService = reserveSeatService;
const refreshHoldService = (eventId, seatId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const eventString = yield redis_1.redisClient.get(eventId);
    if (!eventString) {
        throw new Error('Event not found');
    }
    const event = JSON.parse(eventString);
    if (!event.heldSeats.includes(seatId)) {
        throw new Error('Seat is not held by this user');
    }
    yield redis_1.redisClient.set(eventId, JSON.stringify(event));
    // Re-publish hold event to refresh the hold
    yield redis_1.redisClient.publish('seat-hold', JSON.stringify({ eventId, seatId, userId }));
    return { eventId, seatId, userId, status: 'hold refreshed' };
});
exports.refreshHoldService = refreshHoldService;
