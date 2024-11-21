import { useForm, SubmitHandler } from "react-hook-form";
import { BookingDetails, Seat } from "../types/Bus";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface BookingFormModalProps {
  seat: Seat | null;
  busId: string;
  onClose: () => void;
  isReadOnly?: boolean;
  currentTime: string;
  onSubmitBooking: (data: BookingDetails) => void;
}

export default function BookingFormModal({
  seat,
  busId,
  onClose,
  isReadOnly = false,
  currentTime,
  onSubmitBooking,
}: BookingFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingDetails>();

  const onSubmit: SubmitHandler<BookingDetails> = (data) => {
    onSubmitBooking(data);
    reset();
    onClose();
  };

  const bookingDetails = useSelector((state: RootState) => {
    const bus = state.bus.buses.find((bus) => bus.id === busId);
    const seatData = bus?.seats.find((s) => s.id === seat?.id);
    return seatData?.bookings?.[currentTime];
  });

  if (!seat) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">
          {isReadOnly
            ? `Seat Details`
            : `Book Seat ${seat.id} for Bus ${busId} at ${currentTime}`}
        </h2>
        {isReadOnly && bookingDetails ? (
          <div>
            <p>
              <strong>Seat No:</strong> {seat.id || "N/A"}
            </p>
            <p>
              <strong>Name:</strong> {bookingDetails?.name || "N/A"}
            </p>
            <p>
              <strong>Destination:</strong>{" "}
              {bookingDetails?.destination || "N/A"}
            </p>
            <p>
              <strong>Time:</strong> {currentTime}
            </p>
          </div>
        ) : !isReadOnly ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`w-full border rounded p-2 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="destination"
              >
                Destination
              </label>
              <select
                id="destination"
                {...register("destination", {
                  required: "Destination is required",
                })}
                className={`w-full border rounded p-2 ${
                  errors.destination ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select Destination
                </option>
                <option value="Mirpur">Mirpur</option>
                <option value="Banani">Banani</option>
                <option value="Dhanmondi">Dhanmondi</option>
                <option value="Gulshan">Gulshan</option>
              </select>
              {errors.destination && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.destination.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded"
            >
              Book Seat
            </button>
          </form>
        ) : (
          <p>No booking details available.</p>
        )}
        <button
          className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => {
            reset();
            onClose();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
