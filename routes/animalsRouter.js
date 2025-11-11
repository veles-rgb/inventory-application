const { Router } = require("express");
const router = Router();
const controller = require("../controllers/animalsController");
const { animalValidator } = require("../validators/animalValidators");

router.get("/", controller.getAllAnimals);
router.get("/new", controller.getAnimalForm);
router.post("/new", animalValidator, controller.postNewAnimal);
router.get("/:id/edit", controller.getEditAnimalForm);
router.post("/:id/edit", animalValidator, controller.postEditAnimal);
router.post("/:id/delete", controller.deleteAnimalItem);
router.get("/:id", controller.getAnimalById);

module.exports = router;