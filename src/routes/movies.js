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

router.post("/", (req, res) => {
  const { title, genre, year, duration, description } = req.body;

  if (!title || !genre || !duration || !description) {
    return res.status(400).json({
      error: "INVALID_REQUEST",
      message: "Title, genre, duration, and description are required fields",
    });
  }

  const newMovie = {
    id: movies.length + 1,
    title,
    genre,
    duration,
    description,
  };

  movies.push(newMovie);
  return res.status(201).json(newMovie);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { title, genre, year, duration, description } = req.body;

  if (!(title || genre || duration || description)) {
    return res.status(400).json({
      error: "INVALID_REQUEST",
      message:
        "Request body must contain at least one of the following fields: title, genre, duration, description",
    });
  }

  const movieIndex = movies.findIndex((movie) => movie.id === parseInt(id));

  if (movieIndex === -1) {
    return res
      .status(404)
      .json({ error: "RESOURCE_NOT_FOUND", message: "Movie not found" });
  }

  const updatedMovie = {
    ...movies[movieIndex],
    title: title || movies[movieIndex].title,
    genre: genre || movies[movieIndex].genre,
    year: year || movies[movieIndex].year,
    duration: duration || movies[movieIndex].duration,
    description: description || movies[movieIndex].description,
  };

  movies[movieIndex] = updatedMovie;
  return res.status(200).json(updatedMovie);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === parseInt(id, 10));

  if (movieIndex === -1) {
    return res
      .status(404)
      .json({ error: "RESOURCE_NOT_FOUND", message: "Movie not found" });
  }

  movies.splice(movieIndex, 1);
  return res.status(204).send();
});

module.exports = router;
