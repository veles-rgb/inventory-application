const db = require("../db/queries");

async function getAllCategories(req, res) {
    res.render("categories", {
        title: "All Categories"
    });
}

async function getCategoryById(req, res) {
    const id = req.params.id;
    res.render("categoryId", {
        title: "Category :id"
    });
}

async function getCategoryForm(req, res) {
    res.render("categoryForm", {
        title: "New Category"
    });
}

async function postNewCategory(req, res) {
    const { name, description } = req.body;

    await db.postNewCategory(name, description);
    res.redirect("/categories");
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryForm,
    postNewCategory
};