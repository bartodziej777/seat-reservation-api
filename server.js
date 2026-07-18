const express = require("express");
const app = express();

app.use(express.json());

const moviesRouter = require("./src/routes/movies");
app.use("/api/movies", moviesRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
