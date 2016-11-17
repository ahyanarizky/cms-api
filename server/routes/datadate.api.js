const express = require('express');
const router = express.Router();
const controller = require('../controller/datadate.controller')

router.get('/', controller.getDataDate)
router.get('/:id', controller.getOneDataDate)
router.post('/', controller.createDataDate)
router.put('/:id', controller.updateDataDate)
router.delete('/:id', controller.deleteDataDate)

module.exports = router;
