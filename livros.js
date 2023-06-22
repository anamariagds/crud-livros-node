const express = require('express')
const router = express.Router()
const cors = require('cors')

const conectaBd = require('./bancodedados')
conectaBd()

const Livro = require('./modelLivro')

const app = express()
app.use(express.json())
app.use(cors())
const porta = 3333
//GET
async function mostraLivros(request, response){
    try {
        const livrosNoBancoDeDados = await Livro.find()

        response.json(livrosNoBancoDeDados)
    }catch (erro){
        console.log(erro)
    }

}
//POST
async function cadastraLivro(request, response){
    const novoLivro  = new Livro({
        titulo: request.body.titulo,
        autore: request.body.autore,
        categoria: request.body.categoria,
        resumo: request.body.resumo
    })
    
    try {
        const livroCadastrado = await novoLivro.save() //salva as inf da nova mulher no bd
        response.status(201).json(livroCadastrado)
    }catch (erro) {
        console.log(erro)
    }
}

//PATCH
async function atualizaLivro(request, response){
    try {
        const livroEncontrado = await Livro.findById(request.params.id)

        if (request.body.titulo) {
            livroEncontrado.titulo = request.body.titulo
        } 
    
        if (request.body.autore) {
            livroEncontrado.autore = request.body.autore
        }
    
        if (request.body.categoria) {
            livroEncontrado.categoria = request.body.categoria
        } 

        if (request.body.resumo){
            livroEncontrado.resumo = request.body.resumo
        }

        const livroAtualizado = await livroEncontrado.save()

        response.json(livroAtualizado)
    }catch (erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaLivro(request, response){
    try {

        await Livro.findByIdAndDelete(request.params.id)
        response.json({mensagem: 'Livro deletado com sucesso!'})
    }catch (erro) {
        console.log(erro)
    }
    

}


function mostraPorta(){
    console.log(`Servidor rodando na porta: ${porta}`)
}

app.use(router.get('/livros', mostraLivros))
app.use(router.post('/livros', cadastraLivro))
app.use(router.patch('/livros/:id', atualizaLivro))
app.use(router.delete('/livros/:id', deletaLivro))

app.listen(porta, mostraPorta) 