const express = require("express");
const router = express.Router();

const database = require("../database");
const { validateMovies } = require("../validators");

router
  .get("/", database.getMovies)
  .get("/:id", database.getMoviesId)
  .post("/", validateMovies, database.postMovie)
  .put("/:id", validateMovies, database.updateMovies)
  .delete("/:id", database.deleteMovies);

module.exports = router;
