import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    axios.get('http://localhost:5000/bookings')
      .then(res => setBookings(res.data))
      .catch(err => console.error('Failed to fetch bookings:', err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`http://localhost:5000/bookings/${id}`);
        fetchBookings(); // Refresh list
      } catch (err) {
        console.error("Error deleting booking:", err);
        alert("Failed to delete booking.");
      }
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '240px', padding: '20px', flex: 1 }}>
        <h2>All Bookings</h2>
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Movie</th>
              <th>Showtime</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr key={b._id}>
                <td>{index + 1}</td>
                <td>{b.name}</td>
                <td>{b.email}</td>
                <td>{b.contact}</td>
                <td>{b.movieId?.title || 'N/A'}</td>
                <td>{b.showtime}</td>
                <td>{new Date(b.date).toDateString()}</td>
                <td>{b.quantity}</td>
                <td>
                  <button
                    onClick={() => handleDelete(b._id)}
                    style={{ background: 'red', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center' }}>No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
