const express = require('express');
const Controllers = require('../controllers/Controllers');
const router = express.Router();

router.route('/')
.get(Controllers.home)

router.route('/otra')
.get(Controllers.otra)

module.exports = router