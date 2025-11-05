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

async function getEditCategoryForm(req, res) {
    const { id } = req.params;
    const category = await db.getCategoryById(id);
    res.render("editCategoryForm", {
        title: "Edit Category",
        category: category
    });
}

async function postEditCategory(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    await db.postEditCategory(id, name, description);

    res.redirect("/animals");
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryForm,
    postNewCategory,
    getEditCategoryForm,
    postEditCategory
};