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
exports.listAvailableSeats = exports.createEvent = void 0;
const event_1 = require("../services/event");
/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create an event
 *     description: Create a new event with the given details
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               totalSeats:
 *                 type: integer
 *             required:
 *               - name
 *               - type
 *               - totalSeats
 *     responses:
 *       201:
 *         description: Event created successfully
 *       500:
 *         description: Internal server error
 */
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield (0, event_1.createEventService)(req.body);
        res.status(201).json(event);
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
exports.createEvent = createEvent;
const listAvailableSeats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const availableSeats = yield (0, event_1.listAvailableSeatsService)(eventId);
        res.status(200).json(availableSeats);
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
exports.listAvailableSeats = listAvailableSeats;
