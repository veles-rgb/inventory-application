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

module.exports = {
    getAllCategories,
    getCategoryById
};