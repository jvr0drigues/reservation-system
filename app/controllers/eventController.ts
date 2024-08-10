import { Request, Response } from 'express';
import { createEventService, listAvailableSeatsService } from '../services/event';

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
export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await createEventService(req.body);
    res.status(201).json(event);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};

export const listAvailableSeats = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const availableSeats = await listAvailableSeatsService(eventId);
    res.status(200).json(availableSeats);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};
