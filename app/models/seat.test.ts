import { Seat, createSeat, holdSeat, reserveSeat, refreshHold } from './seat';

describe('Seat Model', () => {
  it('should create a seat with available status', () => {
    const seatId = '1';
    const seat = createSeat(seatId);
    expect(seat).toEqual({
      id: seatId,
      status: 'available'
    });
  });

  it('should hold a seat', () => {
    const seat: Seat = createSeat('1');
    const userId = 'user1';
    const holdDuration = 60000; // 1 minute
    const heldSeat = holdSeat(seat, userId, holdDuration);

    expect(heldSeat).toEqual({
      id: '1',
      status: 'held',
      heldBy: userId,
      holdExpiry: expect.any(Number)
    });
  });

  it('should reserve a seat', () => {
    const seat: Seat = holdSeat(createSeat('1'), 'user1', 60000);
    const userId = 'user2';
    const reservedSeat = reserveSeat(seat, userId);

    expect(reservedSeat).toEqual({
      id: '1',
      status: 'reserved',
      reservedBy: userId,
      heldBy: undefined,
      holdExpiry: undefined
    });
  });

  it('should refresh hold on a held seat', () => {
    const seat: Seat = holdSeat(createSeat('1'), 'user1', 60000);
    const newHoldDuration = 120000; // 2 minutes
    const refreshedSeat = refreshHold(seat, newHoldDuration);

    expect(refreshedSeat).toEqual({
      id: '1',
      status: 'held',
      heldBy: 'user1',
      holdExpiry: expect.any(Number)
    });
  });

  it('should not refresh hold on a seat that is not held', () => {
    const seat: Seat = createSeat('1');
    const newHoldDuration = 120000; // 2 minutes
    const refreshedSeat = refreshHold(seat, newHoldDuration);

    expect(refreshedSeat).toEqual({
      id: '1',
      status: 'available'
    });
  });
});
