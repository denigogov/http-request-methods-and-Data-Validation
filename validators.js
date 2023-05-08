const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;

  const errors = []; // empty array we push the errors inside !!

  //   CHEKING FOR FILED ARE EMPTY!!   FOR MOVIES
  if (!title) {
    errors.push({ filed: "title", message: "The field is required" });
  } else if (title.length > 255) {
    errors.push({ filed: "title", message: "title too big max 250 caracters" });
  }

  if (!director) {
    errors.push({ filed: "director", message: "The field is required" });
  }
  if (!year) {
    errors.push({ filed: "year", message: "The field is required" });
  }
  if (!color) {
    errors.push({ filed: "color", message: "The field is required" });
  }
  if (!duration) {
    errors.push({ filed: "duration", message: "The field is required" });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

//

//

//

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// VALIDATING USER

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;
  const errors = [];

  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (!firstname) {
    errors.push({ field: "firstname", message: "The field is required" });
  }

  if (!lastname) {
    errors.push({ field: "lastname", message: "The field is required" });
  }

  if (!email) {
    errors.push({ field: "email", message: "The field is required" });
  } else if (!emailRegex) {
    errors.push({ field: "email", message: "invalid email" });
  }

  if (!city) {
    errors.push({ field: "city", message: "The field is required" });
  }

  if (!language) {
    errors.push({ field: "language", message: "The field is required" });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

const Joi = require("joi");

// VALIDATION FOR USERS USING JOI

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  hashedPassword: Joi.string().min(4).alphanum().required(),
  city: Joi.string().min(2).max(20),
  language: Joi.string().min(4),
});

const validateUsers = (req, res, next) => {
  const { firstname, lastname, email, hashedPassword, city, language } =
    req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email, hashedPassword, city, language },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ any_name_exampel_validationErrors: error.details });
  } else {
    next();
  }
};

// VALIDATION FOR MOVIES USING JOI
const movieSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  director: Joi.string().max(20).required(),
  year: Joi.number().greater(1999).required(),
  color: Joi.boolean().required(),
  duration: Joi.number().greater(60),
});

const validateMovies = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;

  const { error } = movieSchema.validate(
    { title, director, year, color, duration },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ errors: error.message });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
  validateUsers,
  validateMovies,
};
