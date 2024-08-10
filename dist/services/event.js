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
exports.listAvailableSeatsService = exports.createEventService = void 0;
const redis_1 = require("../config/redis");
const uuid_1 = require("uuid");
const event_1 = require("../models/event");
const createEventService = (eventData) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = (0, uuid_1.v4)();
    const event = (0, event_1.createEvent)(eventId, eventData.name, eventData.type, eventData.totalSeats, eventData.totalSeats, [], []);
    yield redis_1.redisClient.set(eventId, JSON.stringify(event));
    return event;
});
exports.createEventService = createEventService;
const listAvailableSeatsService = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const eventString = yield redis_1.redisClient.get(eventId);
    if (!eventString) {
        throw new Error('Event not found');
    }
    const event = JSON.parse(eventString);
    const availableSeats = event.totalSeats - event.heldSeats.length - event.reservedSeats.length;
    return { eventId, availableSeats };
});
exports.listAvailableSeatsService = listAvailableSeatsService;
