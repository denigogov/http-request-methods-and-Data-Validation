const express = require("express");
const router = express.Router();

const database = require("../database");
const { validateUsers } = require("../validators");
const { hashpassword } = require("../auth");

// Getting the users  using EXPRESS ROUTER AND CHAINING
router
  .get("/", database.getUsers)
  .get("/:id", database.getUsersId)
  .post("/", validateUsers, database.postUsers)
  .put("/:id", validateUsers, database.updateUsers)
  .delete("/:id", database.deleteUsers)

  // USING HASCHING PASSWORD !!!!!! HASHING PASSWORD  USERS!!
  .post("/register", hashpassword, database.postUsers)
  .put("/update/:id", hashpassword, database.updateUsers);

module.exports = router;
