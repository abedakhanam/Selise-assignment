import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import AdminPanel from "./pages/AdminPanel";
import SeatsUI from "./components/SeatsUI";

function App() {
  return (
    <div className="">
      <NavBar />
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/seats-ui/:busId" element={<SeatsUI />} />
      </Routes>
    </div>
  );
}

export default App;
