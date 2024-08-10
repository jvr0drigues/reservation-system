export interface Event {
  id: string;
  name: string;
  type: string;
  totalSeats: number;
  availableSeats: number;
  heldSeats: string[];
  reservedSeats: string[];
}
  
export const createEvent = (id: string, name: string, type: string, totalSeats: number, availableSeats: number, heldSeats: string[], reservedSeats: string[]): Event => {
  return {
    id,
    name,
    type,
    totalSeats,
    availableSeats,
    heldSeats,
    reservedSeats
  };
};
  