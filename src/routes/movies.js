const express = require("express");
const router = express.Router();
const { movies } = require("../data/db");

router.get("/", (req, res) => {
  const { genre } = req.query;

  if (genre) {
    const filteredMovies = movies.filter(
      (movie) => movie.genre.toLowerCase() === genre.toLowerCase(),
    );
    return res.status(200).json(filteredMovies);
  }
  return res.status(200).json(movies);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === parseInt(id));

  if (!movie) {
    return res
      .status(404)
      .json({ error: "RESOURCE_NOT_FOUND", message: "Movie not found" });
  }
  return res.status(200).json(movie);
});

module.exports = router;
