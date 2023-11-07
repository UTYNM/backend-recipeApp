const express = require("express");
const recipeControllers = require("../controllers/recipeController");
const { authUser } = require("../middlewares/authentication");
const { checkAdmin } = require("../middlewares/authorization");
const { checkUserOwnership } = require("../middlewares/authorization");
const router = express.Router();

router.post('/', authUser, recipeControllers.createRecipe);
router.get("/", recipeControllers.getRecipe);
router.get('/:id', recipeControllers.getRecipeById);
router.put('/:id', authUser, checkUserOwnership, recipeControllers.updateRecipe);
router.delete('/:id', authUser, checkAdmin, recipeControllers.deleteRecipe);

module.exports = router;