require("dotenv").config();

const mysql = require("mysql2/promise");

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// connecting with the database
database
  .getConnection()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.error(`someting happen ${err}`);
  });

// USUING GET METHOD.....................AND ADD FILTERS!!...............................................

// getting the movies
const getMovies = (req, res) => {
  let sql = "select * from movies";
  const sqlValues = [];

  if (req.query.color) {
    sql += " where color = ?";
    sqlValues.push(req.query.color);
  }
  if (req.query.max_duration) {
    sql += " and duration <= ?";
    sqlValues.push(req.query.max_duration);
  } else if (req.query.max_duration) {
    sql += " where duration <= ?";
    sqlValues.push(req.query.max_duration);
  }

  database
    .query(sql, sqlValues)
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      res.status(500).send("Error retrieving data from database", err);
    });
};

// finding movie with id
const getMoviesId = (req, res) => {
  const id = req.params.id;
  database.query("select * from movies WHERE id = ?", [id]).then(([movies]) => {
    if (movies.length > 0) {
      res.status(200).json(movies);
    } else {
      res.sendStatus(404);
    }
  });
};
// getting the users
const getUsers = (_, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
};
// finding users with id
const getUsersId = (req, res) => {
  const id = req.params.id;
  database.query("select * from users where id = ?", [id]).then(([users]) => {
    console.log(users);
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.sendStatus(404);
    }
  });
};

// USUING POST METHOD....................................................................
const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies( title, director, year, color, duration ) VALUES(?, ?, ?, ?, ?) ",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`upss ${err}`);
    });
};

const postUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users( firstname, lastname, email, city, language ) VALUES (?,?,?,?,?)",
      [firstname, lastname, email, city, language]
    )
    .then(([users]) => {
      res.location(`/users/${users.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      res.status(500).send(`upss ${err}`);
    });
};

//////////////////////// PUT METHOD //////////////////////////////////////

const updateMovies = (req, res) => {
  const { title, director, year, color, duration } = req.body;
  const id = req.params.id;

  database
    .query(
      "UPDATE movies SET  title = ? , director=?, year = ?, color = ?, duration = ? WHERE id = ? ",
      [title, director, year, color, duration, id]
    )
    .then(([movies]) => {
      console.log(movies.affectedRows);
      if (!movies.affectedRows) {
        res.status(404).send("error happen!");
      } else {
        res.sendStatus(200);
      }
    })
    .catch((error) => {
      res.status(500).send("error editing", error);
    });
};

// BUILDING PUT METHOD WITH USERS !!
const updateUsers = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  const id = req.params.id;

  database
    .query(
      "UPDATE users SET firstname =?, lastname=?, email=?, city=?, language=? where id=?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([user]) => {
      if (!user.affectedRows) {
        res.status(404).send("error happen, please try again!");
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      res.status(500).send("error", err);
    });
};

// DELETE METHOD ON MOVIES!!
const deleteMovies = (req, res) => {
  const id = req.params.id;

  database
    .query("DELETE FROM movies WHERE id = ?", [id])
    .then(([movies]) => {
      if (!movies.affectedRows) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      res.status(404).send("error deleting the movie", err);
    });
};

const deleteUsers = (req, res) => {
  const id = req.params.id;

  database
    .query("DELETE FROM users WHERE id = ? ", [id])
    .then(([user]) => {
      if (user.affectedRows) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(404).send("anything blablablabla", err);
    });
};

module.exports = {
  getMovies,
  getMoviesId,
  getUsers,
  getUsersId,
  postMovie,
  postUsers,
  updateMovies,
  updateUsers,
  deleteMovies,
  deleteUsers,
};
