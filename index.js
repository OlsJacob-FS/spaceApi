//Load in models:
const { Galaxy } = require("./models");
// Load in our Express framework
const express = require(`express`);
// Create a new Express instance called "app"
const app = express();
// Load in our RESTful routers
const routers = require("./routers/index.js");
app.use(express.json());
app.set("twig", __dirname + "/views");
app.set("view engine", "twig");
// Home page welcome middleware
app.get("/", async (req, res) => {
  const galaxy = await Galaxy.findByPk(2);
  res.render("home", {
    galaxy,
  });
});

// Register our RESTful routers with our "app"
app.use(`/planets`, routers.planet);
app.use(`/stars`, routers.star);
app.use(`/galaxies`, routers.galaxy);

// Set our app to listen on port 3000
app.listen(3000);
