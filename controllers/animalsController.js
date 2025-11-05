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

async function getEditAnimalForm(req, res) {
    const { id } = req.params;
    const categories = await db.getAllCategories();
    const animal = await db.getAnimalById(id);
    res.render("editAnimalForm", {
        title: "Edit Animal",
        categories: categories,
        animal: animal
    });
}

async function postEditAnimal(req, res) {
    const { id } = req.params;
    const { name, categoryId, age, price, status, description } = req.body;

    await db.postAnimalEdit(id, name, categoryId, age, price, status, description);

    res.redirect("/categories");
}

module.exports = {
    getAllAnimals,
    getAnimalById,
    getAnimalForm,
    postNewAnimal,
    getEditAnimalForm,
    postEditAnimal
};