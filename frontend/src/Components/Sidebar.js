import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaPlus, FaList, FaTicket, FaTicketAlt } from "react-icons/fa";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <>
      <button className="sidebar-toggle" onClick={handleToggle}>
        ☰
      </button>
      <div className={`sidebar${open ? " open" : ""}`}>
        <h2 className="text-center">
             <Link to="/dashboard" onClick={() => setOpen(false)}>
            
              Dashboard
            </Link>
            </h2>
        <ul>
          <li>
            <Link to="/add-movie" onClick={() => setOpen(false)}>
             <img
                src="/movie.png"
                alt="Add Movies"
                style={{ width: "24px", height: "24px", marginRight: "10px" }}
              />
              Add Movies
            </Link>
          </li>
          <li>
            <Link to="/movies-list" onClick={() => setOpen(false)}>
               <img
                src="/movielist.png"
                alt="Movies List"
                style={{ width: "24px", height: "24px", marginRight: "10px" }}
              />
              Movies List
            </Link>
          </li>
          <li>
            <Link to="/tickets" onClick={() => setOpen(false)}>
              <img
                src="/tickets.png"
                alt="Tickets"
                style={{ width: "24px", height: "24px", marginRight: "10px" }}
              />
              Tickets
            </Link>
          </li>
          <li>
            <Link to="/bookingfetch" onClick={() => setOpen(false)}>
              <img
                src="/booking.png"
                alt="bookings"
                style={{ width: "24px", height: "24px", marginRight: "10px" }}
              />
              Bookings
            </Link>
          </li>
        </ul>
      </div>
      {open && <div className="sidebar-backdrop" onClick={handleToggle}></div>}
    </>
  );
};

export default Sidebar;
