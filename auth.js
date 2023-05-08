const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

// Hashing password
const hashpassword = (req, res, next) => {
  argon2
    .hash(req.body.hashedPassword, hashingOptions)
    .then((hashedPassword) => {
      console.log(hashedPassword);

      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// VERIFYING PASSWORD  WHEN USER LOGIN !!
const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.hashedPassword)
    .then((isVerified) => {
      //  ifVerified return true or false if the password match return true!
      if (isVerified) {
        res.send("credentials are valid");
      } else {
        res.status(401).send("wrong password or username");
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports = {
  hashpassword,
  verifyPassword,
};
