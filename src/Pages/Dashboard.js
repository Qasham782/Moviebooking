import Sidebar from "../Components/Sidebar";

export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{
        marginLeft: '240px',  // assuming sidebar width
        height: '100vh',
        width: '100%',
        backgroundImage: 'url("/carousel1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '40px',
          borderRadius: '10px',
          color: '#fff',
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>🎬 Welcome to Movie Dashboard</h1>
          <p style={{ fontSize: '1.2rem' }}>
            Manage your movies, showtimes, and bookings easily.
          </p>
        </div>
      </div>
    </div>
  );
}
