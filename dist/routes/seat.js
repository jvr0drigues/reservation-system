"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seatController_1 = require("../controllers/seatController");
const router = (0, express_1.Router)();
router.post('/:eventId/seats/:seatId/hold', seatController_1.holdSeat);
router.post('/:eventId/seats/:seatId/reserve', seatController_1.reserveSeat);
router.post('/:eventId/seats/:seatId/refresh', seatController_1.refreshHold);
exports.default = router;
