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
.post(usersControllers.sendNewUser)

router.route('/usuario/:id')
.get(usersControllers.getUser)

router.route('/editar-usuario/:id')
.get(usersControllers.editUser)
.post(usersControllers.sendEditUser)

// router.route('/receta/:id')
// .get()

// router.route('/registro')
// .get(entryControllers



module.exports = router