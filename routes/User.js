const express = require("express");
const router = express.Router();

const database = require("../database");
const { validateUsers } = require("../validators");
const { hashpassword, verifyPassword } = require("../auth");

// Getting the users  using EXPRESS ROUTER AND CHAINING
router
  .get("/", database.getUsers)
  .get("/:id", database.getUsersId)
  .post("/", validateUsers, database.postUsers)
  .put("/:id", validateUsers, database.updateUsers)
  .delete("/:id", database.deleteUsers)

  // USING HASCHING PASSWORD !!!!!! HASHING PASSWORD  USERS!!
  .post("/register", validateUsers, hashpassword, database.postUsers)
  .put("/update/:id", validateUsers, hashpassword, database.updateUsers);

// Login page!

const loginPage = (req, res) => {
  res.send(req.user);
};

router.post(
  "/login",
  database.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

module.exports = router;
