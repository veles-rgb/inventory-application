const { Router } = require("express");
const router = Router();
const controller = require("../controllers/categoriesController");

router.get("/", controller.getAllCategories);
router.get("/new", controller.getCategoryForm);
router.post("/new", controller.postNewCategory);
router.get("/:id", controller.getCategoryById);

module.exports = router;