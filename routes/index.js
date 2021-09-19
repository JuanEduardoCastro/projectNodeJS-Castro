const express = require('express');
const usersControllers = require('../controllers/usersControllers');
const recipesControllers = require('../controllers/recipesControllers');
const router = express.Router();
const userValidator = require('../controllers/userValidator');
const passport = require('passport');

router.route('/')
.get(recipesControllers.home)

// RECIPES
router.route('/recetas')
.get(recipesControllers.getAllRecipes)

// RECIPE
router.route('/nueva-receta')
.get(/* passport.authenticate('local', {session: false}), */ recipesControllers.newRecipe)
.post(recipesControllers.sendNewRecipe)

router.route('/receta/:id')
.get(recipesControllers.getRecipe)

router.route('/editar-receta/:id')
.get(recipesControllers.editRecipe)
// .post(recipesControllers.sendEditRecipe)

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
.post(usersControllers.sendNewUser)

router.route('/ingreso')
.get(usersControllers.logIn)
.post(usersControllers.sendLogIn)

router.route('/salir')
.get(usersControllers.logOut)


module.exports = router