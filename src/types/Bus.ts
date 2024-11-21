export interface BookingDetails {
  name: string;
  destination: string;
  time: string;
}

export interface Seat {
  id: string;
  bookings: { [time: string]: BookingDetails | null };
}

export interface Bus {
  id: string;
  seats: Seat[];
}
