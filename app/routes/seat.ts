import { Router } from 'express';
import { holdSeat, reserveSeat, refreshHold } from '../controllers/seatController';

const router = Router();

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
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/:eventId/seats/:seatId/hold', holdSeat);

/**
 * @swagger
 * /{eventId}/seats/{seatId/reserve:
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
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/:eventId/seats/:seatId/reserve', reserveSeat);

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
 *     responses:
 *       200:
 *         description: Seat hold successfully refreshed
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/:eventId/seats/:seatId/refresh', refreshHold);

export default router;
