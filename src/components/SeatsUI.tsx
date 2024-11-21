import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { RootState } from "../store/store";
import { Seat } from "../types/Bus";
import BookingFormModal from "./BookingFormModal";
import { bookSeat } from "../store/busSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoPerson } from "react-icons/io5";

export default function SeatsUI() {
  const { busId } = useParams<{ busId: string }>();
  const buses = useSelector((state: RootState) => state.bus.buses);
  const dispatch = useDispatch();
  const location = useLocation();

  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("8:00 am");

  const selectedBus = buses.find((bus) => bus.id === busId);
  const isAdmin =
    new URLSearchParams(location.search).get("fromAdmin") === "true";

  if (!selectedBus) {
    return <div className="p-4">Bus not found!</div>;
  }

  const handleBooking = (bookingDetails: {
    name: string;
    destination: string;
    time: string;
  }) => {
    if (selectedSeat) {
      dispatch(
        bookSeat({
          busId: selectedBus.id,
          seatId: selectedSeat.id,
          bookingDetails: { ...bookingDetails, time: currentTime },
        })
      );
      toast.success(
        `Seat ${selectedSeat.id} booked successfully for ${currentTime}!`
      );
      setSelectedSeat(null);
    }
  };

  return (
    <div className=" bg-[#F3F6FF] min-h-screen flex items-center justify-center">
      <ToastContainer autoClose={2000} />
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Seats for Bus {selectedBus.id} {isAdmin && "(Admin Mode)"}
        </h1>
        <div className="mb-6 max-w-lg mx-auto">
          <label
            className="block text-sm font-medium mb-2 text-gray-700"
            htmlFor="time"
          >
            Select Time:
          </label>
          <select
            id="time"
            className="w-full border rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={currentTime}
            onChange={(e) => setCurrentTime(e.target.value)}
          >
            <option value="8:00 am">8:00 am</option>
            <option value="9:00 am">9:00 am</option>
            <option value="5:00 pm">5:00 pm</option>
            <option value="6:00 pm">6:00 pm</option>
          </select>
        </div>

        <div className="flex items-center justify-center w-full">
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="flex flex-col gap-4">
              {selectedBus.seats
                .filter((_, index) => index % 3 === 0)
                .map((seat) => (
                  <button
                    key={seat.id}
                    className={`w-16 h-16 border rounded-lg flex items-center justify-center font-medium text-sm ${
                      seat.bookings?.[currentTime]
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-indigo-400 text-white hover:bg-green-600"
                    }`}
                    onClick={() => {
                      if (seat.bookings?.[currentTime]) {
                        if (!isAdmin) {
                          toast.success(
                            `Seat ${seat.id} is already booked for ${currentTime}.`
                          );
                        } else {
                          setSelectedSeat(seat);
                        }
                      } else {
                        setSelectedSeat(seat);
                      }
                    }}
                  >
                    {seat.bookings?.[currentTime] ? (
                      <IoPerson className="text-xl" />
                    ) : (
                      seat.id
                    )}
                  </button>
                ))}
            </div>

            <div />

            <div className="flex flex-col items-center gap-4">
              <div className="grid grid-cols-2 gap-4">
                {selectedBus.seats
                  .filter((_, index) => index % 3 !== 0)
                  .map((seat) => (
                    <button
                      key={seat.id}
                      className={`w-16 h-16 border rounded-lg flex items-center justify-center font-medium text-sm ${
                        seat.bookings?.[currentTime]
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-indigo-400 text-white hover:bg-indigo-600"
                      }`}
                      onClick={() => {
                        if (seat.bookings?.[currentTime]) {
                          if (!isAdmin) {
                            toast.success(
                              `Seat ${seat.id} is already booked for ${currentTime}.`
                            );
                          } else {
                            setSelectedSeat(seat);
                          }
                        } else {
                          setSelectedSeat(seat);
                        }
                      }}
                    >
                      {seat.bookings?.[currentTime] ? (
                        <IoPerson className="text-xl" />
                      ) : (
                        seat.id
                      )}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <BookingFormModal
          seat={selectedSeat}
          busId={selectedBus.id}
          currentTime={currentTime}
          isReadOnly={isAdmin}
          onClose={() => setSelectedSeat(null)}
          onSubmitBooking={(data) =>
            handleBooking({ ...data, time: currentTime })
          }
        />
      </div>
    </div>
  );
}
