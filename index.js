// Módulos necesarios

const express = require("express"); // npm i express path ejs
const path = require("path");

// Datos del servidor

const app = express();
const port = 6265;
const datos = require("./films.json");

// Carpetas del servidor

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

// Raíz

app.get("/", (req, res) => {
  res.render("googlemovies.ejs");
});

// Página de búsqueda

app.get("/search", (req, res) => {
  const { q } = req.query;
  const pelicula = Object.values(datos).find((p) => p.Title.toLowerCase().includes(q.toLowerCase()));
  if (pelicula) {
    res.render("search", { pelicula: pelicula, query: q });
  } else {
    res.render("error", { query: q });
  }
});

// Página de error

app.use((req, res) => {
  res.send("<h1>Error página no encontrada</h1>");
});

// Levantar servidor

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
