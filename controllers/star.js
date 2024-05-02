const { Star } = require("../models");
// Show all resources
const index = async (req, res) => {
  try {
    const stars = await Star.findAll();
    res.status(200).json(stars);
  } catch (e) {
    switch (e.name) {
      case "Invalid Content":
        res.status(400).json({ message: ` ${e.message}` });
    }
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const stars = await Star.findByPk(req.params.id);
    const planets = await stars.getPlanets();
    res.status(200).json({
      stars,
      planets,
    });
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
    const stars = await Star.create(req.body);
    res.status(200).json(stars);
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
    const stars = await Star.update(req.body, {
      where: { id },
    });
    res.status(200).json({ stars });
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
      res.status(200).redirect("/stars");
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

// Export all controller actions
module.exports = { index, show, create, update, remove };
