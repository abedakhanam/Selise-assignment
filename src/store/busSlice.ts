import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingDetails, Bus } from "../types/Bus";
import { initialBusList } from "../utils/initialBusList";

const initialState: {
  buses: Bus[];
  selectedBusId: string | null;
} = {
  buses: JSON.parse(
    localStorage.getItem("buses") || JSON.stringify(initialBusList)
  ),
  selectedBusId: JSON.parse(localStorage.getItem("selectedBusId") || "null"),
};

const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    selectBus(state, action: PayloadAction<string>) {
      state.selectedBusId = action.payload;
      localStorage.setItem(
        "selectedBusId",
        JSON.stringify(state.selectedBusId)
      );
    },
    bookSeat: (
      state,
      action: PayloadAction<{
        busId: string;
        seatId: string;
        bookingDetails: BookingDetails;
      }>
    ) => {
      const { busId, seatId, bookingDetails } = action.payload;
      const bus = state.buses.find((bus) => bus.id === busId);

      if (bus) {
        const seat = bus.seats.find((seat) => seat.id === seatId);
        if (seat) {
          if (!seat.bookings) {
            seat.bookings = {};
          }
          seat.bookings[bookingDetails.time] = bookingDetails;
        }
      }
      localStorage.setItem("buses", JSON.stringify(state.buses));
    },
  },
});

export const { selectBus, bookSeat } = busSlice.actions;
export default busSlice.reducer;
