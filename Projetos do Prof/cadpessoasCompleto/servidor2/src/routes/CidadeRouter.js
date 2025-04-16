const express = require('express');
const router = express.Router();
const CidadeController = require('../controller/CidadeController');

router.get('/:id',  CidadeController.get);
router.get('/filter/getAll',  CidadeController.getAll);

module.exports = router;