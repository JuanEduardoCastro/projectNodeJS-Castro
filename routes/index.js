const express = require('express');
const usersControllers = require('../controllers/usersControllers');
const recipesControllers = require('../controllers/recipesControllers');
const router = express.Router();
const userValidator = require('../controllers/userValidator');
const recipeValidator = require('../controllers/recipeValidator');


router.route('/')
.get(recipesControllers.home)

// RECIPES
router.route('/recetas')
.get(recipesControllers.getAllRecipes)

router.route('/recetas-del-usuario')
.get(recipesControllers.getRecipesByUser)

// RECIPE
router.route('/nueva-receta')
.get(recipesControllers.newRecipe)
.post(recipesControllers.sendNewRecipe)

router.route('/receta/:id')
.get(recipesControllers.getRecipe)

router.route('/editar-receta/:id')
.get(recipesControllers.editRecipe)
.post( recipesControllers.sendNewRecipe)

router.route('/confirmacion-eliminar-receta/:id')
.get(recipesControllers.deleteRecipe)

router.route('/eliminar-receta/:id')
.post(recipesControllers.deleteRecipe)

// USERS
router.route('/nuevo-usuario')
.get(usersControllers.newUser)
.post(userValidator, usersControllers.sendNewUser)

router.route('/usuario')
.get(usersControllers.getUser)

router.route('/confirmacion-eliminar-usuario')
.get(usersControllers.deleteUser)

router.route('/eliminar-usuario')
.post(usersControllers.deleteUser)

router.route('/editar-usuario')
.get(usersControllers.editUser)
.post(userValidator, usersControllers.sendNewUser)

router.route('/ingreso')
.get(usersControllers.logIn)
.post(usersControllers.sendLogIn)

router.route('/salir')
.get(usersControllers.logOut)


module.exports = router