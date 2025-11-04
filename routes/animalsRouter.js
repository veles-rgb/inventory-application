const { Router } = require("express");
const router = Router();
const controller = require("../controllers/animalsController");

router.get("/", controller.getAllAnimals);
// router.get("/new",);
// router.post("/new",);
router.get("/:id", controller.getAnimalById);

module.exports = router;