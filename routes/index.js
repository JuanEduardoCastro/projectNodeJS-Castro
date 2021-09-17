const express = require('express');
const usersControllers = require('../controllers/usersControllers');
const recipesControllers = require('../controllers/recipesControllers');
const router = express.Router();

router.route('/')
.get(recipesControllers.home)

// RECIPES
router.route('/recetas')
.get(recipesControllers.getAllRecipes)

// RECIPE
router.route('/nueva-receta')
.get(recipesControllers.newRecipe)
.post(recipesControllers.sendNewRecipe)

router.route('/receta/:id')
.get(recipesControllers.getRecipe)

router.route('/editar-receta/:id')
.get(recipesControllers.editRecipe)
// .post(recipesControllers.sendEditRecipe)

// USERS
router.route('/nuevo-usuario')
.get(usersControllers.newUser)
.post(usersControllers.sendNewUser)

router.route('/usuario')
.get(usersControllers.getUser)

router.route('/editar-usuario')
.get(usersControllers.editUser)
.post(usersControllers.sendNewUser)

router.route('/ingreso')
.get(usersControllers.logIn)
.post(usersControllers.sendLogIn)



module.exports = router