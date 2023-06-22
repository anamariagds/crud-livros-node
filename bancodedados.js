const mongoose = require('mongoose') //require traz o pacote
require('dotenv').config()

async function conectaBd() {
    try {
        console.log('Conexão com banco de dados iniciada...')

        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })

        console.log('Conexão feita com sucesso!')
    } catch(erro){
        console.log(erro)
    }
}

module.exports = conectaBd