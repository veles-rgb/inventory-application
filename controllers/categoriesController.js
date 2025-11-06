const db = require("../db/queries");

async function getAllCategories(req, res) {
    const categories = await db.getAllCategories();
    res.render("categories", {
        title: "All Categories",
        categories
    });
}

async function getCategoryById(req, res) {
    const id = req.params.id;
    const category = await db.getCategoryById(id);

    if (!category) {
        return res.status(404).render("404", {
            title: "Category Not Found",
            message: `No category found with ID ${id}.`,
        });
    }

    res.render("categoryId", {
        title: `${category.name} | Categories`,
        category
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

async function deleteCategoryItem(req, res) {
    const { id } = req.params;

    await db.deleteCategoryItem(id);

    res.redirect("/categories");
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryForm,
    postNewCategory,
    getEditCategoryForm,
    postEditCategory,
    deleteCategoryItem
};