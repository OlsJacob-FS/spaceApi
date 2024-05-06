const { Star } = require("../models");
// Show all resources
const index = async (req, res) => {
  try {
    const star = await Star.findAll();

    res.render("views/star/index.twig", { star });
  } catch (e) {
    switch (e.name) {
      case "Invalid Content":
        res.status(400).json({ message: ` ${e.message}` });
    }
  }
};

// Show resource //planets
const show = async (req, res) => {
  try {
    const stars = await Star.findByPk(req.params.id);
    const planets = await stars.getPlanets();
    res.render("views/star/show.twig", { stars });
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
    const star = await Star.create(req.body);
    res.redirect(303, `/stars/${star.id}`);
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
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const { id } = req.params;
    await Star.update(req.body, {
      where: { id },
    });
    res.redirect(302, `/stars/${req.params.id}`);
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
    const { id } = req.params;
    const deleted = await Star.destroy({
      where: { id },
    });
    if (deleted) {
      res.redirect(302, `/stars`);
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
    const star = await Star.findByPk(req.params.id);
    res.render("views/star/_form.twig", { star });
  } else {
    res.render("views/star/_form.twig");
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove, form };
