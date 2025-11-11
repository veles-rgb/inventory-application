const { body } = require("express-validator");

const animalValidator = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required.")
        .isLength({ max: 50 }).withMessage("Name must be at most 50 characters.")
        .escape(),

    body("categoryId")
        .notEmpty().withMessage("Category is required.")
        .bail()
        .isInt({ min: 1 }).withMessage("Category must be a valid ID.")
        .toInt(),

    body("age")
        .optional({ checkFalsy: true })
        .isInt({ min: 0 }).withMessage("Age must be a non-negative integer.")
        .toInt(),

    body("price")
        .notEmpty().withMessage("Price is required.")
        .bail()
        .isFloat({ min: 0 }).withMessage("Price must be a positive number.")
        .toFloat(),

    body("status")
        .optional({ checkFalsy: true })
        .isIn(["available", "unavailable"])
        .withMessage("Status must be available or unavailable.")
        .trim()
        .escape(),

    body("description")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 2000 }).withMessage("Description is too long.")
        .escape(),
];

module.exports = {
    animalValidator,
};
