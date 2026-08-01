const express = require("express");
const router = express.Router();
const { screenings, movies, rooms, reservations } = require("../data/db");

router.get("/", (req, res) => {
  const { date, movieId, roomId } = req.query;
  let filteredScreenings = [...screenings];

  if (date) {
    filteredScreenings = filteredScreenings.filter((screening) =>
      screening.startTime.startsWith(date),
    );
  }

  if (movieId) {
    filteredScreenings = filteredScreenings.filter(
      (screening) => screening.movieId === parseInt(movieId),
    );
  }

  if (roomId) {
    filteredScreenings = filteredScreenings.filter(
      (screening) => screening.roomId === parseInt(roomId),
    );
  }

  return res.status(200).json(filteredScreenings);
});

router.get("/:id/seats", (req, res) => {
  const { id } = req.params;
  const screening = screenings.find(
    (screening) => screening.id === parseInt(id),
  );

  if (!screening) {
    return res
      .status(404)
      .json({ error: "RESOURCE_NOT_FOUND", message: "Screening not found" });
  }

  const room = rooms.find((room) => room.id === screening.roomId);

  if (!room) {
    return res
      .status(404)
      .json({ error: "RESOURCE_NOT_FOUND", message: "Room not found" });
  }
  const screeningReservations = reservations.filter(
    (r) => r.screeningId === screening.id,
  );
  const takenSeats = screeningReservations.flatMap((r) => r.seats);

  const seats = [];
  for (let r = 1; r <= room.capacityRow; r++) {
    for (let c = 1; c <= room.capacityColumn; c++) {
      const isTaken = takenSeats.some(
        (seat) => seat.row === r && seat.column === c,
      );
      seats.push({
        row: r,
        column: c,
        status: isTaken ? "taken" : "available",
      });
    }
  }

  return res.status(200).json({
    screeningId: screening.id,
    roomId: room.id,
    roomName: room.name,
    capacityRow: room.capacityRow,
    capacityColumn: room.capacityColumn,
    seats,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const screening = screenings.find(
    (screening) => screening.id === parseInt(id),
  );

  if (!screening) {
    return res
      .status(404)
      .json({ error: "RESOURCE_NOT_FOUND", message: "Screening not found" });
  }
  return res.status(200).json(screening);
});

router.post("/", (req, res) => {
  const { movieId, roomId, startTime } = req.body;

  if (!movieId || !roomId || !startTime) {
    return res.status(400).json({
      error: "INVALID_REQUEST",
      message: "movieId, roomId, and startTime are required fields",
    });
  }

  const movieExists = movies.some((movie) => movie.id === parseInt(movieId));
  if (!movieExists) {
    return res
      .status(404)
      .json({ error: "RESOURCE_NOT_FOUND", message: "Movie not found" });
  }

  const roomExists = rooms.some((room) => room.id === parseInt(roomId));
  if (!roomExists) {
    return res
      .status(404)
      .json({ error: "RESOURCE_NOT_FOUND", message: "Room not found" });
  }

  const newScreening = {
    id: screenings.length > 0 ? screenings[screenings.length - 1].id + 1 : 1,
    movieId: parseInt(movieId),
    roomId: parseInt(roomId),
    startTime,
  };

  screenings.push(newScreening);
  return res.status(201).json(newScreening);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { movieId, roomId, startTime } = req.body;

  if (!movieId && !roomId && !startTime) {
    return res.status(400).json({
      error: "INVALID_REQUEST",
      message:
        "Request body must contain at least one of the following fields: movieId, roomId, startTime",
    });
  }

  const screeningIndex = screenings.findIndex(
    (screening) => screening.id === parseInt(id),
  );

  if (screeningIndex === -1) {
    return res
      .status(404)
      .json({ error: "RESOURCE_NOT_FOUND", message: "Screening not found" });
  }

  if (movieId) {
    const movieExists = movies.some((movie) => movie.id === parseInt(movieId));
    if (!movieExists) {
      return res
        .status(404)
        .json({ error: "RESOURCE_NOT_FOUND", message: "Movie not found" });
    }
  }

  if (roomId) {
    const roomExists = rooms.some((room) => room.id === parseInt(roomId));
    if (!roomExists) {
      return res
        .status(404)
        .json({ error: "RESOURCE_NOT_FOUND", message: "Room not found" });
    }
  }

  const updatedScreening = {
    ...screenings[screeningIndex],
    movieId: movieId ? parseInt(movieId) : screenings[screeningIndex].movieId,
    roomId: roomId ? parseInt(roomId) : screenings[screeningIndex].roomId,
    startTime: startTime || screenings[screeningIndex].startTime,
  };

  screenings[screeningIndex] = updatedScreening;
  return res.status(200).json(updatedScreening);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const screeningIndex = screenings.findIndex(
    (screening) => screening.id === parseInt(id, 10),
  );

  if (screeningIndex === -1) {
    return res
      .status(404)
      .json({ error: "RESOURCE_NOT_FOUND", message: "Screening not found" });
  }

  screenings.splice(screeningIndex, 1);
  return res.status(204).send();
});

module.exports = router;
