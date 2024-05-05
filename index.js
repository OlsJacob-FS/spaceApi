//Load in models:
const { Galaxy } = require("./models");
const path = require("path");
// Load in our Express framework
const express = require(`express`);
// Create a new Express instance called "app"
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
// Load in our RESTful routers
const routers = require("./routers/index.js");
app.use(express.json());

app.set("views", path.join(__dirname + "/templates"));
app.set("view engine", "twig");
// Home page welcome middleware
app.get("/", async (req, res) => {
  res.render("views/home.twig", {});
});

// Register our RESTful routers with our "app"
app.use(`/planets`, routers.planet);
app.use(`/stars`, routers.star);
app.use(`/galaxies`, routers.galaxy);

// Set our app to listen on port 3000
app.listen(3000);
