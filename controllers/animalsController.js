const db = require("../db/queries");
const { validationResult } = require("express-validator");


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
        categories: categories,
        errors: [],
    });
}

async function postNewAnimal(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const categories = await db.getAllCategories();
        return res.status(400).render("animalForm", {
            title: "Add New Animal",
            categories,
            animal: req.body,
            errors: errors.array(),
        });
    }

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
        animal: animal,
        errors: [],
    });
}

async function postEditAnimal(req, res) {
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const [animal, categories] = await Promise.all([
            db.getAnimalById(id),
            db.getAllCategories(),
        ]);

        return res.status(400).render("editAnimalForm", {
            title: "Edit Animal",
            animal: { ...animal, ...req.body },
            categories,
            errors: errors.array(),
        });
    }

    const { name, categoryId, age, price, status, description, adminPassword } = req.body;

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(401).send("Incorrect admin password.");
    }

    await db.postAnimalEdit(id, name, categoryId, age, price, status, description);
    res.redirect(`/animals/${id}`);
}


async function deleteAnimalItem(req, res) {
    const { id } = req.params;
    const { adminPassword } = req.body;

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
        return res.status(401).send("Incorrect admin password.");
    }

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