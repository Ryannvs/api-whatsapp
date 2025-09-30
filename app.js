/******************************************************************************************************
 * Objetivo: EndPoints referente a API de contatos do whatsapp
 * Data: 24/09/25
 * Autor: Marcos Ryan
 * Versão: 1.0
 * 
 * Observações: Instalação do Express, Cors, Body-Parser
 * npm install express --save
 * npm install cors express --save
 * npm install body-parser --save
 ******************************************************************************************************/

const express = require('express')
const funcoes = require('./module/funcoes.js')
const app = express()
const port = 8000


app.use(express.json())


// Todos os contatos
app.get('/v1/whatsapp/usuarios', function (req, res) {
    const dados = funcoes.getAllContatos()
    res.json(dados)
})

// Dados de todas as contas
app.get('/v1/whatsapp/contas', function (req, res) {
    const numero = req.query.numero
    if (!numero) {
        res.json({ status: false, message: "O 'numero' é obrigatório" })
        return
    }
    const dados = funcoes.getDadosConta(numero)
    res.json(dados || { status: false, message: "Nenhuma conta encontrada" })
})

//Dados de um usuário específico por número
app.get('/v1/whatsapp/contato', function (req, res) {
    const numero = req.query.numero
    if (!numero) {
        res.json({ status: false, message: "O 'numero' é obrigatório" })
        return
    }
    const dadosContato = funcoes.getDadosContato(numero)
    res.json(dadosContato || { status: false, message: "Contato não encontrado" })
})

// Mensagens de um usuário específico por número
app.get('/v1/whatsapp/mensagens', function (req, res) {
    const numero = req.query.numero
    if (!numero) {
        res.json({ status: false, message: "O 'numero' é obrigatório" })
        return
    }
    const mensagens = funcoes.getMensagensContato(numero)
    res.json(mensagens || { status: false, message: "Mensagens não encontradas" })
})

// Buscar conversa por palavra-chave
app.get('/v1/whatsapp/conversa', function (req, res) {
    const palavra = req.query.palavra
    if (!palavra) {
        res.json({ status: false, message: " 'palavra' é obrigatório" })
        return
    }
    const resultados = funcoes.getConversaContato(palavra)
    if (resultados && resultados.length > 0) {
        res.json({ status: true, encontrados: resultados.length, conversas: resultados })
    } else {
        res.json({ status: false, message: "Nenhuma conversa encontrada" })
    }
})

// Iniciar o servidor
app.listen(port, function () {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
