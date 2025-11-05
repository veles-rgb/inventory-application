const { Router } = require("express");
const router = Router();
const controller = require("../controllers/animalsController");

router.get("/", controller.getAllAnimals);
router.get("/new", controller.getAnimalForm);
router.post("/new", controller.postNewAnimal);
router.get("/:id/edit", controller.getEditAnimalForm);
router.post("/:id/edit", controller.postEditAnimal);
router.get("/:id", controller.getAnimalById);

module.exports = router;