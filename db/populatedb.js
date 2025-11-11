require("dotenv").config();
const pool = require("./pool");

async function main() {
    console.log("Starting database reset and seed...");

    try {
        console.log("Dropping existing tables (if any)...");
        await pool.query(`DROP TABLE IF EXISTS animals;`);
        await pool.query(`DROP TABLE IF EXISTS categories;`);

        console.log("Creating categories table...");
        await pool.query(`
      CREATE TABLE categories (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(30) NOT NULL UNIQUE,
        description TEXT
      );
    `);

        console.log("Creating animals table...");
        await pool.query(`
      CREATE TABLE animals (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(50) NOT NULL,
        category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
        age INTEGER,
        price DECIMAL(10, 2) NOT NULL,
        status VARCHAR(20) DEFAULT 'available',
        description TEXT
      );
    `);
        console.log("Inserting categories...");

        const categoryData = [
            { name: "Dog", description: "Man's best friend." },
            { name: "Cat", description: "Independent and curious companions." },
            { name: "Bird", description: "Feathered friends of all sizes." },
            { name: "Small Animal", description: "Hamsters, guinea pigs, and more." },
            { name: "Reptile", description: "Cold-blooded exotic pets." },
        ];

        const categoryMap = {};

        for (const cat of categoryData) {
            const { rows } = await pool.query(
                `INSERT INTO categories (name, description)
         VALUES ($1, $2)
         RETURNING id, name;`,
                [cat.name, cat.description]
            );
            const inserted = rows[0];
            categoryMap[inserted.name] = inserted.id;
        }

        console.log("Categories inserted:", categoryMap);

        console.log("Inserting animals...");

        const animalData = [
            {
                name: "Bella",
                categoryName: "Dog",
                age: 2,
                price: 799.99,
                status: "available",
                description: "Friendly golden retriever who loves fetch.",
            },
            {
                name: "Max",
                categoryName: "Dog",
                age: 4,
                price: 499.99,
                status: "available",
                description: "Calm and loyal mixed-breed companion.",
            },
            {
                name: "Whiskers",
                categoryName: "Cat",
                age: 3,
                price: 199.99,
                status: "unavailable",
                description: "Sleepy tabby cat who loves windowsills.",
            },
            {
                name: "Luna",
                categoryName: "Cat",
                age: 1,
                price: 249.99,
                status: "available",
                description: "Playful kitten with lots of energy.",
            },
            {
                name: "Kiwi",
                categoryName: "Bird",
                age: 2,
                price: 59.99,
                status: "available",
                description: "Colorful budgie that chirps happily.",
            },
            {
                name: "Nibbles",
                categoryName: "Small Animal",
                age: 1,
                price: 39.99,
                status: "available",
                description: "Curious hamster who loves the wheel.",
            },
            {
                name: "Spike",
                categoryName: "Reptile",
                age: 5,
                price: 179.99,
                status: "available",
                description: "Bearded dragon that enjoys basking.",
            },
        ];

        for (const animal of animalData) {
            const categoryId = categoryMap[animal.categoryName];

            await pool.query(
                `INSERT INTO animals (name, category_id, age, price, status, description)
         VALUES ($1, $2, $3, $4, $5, $6);`,
                [
                    animal.name,
                    categoryId,
                    animal.age,
                    animal.price,
                    animal.status,
                    animal.description,
                ]
            );
        }

        console.log("Animals inserted.");
        console.log("Database reset and seed complete");
    } catch (err) {
        console.error("Error while resetting/seeding DB:", err);
    } finally {
        await pool.end();
        console.log("DB connection closed.");
    }
}

main();
