const express = require('express');
const usersControllers = require('../controllers/usersControllers');
const recipesControllers = require('../controllers/recipesControllers');
const router = express.Router();

router.route('/')
.get(recipesControllers.home)

router.route('/nueva-receta')
.get(recipesControllers.newRecipe)

router.route('/nuevo-usuario')
.get(usersControllers.newUser)

router.route('/receta/:id')
.get()

// router.route('/registro')
// .get(entryControllers



module.exports = router