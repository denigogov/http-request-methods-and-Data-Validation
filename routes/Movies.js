const express = require("express");
const router = express.Router();

const database = require("../database");
const { validateMovies } = require("../validators");
const { verifyToken } = require("../auth");

router.use(verifyToken);

router
  .get("/", database.getMovies)
  .get("/:id", database.getMoviesId)

  // verify the user with token!
  .post("/", verifyToken, validateMovies, database.postMovie)
  .put("/:id", verifyToken, validateMovies, database.updateMovies)
  .delete("/:id", verifyToken, database.deleteMovies);

module.exports = router;
