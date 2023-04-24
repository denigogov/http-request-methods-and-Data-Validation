const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const port = process.env.SERVER_PORT ?? 5001;

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

// ////////////// LOCAL /////////////////////////////////
// importing the local data
const localData = require("./movieHandlers");

const localWelcome = (_, res) => {
  res.send("welcome to local File Data");
};
app.get("/api", localWelcome);
app.get("/api/movies", localData.localGetMovies);
app.get("/api/movies/:id", localData.localGetMovieById);

// WITH POST METHOD
app.post("/api/movies", localData.localGetMovies);
//

//

//

//

// ////////////// DATABASE /////////////////////////////////

const database = require("./database");
const welcome = (_, res) => {
  res.send(`DATABASE!!`);
};

app.get("/", welcome);

// Getting the movies
app.get("/movies", database.getMovies);
app.get("/movies/:id", database.getMoviesId);

// WITH POST METHOD FOR MOVIES !!
// app.post("/movies", database.postMovie);

// Getting the users
app.get("/users", database.getUsers);
app.get("/users/:id", database.getUsersId);

// WITH POST METHOD FOR USERS !!
// app.post("/users", database.postUsers);

// //////////////// POST USERS AND MOVIES WITH VALIDATING DATA  /////////////////////////////////
const { validateMovies } = require("./validators");
app.post("/movies", validateMovies, database.postMovie);

// PUT METHOD on movies !!
app.put("/movies/:id", validateMovies, database.updateMovies);

// DELETE METHOD on movies
app.delete("/movies/:id", database.deleteMovies);

// VALIDATE USERS
const { validateUsers } = require("./validators");
app.post("/users", validateUsers, database.postUsers);

// // // PUT METHOD on USERS
app.put("/users/:id", validateUsers, database.updateUsers);

// DELETE METHOD on users
app.delete("/users/:id", database.deleteUsers);

// HASHING PASSWORD  USERS!! vazno da vnimavam-------------------------------------
const { hashpassword } = require("./auth.js");

app.post("/register", hashpassword, database.postUsers);
app.put("/update/:id", hashpassword, database.updateUsers);
