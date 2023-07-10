How to run the server ? run node .\index.js
Api description:
1. Get all the movies (array)
http:/localhost:3000/api/movies
GET Request 
- id            -> Identifier for the movie.
- name          -> Display name.
- movieBookings -> Count of booking for the movie screening events.
Errors:
- None

2. Return info about booking specific movie.
http:/localhost:3000/api/movies/booking/:movieId
GET Request
- movieId   (number) -> movie Identifier.
- id        (number) -> screening Identifier for the movie screening (used to identify booking to specific movie screening).
- showTime  (Date)   -> Represents the show time of the movie screening.
- hallId    (number) -> Hall Identifier.
- capacity  (number) -> Hall Capacity.
- booked    (number) -> Booked Ticket Counter for the movie screening.

Errors:
- 400 - Bad request for invalid movie identifier.

3. Book tickets for specific  movie screening.
http:/localhost:3000/api/booking
PUT Request  
Request Body fields
- showId   (number) -> The movie screening identifier.
- tickets  (number) -> Number of required tickets.
- userName (string) -> User name for the booking.

Errors:
- 400 - Bad request 
    - Invalid show identifier.
    - Over capacity tickets.