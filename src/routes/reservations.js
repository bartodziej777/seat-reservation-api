const express = require("express");
const router = express.Router();
const { reservations, screenings } = require("../data/db");

router.get("/", (req, res) => {
  return res.status(200).json(reservations);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const reservation = reservations.find(
    (reservation) => reservation.id === parseInt(id),
  );

  if (!reservation) {
    return res.status(404).json({
      error: "RESOURCE_NOT_FOUND",
      message: "Reservation not found",
    });
  }
  return res.status(200).json(reservation);
});

router.post("/", (req, res) => {
  const { screeningId, seats, email } = req.body;

  if (!screeningId || !seats || !email) {
    return res.status(400).json({
      error: "INVALID_REQUEST",
      message: "screeningId, seats, and email are required fields",
    });
  }

  const screeningExists = screenings.some(
    (screening) => screening.id === parseInt(screeningId),
  );
  if (!screeningExists) {
    return res.status(404).json({
      error: "RESOURCE_NOT_FOUND",
      message: "Screening not found",
    });
  }

  const isSeatAlreadyReserved = reservations.some((reservation) => {
    if (reservation.screeningId !== parseInt(screeningId)) {
      return false;
    }
    return reservation.seats.some((reservedSeat) =>
      seats.some(
        (seat) =>
          seat.row === reservedSeat.row && seat.column === reservedSeat.column,
      ),
    );
  });

  if (isSeatAlreadyReserved) {
    return res.status(409).json({
      error: "SEAT_ALREADY_RESERVED",
      message: "One or more of the selected seats are already reserved",
    });
  }

  const newId =
    reservations.length > 0 ? reservations[reservations.length - 1].id + 1 : 1;

  const newReservation = {
    id: newId,
    screeningId,
    seats,
    email,
  };
  reservations.push(newReservation);

  return res.status(201).json(newReservation);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const reservationIndex = reservations.findIndex(
    (reservation) => reservation.id === parseInt(id),
  );

  if (reservationIndex === -1) {
    return res.status(404).json({
      error: "RESOURCE_NOT_FOUND",
      message: "Reservation not found",
    });
  }

  reservations.splice(reservationIndex, 1);
  return res.status(204).send();
});

module.exports = router;
