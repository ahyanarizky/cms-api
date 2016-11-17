const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller')

/* Routing Authentication */
router.post('/register', controller.registerProcess);
router.post('/login', controller.loginProcess)

module.exports = router;
