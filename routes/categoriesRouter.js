const { Router } = require("express");
const router = Router();
const controller = require("../controllers/categoriesController");
const { categoryValidator } = require("../validators/categoryValidators");

router.get("/", controller.getAllCategories);
router.get("/new", controller.getCategoryForm);
router.post("/new", categoryValidator, controller.postNewCategory);
router.get("/:id/edit", controller.getEditCategoryForm);
router.post("/:id/edit", categoryValidator, controller.postEditCategory);
router.post("/:id/delete", controller.deleteCategoryItem);
router.get("/:id", controller.getCategoryById);

module.exports = router;