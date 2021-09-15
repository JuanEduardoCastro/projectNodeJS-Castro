const express = require('express');
const entryControllers = require('../controllers/entryControllers')
const router = express.Router();

router.route('/')
.get(entryControllers.home)

router.route('/personal')
.get(entryControllers.personal)

router.route('/admin')
.get(entryControllers.admin)

router.route('/admin/nuevo_empleado')
.get(entryControllers.newPersonal)

// router.route('/registro')
// .get(entryControllers



module.exports = router