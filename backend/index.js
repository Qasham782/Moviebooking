require('dotenv').config(); // Load env variables at the very top

const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("App is Working");
});

// MongoDB Connection
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected!');

        app.listen(PORT, () => {
            console.log(`App listening at port ${PORT}`);
        });
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

// Schema & Model
const AddmovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
    posterUrl: { type: String, required: false },
}, { timestamps: true });

const Addmovie = mongoose.model('Addmovie', AddmovieSchema);

// POST /movies route
app.post('/movies', async (req, res) => {
    try {
        const { title, description, releaseDate, genre, rating, posterUrl } = req.body;

        if (!title || !description || !releaseDate || !genre || !rating) {
            return res.status(400).json({ error: 'Please fill all required fields' });
        }

        const newMovie = new Addmovie({
            title,
            description,
            releaseDate,
            genre,
            rating,
            posterUrl,
        });

        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /movies route - fetch all movies
app.get('/movies', async (req, res) => {
    try {
        const movies = await Addmovie.find().sort({ createdAt: -1 }); // newest first
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /movies/:id route - delete movie by ID
app.delete('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Addmovie.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: 'Movie not found' });
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /movies/:id - update movie by ID
app.put('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedMovie = await Addmovie.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedMovie) return res.status(404).json({ error: 'Movie not found' });
        res.json(updatedMovie);
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /movies/:id - get movie by ID
app.get('/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Addmovie.findById(id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        res.json(movie);
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Showtime Schema and Model
const ShowtimeSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Addmovie', required: true },
    price: { type: Number, required: true },
    showtimes: { type: [String], required: true, default: [] }
}, { timestamps: true });

const Showtime = mongoose.model('Showtime', ShowtimeSchema);

// POST /showtimes route - add or update showtimes
app.post('/showtimes', async (req, res) => {
    try {
        const { movieId, price, showtimes } = req.body;

        const updated = await Showtime.findOneAndUpdate(
            { movieId },
            {
                $set: { price },
                $addToSet: { showtimes: { $each: showtimes } }
            },
            { new: true, upsert: true }
        );

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /showtimes route - fetch all showtimes
app.get('/showtimes', async (req, res) => {
    try {
        const showtimes = await Showtime.find();
        res.json(showtimes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Booking Schema and Model
const BookingSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Addmovie', required: true },
    showtime: { type: String, required: true },
    date: { type: Date, required: true },
    quantity: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true }
}, { timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);

// POST /bookings route - create booking
app.post('/bookings', async (req, res) => {
    try {
        const { movieId, showtime, date, quantity, name, email, contact } = req.body;

        if (!movieId || !showtime || !date || !quantity || !name || !email || !contact) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return res.status(400).json({ error: 'Cannot book for past dates' });
        }

        // Fetch the movie to get the release date
        const movie = await Addmovie.findById(movieId);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });

        const releaseDate = new Date(movie.releaseDate);
        releaseDate.setHours(0, 0, 0, 0);

        if (selectedDate < releaseDate) {
            return res.status(400).json({ error: 'You can only book for dates after the release date.' });
        }

        // Fetch ticket price from showtimes
        const showtimeData = await Showtime.findOne({ movieId });
        if (!showtimeData || !showtimeData.showtimes.includes(showtime)) {
            return res.status(400).json({ error: 'Invalid showtime for selected movie.' });
        }

        const ticketPrice = showtimeData.price;
        const totalAmount = ticketPrice * quantity;

        const newBooking = new Booking({
            movieId,
            showtime,
            date,
            quantity,
            name,
            email,
            contact
        });

        await newBooking.save();

        // Send confirmation email
        await sendConfirmationEmail(email, {
            name,
            movieTitle: movie.title,
            showtime,
            date,
            quantity,
            ticketPrice,
            totalAmount,
        });

        res.status(201).json({ message: 'Booking successful', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Email sender helper
async function sendConfirmationEmail(to, details) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "🎟 Movie Ticket Booking Confirmation",
        html: `
          <h3>Hello ${details.name},</h3>
          <p>Thank you for booking your movie ticket with us!</p>
          <ul>
            <li><strong>Movie:</strong> ${details.movieTitle}</li>
            <li><strong>Showtime:</strong> ${formatTime(details.showtime)}</li>
            <li><strong>Date:</strong> ${new Date(details.date).toDateString()}</li>
            <li><strong>Tickets:</strong> ${details.quantity}</li>
            <li><strong>Price per Ticket:</strong> $${details.ticketPrice.toFixed(2)}</li>
            <li><strong>Total Amount:</strong> $${details.totalAmount.toFixed(2)}</li>
          </ul>
          <p>Collect your Tickets from the Counter. Enjoy your movie! 🎬</p>
        `
    };

    function formatTime(time24) {
        const [hourStr, minute] = time24.split(":");
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${minute} ${ampm}`;
    }

    await transporter.sendMail(mailOptions);
}

// GET /bookings route - fetch all bookings
app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('movieId', 'title')
            .sort({ createdAt: -1 });

        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /bookings/:id route - delete booking
app.delete('/bookings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Booking.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: 'Booking not found' });
        res.json({ message: 'Booking deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /contact route - contact form
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: '📩 New Contact Form Submission',
            html: `
              <h3>New Contact Message</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully.' });
    } catch (err) {
        console.error('Email error:', err);
        res.status(500).json({ error: 'Failed to send message. Try again later.' });
    }
});

startServer();
