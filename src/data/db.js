const movies = [
  {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi",
    duration: 148,
    description:
      "A skilled thief is given a chance at redemption if he can successfully perform an inception.",
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "Action",
    duration: 152,
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: 3,
    title: "Interstellar",
    genre: "Sci-Fi",
    duration: 169,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 4,
    title: "The Matrix",
    genre: "Sci-Fi",
    duration: 136,
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 5,
    title: "Pulp Fiction",
    genre: "Crime",
    duration: 154,
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
];

const rooms = [
  { id: 1, name: "Sala Rubinowa", capacityRow: 10, capacityColumn: 15 },
  { id: 2, name: "Sala Szmaragdowa", capacityRow: 8, capacityColumn: 10 },
  { id: 3, name: "Sala Diamentowa", capacityRow: 12, capacityColumn: 10 },
];

const screenings = [
  {
    id: 1,
    movieId: 1,
    roomId: 1,
    startTime: "2024-06-01T18:00:00Z",
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
