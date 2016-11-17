const express = require('express');
const router = express.Router();
const controller = require('../controller/data.controller')

router.get('/', controller.getData)
router.get('/:id', controller.getOneData)
router.post('/', controller.createData)
router.put('/:id', controller.updateData)
router.delete('/:id', controller.deleteData)

module.exports = router;
