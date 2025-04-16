const express = require('express');
const router = express.Router();
const PessoaController = require('../controller/PessoaController');
const PessoaValidation = require('../middlewares/PessoaValidation');

router.post('/', PessoaValidation,  PessoaController.create);
router.put('/:id', PessoaValidation,  PessoaController.update);
router.delete('/:id',  PessoaController.delete);
router.get('/:id',  PessoaController.get);
router.get('/filter/getAll',  PessoaController.getAll);
router.get('/filter/getNextId',  PessoaController.getNextId);

module.exports = router;