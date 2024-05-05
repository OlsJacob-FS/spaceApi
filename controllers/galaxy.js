const { Galaxy } = require("../models/");

// Show all resources
const index = async (req, res) => {
  try {
    const galaxy = await Galaxy.findAll();
    // Respond with an array and 2xx status code
    res.status(200).json(galaxy);
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
    //const { id } = req.params;
    const galaxy = await Galaxy.findByPk(req.params.id);
    const stars = await galaxy.getStars();
    //const galaxy = await Galaxy.find
    res.status(200).json({
      galaxy,
      stars,
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
    await Galaxy.create(req.body);

    res.status(201).redirect("/galaxies");
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
    const { id } = req.params;
    const galaxy = await Galaxy.update(req.body, {
      where: { id },
    });
    res.status(200).redirect("/galaxies");
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
    const deleted = await Galaxy.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).redirect("/galaxies");
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
    const galaxy = await Galaxy.finByPk(req.params.id);
    res.render("views/galaxy/edit.twig", { galaxy });
  } else {
    res.render("views/galaxy/_form.twig");
  }

  //res.status(200).json("Galaxy#form(:id)");
};

// Export all controller actions
module.exports = { index, show, create, update, remove, form };
