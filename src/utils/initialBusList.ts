import { Bus, Seat } from "../types/Bus";

export const seatTemplate: Seat[] = [
  { id: "A1", bookings: {} },
  { id: "A2", bookings: {} },
  { id: "A3", bookings: {} },
  { id: "B1", bookings: {} },
  { id: "B2", bookings: {} },
  { id: "B3", bookings: {} },
  { id: "C1", bookings: {} },
  { id: "C2", bookings: {} },
  { id: "C3", bookings: {} },
  { id: "D1", bookings: {} },
  { id: "D2", bookings: {} },
  { id: "D3", bookings: {} },
  { id: "E1", bookings: {} },
  { id: "E2", bookings: {} },
  { id: "E3", bookings: {} },
];
export const initialBusList: Bus[] = [
  {
    id: "S098",
    seats: [...seatTemplate],
  },
  {
    id: "S099",
    seats: [...seatTemplate],
  },
  {
    id: "S100",
    seats: [...seatTemplate],
  },
  {
    id: "S101",
    seats: [...seatTemplate],
  },
  {
    id: "S102",
    seats: [...seatTemplate],
  },
];
