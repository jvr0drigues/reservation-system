"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = void 0;
const createEvent = (id, name, type, totalSeats, availableSeats, heldSeats, reservedSeats) => {
    return {
        id,
        name,
        type,
        totalSeats,
        availableSeats,
        heldSeats,
        reservedSeats
    };
};
exports.createEvent = createEvent;
