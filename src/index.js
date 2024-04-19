const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("./swagger.json");
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

app.use("/api-games", swaggerUI.serve, swaggerUI.setup(swaggerConfig));

//ENDPOINTS

app.get("/games", async (req, res) => {
  const connection = await getDBConnection();

  const querySQL =
    "SELECT id, title, cover, year, dev, genre FROM games, genre WHERE idGenre = fk_genre";
  const [result] = await connection.query(querySQL);
  connection.end();

  res.status(200).json({
    success: true,
    results: result,
  });
});

app.get("/game/:id", async (req, res) => {
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

app.post("/game", async (req, res) => {
  const data = req.body;
  const { title, cover, year, dev, genre } = data;
  /* estructura para postman
  {
    "title": "Juego",
    "cover": "enlace aqui",
    "year": 2023,
    "dev": "",
    "genre": ""
  } 
  */
  const connection = await getDBConnection();

  const queryGenre = "INSERT INTO genre (genre) VALUES (?)";
  const [genreResults] = await connection.query(queryGenre, [genre]);

  const queryGame =
    "INSERT INTO games (title, cover, year, dev, fk_Genre) VALUES (?,?,?,?,?)";
  const [gameResults] = await connection.query(queryGame, [
    title,
    cover,
    year,
    dev,
    genreResults.insertId,
  ]);

  connection.end();

  res.status(201).json({
    success: true,
    id: gameResults.insertId,
  });
});

app.put("/game/:id", async (req, res) => {
  const idGame = req.params.id;
  const newData = req.body;
  const { title, cover, year, dev, genre } = newData;

  const connection = await getDBConnection();

  const querySQL =
    "UPDATE genre, games SET title = ?, cover = ?, year = ?, dev = ?, genre = ? WHERE idGenre = fk_genre AND id = ?;";
  const [result] = await connection.query(querySQL, [
    title,
    cover,
    year,
    dev,
    genre,
    idGame,
  ]);
  connection.end();

  if (result.affectedRows > 0) {
    res.status(200).json({
      success: true,
      message: "Información del juego actualizada",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "No se ha actualizado ningún elemento",
    });
  }
});

app.delete("/game/:id", async (req, res) => {
  const idGame = req.params.id;
  const connection = await getDBConnection();

  const querySQL = "DELETE FROM games WHERE id = ?";
  const [result] = await connection.query(querySQL, [idGame]);

  if (result.affectedRows > 0) {
    res.status(200).json({
      success: true,
      message: "Juego eliminado",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "No se ha eliminado ningún juego",
    });
  }
});
