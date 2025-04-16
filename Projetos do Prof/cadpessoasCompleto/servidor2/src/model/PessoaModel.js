const mongoose = require('../config/database');

const PessoaSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        nome: { type: String, required: true },
        sexo: { type: String, required: true },
        DataNascimento: { type: Date, require: true },
        CidadeId: { type: Number, require: false },
    }
)

module.exports = mongoose.model('Pessoa', PessoaSchema);

/*
https://mongoosejs.com/docs/models.html
When you call mongoose.model() on a schema, Mongoose compiles a model for you.

const schema = new mongoose.Schema({ name: 'string', size: 'string' });
const Tank = mongoose.model('Tank', schema);

The first argument is the singular name of the collection your model 
is for. Mongoose automatically looks for the plural, 
lowercased version of your model name. Thus, for the example above,
the model Tank is for the tanks collection in the database.
*/