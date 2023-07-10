const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

const now = new Date();

const halls = [
  { id: 1, capacity: 10 },
  { id: 2, capacity: 15 },
  { id: 3, capacity: 15 },
  { id: 4, capacity: 25 },
  { id: 5, capacity: 17 },
  { id: 6, capacity: 13 }
]

const bookings = [
  { id: 10, movieId: 1, showTime: new Date(now.getTime() + 60 * 60 * 1000), hallId: 1, booked: 7 },
  { id: 11, movieId: 1, showTime: new Date(now.getTime() + 60 * 60 * 3000), hallId: 1, booked: 5 },
  { id: 12, movieId: 1, showTime: new Date(now.getTime() + 60 * 60 * 5000), hallId: 1, booked: 4 },

  { id: 20, movieId: 2, showTime: new Date(now.getTime() + 60 * 60 * 1000), hallId: 2, booked: 5 },
  { id: 21, movieId: 2, showTime: new Date(now.getTime() + 60 * 60 * 3000), hallId: 2, booked: 7 },
  { id: 22, movieId: 2, showTime: new Date(now.getTime() + 60 * 60 * 5000), hallId: 2, booked: 9 },

  { id: 30, movieId: 3, showTime: new Date(now.getTime() + 60 * 60 * 1000), hallId: 3, booked: 12 },
  { id: 31, movieId: 3, showTime: new Date(now.getTime() + 60 * 60 * 3000), hallId: 3, booked: 13 },
  { id: 32, movieId: 3, showTime: new Date(now.getTime() + 60 * 60 * 5000), hallId: 3, booked: 1 },

  { id: 40, movieId: 4, showTime: new Date(now.getTime() + 60 * 60 * 1000), hallId: 4, booked: 22 },
  { id: 41, movieId: 4, showTime: new Date(now.getTime() + 60 * 60 * 3000), hallId: 4, booked: 2 },
  { id: 42, movieId: 4, showTime: new Date(now.getTime() + 60 * 60 * 5000), hallId: 4, booked: 12 },

  { id: 50, movieId: 5, showTime: new Date(now.getTime() + 60 * 60 * 1000), hallId: 5, booked: 13 },
  { id: 51, movieId: 5, showTime: new Date(now.getTime() + 60 * 60 * 3000), hallId: 5, booked: 10 },
  { id: 52, movieId: 5, showTime: new Date(now.getTime() + 60 * 60 * 5000), hallId: 5, booked: 15 },

  { id: 60, movieId: 6, showTime: new Date(now.getTime() + 60 * 60 * 1000), hallId: 6, booked: 13 },
  { id: 61, movieId: 6, showTime: new Date(now.getTime() + 60 * 60 * 3000), hallId: 6, booked: 10 },
  { id: 62, movieId: 6, showTime: new Date(now.getTime() + 60 * 60 * 5000), hallId: 6, booked: 7 }
]

const movies = [
  { id: 1, name: "Star Wars", },
  { id: 2, name: "Shutter Island" },
  { id: 3, name: "Everything Everywhere all at Once" },
  { id: 4, name: "10 Cloverfield Lane" },
  { id: 5, name: "Spider-Man: Into The Spiderverse" },
  { id: 6, name: "Shrek" },
];

// Define a route
app.get('/api/movies', (req, res) => {
  const result = movies.map(movie => {
    const movieBookings = bookings.filter(b => b.movieId == movie.id).length;

    return { ...movie, movieBookings };
  })
  res.send(result);
});

app.get('/api/movies/booking/:movieId', (req, res) => {

  const movieId = req.params.movieId;
  let movie = movies.find(e => e.id == movieId);

  if (!movie) {
    return res.status(400).send(`Bad Request: Movie ${movieId} not found`);
  }

  let movieBookings = bookings.filter(booking => booking.movieId == movieId);
  const result = movieBookings.map(movieBooking => {
    const movieHall = halls.find(hall => hall.id == movieBooking.hallId);
    return { ...movieBooking, capacity: movieHall.capacity };
  })
  res.send(result);
});


app.put('/api/booking', (req, res) => {

  let showId = req.body.showId;
  let tickets = req.body.tickets;
  let userName = req.body.userName;

  if (tickets < 1) {
    return res.status(400).send(`Bad Request: Tickets count must be greater than 0`);
  }

  let movieBooking = bookings.find(e => e.id == showId);
  if (!movieBooking) {
    return res.status(400).send(`Bad Request: Movie booking id ${showId} not found`);
  }

  let hall = halls.find(hall => hall.id == movieBooking.hallId);

  if (movieBooking.booked + tickets > hall.capacity) {
    return res.status(400).send(`Bad Request: Over hall capacity`);
  }

  movieBooking.booked += tickets;
  return res.send('Booked successfully')
})
// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

