import { Router } from 'express';
import { createEvent, listAvailableSeats } from '../controllers/eventController';

const router = Router();

/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create a new event
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
 *     responses:
 *       200:
 *         description: Event created
 */
router.post('/', createEvent);

/**
 * @openapi
 * /events/{eventId}/seats:
 *   get:
 *     summary: List available seats for an event
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         description: ID of the event
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of available seats
 */
router.get('/:eventId/seats', listAvailableSeats);

export default router;
