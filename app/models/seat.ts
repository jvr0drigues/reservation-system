export interface Seat {
    id: string;
    status: 'available' | 'held' | 'reserved';
    heldBy?: string;
    reservedBy?: string;
    holdExpiry?: number;
  }
  
  export const createSeat = (id: string): Seat => {
    return {
      id,
      status: 'available'
    };
  };
  
  export const holdSeat = (seat: Seat, userId: string, holdDuration: number): Seat => {
    return {
      ...seat,
      status: 'held',
      heldBy: userId,
      holdExpiry: Date.now() + holdDuration
    };
  };
  
  export const reserveSeat = (seat: Seat, userId: string): Seat => {
    return {
      ...seat,
      status: 'reserved',
      reservedBy: userId,
      heldBy: undefined,
      holdExpiry: undefined
    };
  };
  
  export const refreshHold = (seat: Seat, holdDuration: number): Seat => {
    if (seat.status === 'held') {
      return {
        ...seat,
        holdExpiry: Date.now() + holdDuration
      };
    }
    return seat;
  };
  