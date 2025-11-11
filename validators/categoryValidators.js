const { body } = require("express-validator");

const categoryValidator = [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required.")
        .isLength({ max: 30 }).withMessage("Name must be at most 30 characters.")
        .escape(),

    body("description")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 1000 }).withMessage("Description is too long.")
        .escape(),
];

module.exports = {
    categoryValidator,
};
