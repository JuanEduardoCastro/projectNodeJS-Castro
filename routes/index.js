const express = require('express');
const entryControllers = require('../controllers/entryControllers')
const router = express.Router();

router.route('/')
.get(entryControllers.home)

router.route('/empleado')
.get(entryControllers.otra)

router.route('/admin')
.get(entryControllers.otra)

router.route('/formulario/empleado')
.get(entryControllers.otra)

router.route('/registro')
.get(entryControllers.otra)



module.exports = router