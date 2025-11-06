const db = require("../db/queries");

async function getAllAnimals(req, res) {
    const animals = await db.getAllAnimals();
    res.render("animals", {
        title: "All Animals",
        animals
    });
}

async function getAnimalById(req, res) {
    const { id } = req.params;
    const animal = await db.getAnimalById(id);

    if (!animal) {
        return res.status(404).render("404", {
            title: "Animal Not Found",
            message: `No animal found with ID ${id}.`,
        });
    }

    res.render("animalId", {
        title: `${animal.name} | Animals`,
        animal,
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

async function deleteAnimalItem(req, res) {
    const { id } = req.params;

    await db.deleteAnimalItem(id);

    res.redirect("/animals");
}

module.exports = {
    getAllAnimals,
    getAnimalById,
    getAnimalForm,
    postNewAnimal,
    getEditAnimalForm,
    postEditAnimal,
    deleteAnimalItem
};