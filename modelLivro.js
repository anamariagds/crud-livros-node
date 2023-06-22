const mongoose = require('mongoose')

const LivroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autore: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    resumo: {
        type: String,
        required: true
    }
   
})

module.exports = mongoose.model('livro', LivroSchema)