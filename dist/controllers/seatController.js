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
exports.refreshHold = exports.reserveSeat = exports.holdSeat = void 0;
const seat_1 = require("../services/seat");
/**
 * @swagger
 * /{eventId}/seats/{seatId}/hold:
 *   post:
 *     summary: Hold a seat for an event
 *     description: Holds a seat for a specific event and seat ID.
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         description: ID of the event
 *         schema:
 *           type: string
 *       - name: seatId
 *         in: path
 *         required: true
 *         description: ID of the seat
 *         schema:
 *           type: string
 *       - name: userId
 *         in: body
 *         required: true
 *         description: ID of the user holding the seat
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *     responses:
 *       200:
 *         description: Seat successfully held
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
const holdSeat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, seatId } = req.params;
        const { userId } = req.body;
        const result = yield (0, seat_1.holdSeatService)(eventId, seatId, userId);
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
});
exports.holdSeat = holdSeat;
/**
 * @swagger
 * /{eventId}/seats/{seatId}/reserve:
 *   post:
 *     summary: Reserve a seat for an event
 *     description: Reserves a seat for a specific event and seat ID.
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         description: ID of the event
 *         schema:
 *           type: string
 *       - name: seatId
 *         in: path
 *         required: true
 *         description: ID of the seat
 *         schema:
 *           type: string
 *       - name: userId
 *         in: body
 *         required: true
 *         description: ID of the user reserving the seat
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *     responses:
 *       200:
 *         description: Seat successfully reserved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
const reserveSeat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, seatId } = req.params;
        const { userId } = req.body;
        const result = yield (0, seat_1.reserveSeatService)(eventId, seatId, userId);
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
});
exports.reserveSeat = reserveSeat;
/**
 * @swagger
 * /{eventId}/seats/{seatId}/refresh:
 *   post:
 *     summary: Refresh a seat hold
 *     description: Refreshes the hold status of a seat for a specific event and seat ID.
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         description: ID of the event
 *         schema:
 *           type: string
 *       - name: seatId
 *         in: path
 *         required: true
 *         description: ID of the seat
 *         schema:
 *           type: string
 *       - name: userId
 *         in: body
 *         required: true
 *         description: ID of the user refreshing the hold
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *     responses:
 *       200:
 *         description: Seat hold successfully refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
const refreshHold = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId, seatId } = req.params;
        const { userId } = req.body;
        const result = yield (0, seat_1.refreshHoldService)(eventId, seatId, userId);
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
});
exports.refreshHold = refreshHold;
