const { Router } = require("express");
const router = Router();
const controller = require("../controllers/categoriesController");

router.get("/", controller.getAllCategories);
// router.get("/new",)
// router.post("/new",)
router.get("/:id", controller.getCategoryById);

module.exports = router;