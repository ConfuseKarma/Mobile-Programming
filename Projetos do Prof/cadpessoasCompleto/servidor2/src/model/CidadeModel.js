const mongoose = require('../config/database');

const CidadeSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        nome: { type: String, required: true }        
    }
)

module.exports = mongoose.model('Cidade', CidadeSchema);