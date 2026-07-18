const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", duration: 148 },
  { id: 2, title: "The Dark Knight", genre: "Action", duration: 152 },
  { id: 3, title: "Interstellar", genre: "Sci-Fi", duration: 169 },
  { id: 4, title: "The Matrix", genre: "Sci-Fi", duration: 136 },
  { id: 5, title: "Pulp Fiction", genre: "Crime", duration: 154 },
];

const rooms = [
  { id: 1, name: "Sala Rubinowa", capacityRow: 10, capacityColumn: 15 },
  { id: 2, name: "Sala Szmaragdowa", capacityRow: 8, capacityColumn: 10 },
  { id: 3, name: "Sala Diamentowa", capacityRow: 12, capacityColumn: 10 },
];

const screenings = [
  { id: 101, movieId: 1, time: "2026-07-15T18:00:00Z", room: "Sala Rubinowa" },
  { id: 102, movieId: 1, time: "2026-07-15T21:00:00Z", room: "Sala Rubinowa" },
  {
    id: 103,
    movieId: 2,
    time: "2026-07-15T19:30:00Z",
    room: "Sala Szmaragdowa",
  },
];

// Example reservation data structure:
/* 
{
    id: 1,
    screeningId: 101,
    seats: [
        { row: 1, column: 5 },
        { row: 1, column: 6 },
    ],
    email: "john.doe@example.com"
}
*/
const reservations = [];

module.exports = {
  movies,
  rooms,
  screenings,
  reservations,
};
