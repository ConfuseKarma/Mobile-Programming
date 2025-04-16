const PessoaModel = require('../model/PessoaModel');

class PessoaController {
    async create(req, res) {  // req = request  e res = response
        const pessoa = new PessoaModel(req.body);
        await pessoa
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }


    async getAll(req, res) {
        await PessoaModel.find().sort('id')
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }


    async get(req, res) {
        await PessoaModel.findOne({ "id": req.params.id })
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }

    async getNextId(req, res) {
        let resposta = await PessoaModel.findOne().select("id")
                       .sort({ "id": 'descending' }).limit(1);
        let id = 1;
        if (resposta != null)
        {
            console.log(resposta);
            id = Number.parseInt(resposta.id) +1;
        }

        return res.status(200).json(id);
    }


    async update(req, res) {

        await PessoaModel.findOneAndUpdate(
                { "id": Number.parseInt(req.params.id) }, 
                req.body, { new: true }
             )
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }

    async delete(req, res) {
        await PessoaModel.findOneAndDelete({ "id": req.params.id })
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }

}

module.exports = new PessoaController();

