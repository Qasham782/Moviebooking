import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer"; // ✅ import Footer
import About from "./Pages/About";
import Dashboard from "./Pages/Dashboard";
import { useEffect } from "react";
import AddMovie from "./Pages/Addmovie";
import MovieList from "./Pages/Movielist";
import EditMovie from "./Pages/Editmovie";
import Advertise from "./Pages/Adervtise";
import AddShowtime from "./Pages/Tickets";
import ShowtimeList from "./Pages/Ticketinfo";
import BookingForm from "./Pages/Book";
import BookingList from "./Pages/Booking";
import AboutUs from "./Pages/About";
import ContactUs from "./Pages/Contact";

function Layout() {
  const location = useLocation();

  const hideNavbarPaths = [
    "/dashboard",
    "/add-movie",
    "/movies-list",
    "/edit-movie",
    "/tickets",
    "/bookingfetch"
  ];

  const shouldHideNavbar = hideNavbarPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div
      className="App"
      style={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}
    >
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-movie" element={<AddMovie />} />
        <Route path="movies-list" element={<MovieList />} />
        <Route path="/edit-movie/:id" element={<EditMovie />} />
        <Route path="/edit-movie" element={<EditMovie />} />
        <Route path="advertise" element={<Advertise />} />
        <Route path="tickets" element={<AddShowtime />} />
        <Route path="tickets-info" element={<ShowtimeList />} />
        <Route path="booking" element={<BookingForm />} />
        <Route path="bookingfetch" element={<BookingList />} />
        <Route path="contact" element={<ContactUs />} />
      </Routes>

      {/* ✅ Show footer only when Navbar is visible */}
      {!shouldHideNavbar && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
