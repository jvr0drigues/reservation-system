import { Request, Response } from 'express';
import { holdSeatService, reserveSeatService, refreshHoldService } from '../services/seat';

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
export const holdSeat = async (req: Request, res: Response) => {
  try {
    const { eventId, seatId } = req.params;
    const { userId } = req.body;
    const result = await holdSeatService(eventId, seatId, userId);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};

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
export const reserveSeat = async (req: Request, res: Response) => {
  try {
    const { eventId, seatId } = req.params;
    const { userId } = req.body;
    const result = await reserveSeatService(eventId, seatId, userId);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};

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
export const refreshHold = async (req: Request, res: Response) => {
  try {
    const { eventId, seatId } = req.params;
    const { userId } = req.body;
    const result = await refreshHoldService(eventId, seatId, userId);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};
