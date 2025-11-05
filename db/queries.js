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

module.exports = {
    getAllCategories,
    postNewAnimal,
    postNewCategory
};