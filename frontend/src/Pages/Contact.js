import React, { useState } from "react";
import axios from "axios";
import "../Components/ContactUs.css"; // 👈 Import external CSS

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await axios.post("http://localhost:5000/contact", formData);
      setStatus(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus(err.response?.data?.error || "Error sending message.");
    }
  };

 return (
  <div className="contact-container">
    <div className="contact-grid">
      {/* Map Section */}
      <div className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193369.81206054095!2d-74.2867730054687!3d40.775146700000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259006355de43%3A0x42dd1318a8445951!2sLargest%20IMAX%20Screen%20in%20U.S.!5e0!3m2!1sen!2s!4v1749336221438!5m2!1sen!2s"
          width="600"
          height="850"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Form Section */}
      <div className="contact-form">
        <h2>Contact Us</h2>
        <p className="contact-subtext">
          We'd love to hear from you! Whether you have a question about features, pricing, need a demo, or anything else —
          our team is ready to answer all your questions.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="5"
              required
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Send Message</button>

          {status && (
            <p
              className={`status ${
                status.toLowerCase().includes("success") ? "success" : "error"
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  </div>
);

};

export default ContactUs;
