import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { selectBus } from "../store/busSlice";
import { useState } from "react";

export default function AdminPanel() {
  const buses = useSelector((state: RootState) => state.bus.buses);
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = location.pathname.includes("admin");

  const handleBusSelection = () => {
    if (selectedBusId) {
      dispatch(selectBus(selectedBusId));
      if (isAdmin) {
        navigate(`/seats-ui/${selectedBusId}?fromAdmin=true`);
      } else {
        navigate(`/seats-ui/${selectedBusId}`);
      }
    }
  };

  return (
    <div className="h-screen bg-[#F3F6FF] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">
        {isAdmin
          ? "Admin Panel - Manage Buses"
          : "Discover the Best Buses in Your City"}
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 w-96">
        <select
          className="border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedBusId || ""}
          onChange={(e) => setSelectedBusId(e.target.value)}
        >
          <option value="" disabled>
            Select a Bus
          </option>
          {buses.map((bus) => (
            <option key={bus.id} value={bus.id}>
              {bus.id}
            </option>
          ))}
        </select>

        <button
          className={`px-4 py-2 text-white font-medium rounded-lg ${
            selectedBusId
              ? "bg-indigo-500 hover:bg-indigo-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleBusSelection}
          disabled={!selectedBusId}
        >
          {selectedBusId
            ? isAdmin
              ? `Manage Bus ${selectedBusId}`
              : `See Details of Bus ${selectedBusId}`
            : "Select a Bus"}
        </button>
      </div>
    </div>
  );
}