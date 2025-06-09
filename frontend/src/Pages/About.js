import React from "react";

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>About Us</h2>

      <p style={styles.paragraph}>
        Welcome to our movie booking platform! We aim to make your movie-going
        experience seamless and enjoyable. Our mission is to connect you to the
        best theaters and provide a hassle-free booking process.
      </p>

      <p style={styles.paragraph}>
        Our platform allows you to browse current and upcoming movies, view
        showtimes, select your seats, and book tickets with ease. With
        real-time updates and user-friendly features, we’re constantly working
        to improve your experience.
      </p>

      <p style={styles.paragraph}>
        Behind the scenes, we're a passionate team of developers, designers, and
        movie lovers dedicated to bringing you the best digital experience.
        Thank you for choosing us!
      </p>

      <div style={styles.imageRow}>
        <img
          src="theatre.avif"
          alt="Team"
          style={styles.image}
        />
        <img
          src="theatre.jpg"
          alt="Cinema"
          style={styles.image}
        />
        <img
          src="theatre2.jpg"
          alt="App Interface"
          style={styles.image}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#111",
    color: "white",
    borderRadius: "12px",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#00bcd4",
    marginBottom: "1.5rem",
  },
  paragraph: {
    marginBottom: "1rem",
    lineHeight: "1.7",
    fontSize: "1.1rem",
    color: "#ddd",
  },
  imageRow: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  image: {
    width: "150px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.4)",
  },
};

export default AboutUs;
