import { Link } from "react-router-dom";
import { FaBus } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between p-4 bg-indigo-100 shadow-md">
      <Link to="/">
        <h1 className="text-2xl font-bold text-indigo-800">
          <div className="flex items-center">
            <FaBus />
            <span className="px-2">Bus Seat Booking App</span>
          </div>
        </h1>
      </Link>

      <Link to="/admin">
        <button className="px-4 py-2 bg-indigo-700 text-white rounded-lg shadow hover:bg-indigo-600 transition">
          <div className="flex items-center">
            <MdAdminPanelSettings />
            <span className="px-2">Admin Panel</span>
          </div>
        </button>
      </Link>
    </div>
  );
}
