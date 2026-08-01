const express = require("express");
const app = express();

app.use(express.json());

const moviesRouter = require("./src/routes/movies");
const screeningsRouter = require("./src/routes/screenings");

app.use("/api/movies", moviesRouter);
app.use("/api/screenings", screeningsRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
