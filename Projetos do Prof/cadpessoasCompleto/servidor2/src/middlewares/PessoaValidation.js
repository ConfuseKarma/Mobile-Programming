const PessoaModel = require('../model/PessoaModel');
const { isFuture } = require('date-fns');

//const PessoaValidation = async(req, res, next)
async function PessoaValidation(req, res, next) {
    console.log(req.body);
    const { id, nome, sexo, DataNascimento, Cidadeid } = req.body;

    let alteracaoRegistro = req.params.id != null;

    if (!sexo)
        return res.status(400).json({ erro: 'Informe o sexo' });

    if (!nome || nome.length < 2)
        return res.status(400).json({ erro: 'Informe o nome com ao menos 2 dígitos' });

    if (!DataNascimento)
        return res.status(400).json({ erro: 'Informe a data de nascimento' });

    if (isFuture(new Date(DataNascimento)))
        return res.status(400).json({ erro: 'Data não pode estar no futuro' });

    if (alteracaoRegistro) {
        if (id && Number.parseInt(req.params.id) != Number.parseInt(id))
            return res.status(400).json({ erro: 'Id informado no parâmetro está diferente do id informado no Json' });

        let qtde = (await PessoaModel.countDocuments({ "id": req.params.id }));
        let existe = qtde >= 1;

        if (!existe)
            return res.status(400).json({ erro: 'Não há registro para o Id informado' });
    }
    else {
        if (!id)
            return res.status(400).json({ erro: 'Informe o id' });

        let existe = (await PessoaModel.countDocuments({ "id": id })) >= 1;
        if (existe)
            return res.status(400).json({ erro: 'Já existe uma pessoa cadastrada com este id' });
    }

    return next();
}

module.exports = PessoaValidation;