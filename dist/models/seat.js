"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshHold = exports.reserveSeat = exports.holdSeat = exports.createSeat = void 0;
const createSeat = (id) => {
    return {
        id,
        status: 'available'
    };
};
exports.createSeat = createSeat;
const holdSeat = (seat, userId, holdDuration) => {
    return Object.assign(Object.assign({}, seat), { status: 'held', heldBy: userId, holdExpiry: Date.now() + holdDuration });
};
exports.holdSeat = holdSeat;
const reserveSeat = (seat, userId) => {
    return Object.assign(Object.assign({}, seat), { status: 'reserved', reservedBy: userId, heldBy: undefined, holdExpiry: undefined });
};
exports.reserveSeat = reserveSeat;
const refreshHold = (seat, holdDuration) => {
    if (seat.status === 'held') {
        return Object.assign(Object.assign({}, seat), { holdExpiry: Date.now() + holdDuration });
    }
    return seat;
};
exports.refreshHold = refreshHold;
