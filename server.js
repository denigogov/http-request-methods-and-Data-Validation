const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.SERVER_PORT ?? 5001;

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on http://localhost:${port}/`);
  }
});

const welcome = (_, res) => {
  res.send(
    `route to see all users: <a href="http://localhost:5000/users">click here</a> <br> 
    route to see all movies: <a href="http://localhost:5000/movies">click here</a>`
  );
};
app.get("/", welcome);

// Taking The router!
const userRoute = require("./routes/User");
const moviesRouter = require("./routes/Movies");

app.use("/users", userRoute);
app.use("/movies", moviesRouter);
