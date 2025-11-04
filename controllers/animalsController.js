const db = require("../db/queries");

async function getAllAnimals(req, res) {
    res.render("animals", {
        title: "All Animals"
    });
}

async function getAnimalById(req, res) {
    const id = req.params.id;

    res.render("animalId", {
        title: "animal ID"
    });
}

module.exports = {
    getAllAnimals,
    getAnimalById
};