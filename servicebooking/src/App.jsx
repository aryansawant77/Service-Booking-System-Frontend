import Navbar from "./components/Navbar";
import BookingList from "./pages/BookingList";
import CreateBooking from "./pages/CreateBooking";
import EditBooking from "./pages/EditBooking";
import ViewBooking from "./pages/ViewBooking";
import { Routes, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<BookingList />} />
        <Route path="/create" element={<CreateBooking />} />
        <Route path="/view/:id" element={<ViewBooking />} />
        <Route path="/edit/:id" element={<EditBooking />} />
      </Routes>
    </>
  );
}

export default App;