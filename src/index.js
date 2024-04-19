const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "games_db",
  });
  connection.connect();
  return connection;
}

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log("Server is listening in http://localhost:" + port);
});

//ENDPOINTS

app.get("/games", async (req, res) => {
  const connection = await getDBConnection();

  const querySQL =
    "SELECT id, title, cover, year, dev, genre FROM games, genre WHERE idGenre = fk_genre";
  const [result] = await connection.query(querySQL);
  connection.end();

  res.status(200).json({
    info: { success: true, count: result.length },
    results: result,
  });
});

app.get("/games/:id", async (req, res) => {
  const idGame = req.params.id;
  const connection = await getDBConnection();

  const querySQL =
    "SELECT id, title, cover, year, dev, genre FROM games, genre WHERE idGenre = fk_genre AND id = ?";
  const [result] = await connection.query(querySQL, [idGame]);
  connection.end();

  if (result.length === 0) {
    res.status(404).json({
      success: false,
      error: "No hay ningún juego con ese id",
    });
  } else {
    res.status(200).json({
      success: true,
      result: result,
    });
  }
});
