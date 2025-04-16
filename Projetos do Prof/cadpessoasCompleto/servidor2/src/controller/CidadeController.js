const CidadeModel = require('../model/CidadeModel');

class CidadeController {
    async getAll(req, res) {
        await CidadeModel.find().sort('nome')
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }

    async get(req, res) {
        await CidadeModel.findOne({ "id": req.params.id })
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }
}

module.exports = new CidadeController();
