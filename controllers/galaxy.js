const { Galaxy } = require("../models/");

// Show all resources
const index = async (req, res) => {
  try {
    const galaxy = await Galaxy.findAll();
    //res.json(galaxy);
    res.render("views/galaxy/index.twig", { galaxy });
  } catch (e) {
    switch (e.name) {
      case "Invalid Content":
        res.status(400).json({ message: `An error has occure: ${e.message}` });
    }
  }
};
// Show resource
const show = async (req, res) => {
  try {
    // Respond with a single object and 2xx code

    const galaxy = await Galaxy.findByPk(req.params.id);

    res.render("views/galaxy/show.twig", { galaxy });
  } catch (e) {
    switch (e.name) {
      case "Invalid Content":
        res.status(400).json({ message: `${e.message}` });
    }
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const galaxy = await Galaxy.create(req.body);
    res.redirect(303, `/galaxies/${galaxy.id}`);
  } catch (e) {
    switch (e.name) {
      case "Invalid Content":
        res.status(400).json({ message: `${e.message}` });
        break;
      case "Invalid content entry":
        res
          .status(422)
          .json({ message: `Invalid Content Entered: ${e.message}` });
    }
  }
  // Issue a redirect with a success 2xx code
};
//redirect  `/galaxies`, 201

// Update an existing resource
const update = async (req, res) => {
  try {
    await Galaxy.update(req.body, {
      where: { id: req.params.id },
    });

    res.redirect(302, `/galaxies/${req.params.id}`);
  } catch (e) {
    switch (e.name) {
      case "Content Not Found":
        res.status(404).json({ message: `${e.message}` });
        break;

      case "Invalid ID Entered":
        res.status(400).json({ message: `${e.message}` });
        break;
    }
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const deleted = await Galaxy.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.redirect(302, `/galaxies`);
    }
  } catch (e) {
    switch (e.name) {
      case "Content Not Found":
        res.status(404).json({ message: `${e.message}` });
        break;

      case "Invalid ID Entered":
        res.status(400).json({ message: `${e.message}` });
        break;
    }
  }
};

const form = async (req, res) => {
  if ("undefined" !== typeof req.params.id) {
    const galaxy = await Galaxy.findByPk(req.params.id);
    res.render("views/galaxy/_form.twig", { galaxy });
  } else {
    res.render("views/galaxy/_form.twig");
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove, form };
