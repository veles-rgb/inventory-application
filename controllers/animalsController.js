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

async function getAnimalForm(req, res) {
    const categories = await db.getAllCategories();

    res.render("animalForm", {
        title: "Add New Animal",
        categories: categories
    });
}

async function postNewAnimal(req, res) {
    const { name, categoryId, age, price, status, description } = req.body;

    await db.postNewAnimal(name, categoryId, age, price, status, description);

    res.redirect("/animals");
}

module.exports = {
    getAllAnimals,
    getAnimalById,
    getAnimalForm,
    postNewAnimal
};