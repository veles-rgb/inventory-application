const pool = require("./pool");

async function postNewAnimal(name, categoryId, age, price, status, description) {
    const query = `
    INSERT INTO animals (name, category_id, age, price, status, description)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

    const values = [name, categoryId, age, price, status, description];

    const result = await pool.query(query, values);
    return result.rows[0];
}

async function getAllAnimals() {
    const { rows } = await pool.query(
        "SELECT * FROM animals"
    );
    return rows;
}

async function getAnimalsWithCategoryId(id) {
    const categoryId = Number.parseInt(id, 10);

    if (Number.isNaN(categoryId)) {
        return null;
    }

    const { rows } = await pool.query(
        "SELECT * FROM animals WHERE category_id = ($1)",
        [categoryId]
    );

    return rows;
}

async function getAllCategories() {
    const { rows } = await pool.query(
        "SELECT * FROM categories"
    );
    return rows;
}

async function postNewCategory(name, description) {
    const query = `
    INSERT INTO categories (name, description)
    VALUES ($1, $2)
    RETURNING *;
    `;

    const values = [name, description];
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function getAnimalById(id) {
    const animalId = Number.parseInt(id, 10);

    if (Number.isNaN(animalId)) {
        return null;
    }

    const result = await pool.query(
        "SELECT * FROM animals WHERE id = ($1)",
        [animalId]
    );

    return result.rows[0] || null;
}

async function getCategoryById(id) {
    const categoryId = Number.parseInt(id, 10);

    if (Number.isNaN(categoryId)) {
        return null;
    }

    const result = await pool.query(
        "SELECT * FROM categories WHERE id = ($1)",
        [categoryId]
    );

    return result.rows[0] || null;
}

async function postAnimalEdit(id, name, categoryId, age, price, status, description) {
    const animalId = Number(id);
    if (!Number.isInteger(animalId)) throw new Error("Invalid Animal ID");

    const query = `
    UPDATE animals
    SET name = $1,
        category_id = $2,
        age = $3,
        price = $4,
        status = $5,
        description = $6
    WHERE id = $7
    RETURNING *;
  `;

    const values = [name, categoryId, age, price, status, description, animalId];

    const result = await pool.query(query, values);
    return result.rows[0];
}

async function postEditCategory(id, name, description) {
    const categoryId = Number(id);
    if (!Number.isInteger(categoryId)) throw new Error("Invalid Category ID");

    const query = `
    UPDATE categories
    SET name = $2,
        description = $3
    WHERE id = $1
    RETURNING *;
  `;

    const values = [categoryId, name, description];

    const result = await pool.query(query, values);
    return result.rows[0];
}

async function deleteAnimalItem(id) {
    const animalId = Number(id);
    if (!Number.isInteger(animalId)) throw new Error("Invalid Animal ID");

    const result = await pool.query(
        "DELETE FROM animals WHERE id = ($1) RETURNING *;",
        [animalId]
    );

    return result.rows[0];
}

async function deleteCategoryItem(id) {
    const categoryId = Number(id);
    if (!Number.isInteger(categoryId)) throw new Error("Invalid Category ID");

    await pool.query("DELETE FROM animals WHERE category_id = $1", [categoryId]);

    const result = await pool.query(
        "DELETE FROM categories WHERE id = $1 RETURNING *;",
        [categoryId]
    );

    return result.rows[0];
}

module.exports = {
    getAllCategories,
    getAllAnimals,
    postNewAnimal,
    postNewCategory,
    getAnimalById,
    postAnimalEdit,
    getCategoryById,
    postEditCategory,
    deleteAnimalItem,
    deleteCategoryItem,
    getAnimalsWithCategoryId
};