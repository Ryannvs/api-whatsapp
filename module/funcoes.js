/******************************************************************************************************
* Objetivo: Arquivo de funções para gerenciar a API de contatos do whatsapp
* Data: 24/09/25
* Autor: Marcos Ryan
* Versão: 1.0
******************************************************************************************************/

const MESSAGE_ERRO = {
    status: false,
    status_code: 500,
    development: 'Marcos Ryan'
}
const dados = require('./contatos.js')

//Função para trazer todos os dados do usuário indepedente do número
const getAllContatos = function () {
    let message = {
        status: true,
        status_code: 200,
        development: 'Marcos Ryan',
        todosOsDados: []
    }

    dados.contatos['whats-users'].forEach(function (item) {
        message.todosOsDados.push(item)

    })


    message.quantidade = message.todosOsDados.length

    if (message.todosOsDados.length > 0)
        return message //Verdadeira 200
    else
        return MESSAGE_ERRO //Falso 500


}
//console.log(getAllContatos())

const getDadosConta = function (numeroUsuario) {
    
    let dadosUsuario = dados.contatos['whats-users'].find(item => item.number == numeroUsuario)
    
    let dadosById = []
    
    dadosUsuario.contacts.forEach(item => {

        dadosById.push({
            status: true,
            status_code: 200,
            development: 'Marcos Ryan',
            nick: item.nickname,
            foto: item['profile-image'],
            numero: item.number,
            background: item.background,
            ContaInicio: item ['created-since']['start'],
            ContaFim: item ['created-since']['end']
        })
    })
    return dadosById
    // console.log(dadosById)

}

// getDadosConta()

const getDadosContato = function (numeroUsuario) {


    let dadosUsuario = dados.contatos['whats-users'].find(item => item.number == numeroUsuario)

    let dadosContatos = []

    dadosUsuario.contacts.forEach(item => {

        dadosContatos.push({

            nome: item.name,
            numero: item.number,
            descricao: item.description,
            foto: item.image
        })
    })
    return {
        status: true,
        status_code: 200,
        development: 'Marcos Ryan',
        usuario: dadosUsuario.account,
        todosOsDados: dadosContatos
    }

    // console.log(message)

}
// getDadosContato('11987876567')


const getMensagensContato = function (numeroUsuario) {

    let dadosUsuario = dados.contatos['whats-users'].find(item => item.number == numeroUsuario)

    let dadosContatos = []

    dadosUsuario.contacts.forEach(item => {

        dadosContatos.push({

            mensagens: item.messages
        })
    })
    return {
        status: true,
        status_code: 200,
        development: 'Marcos Ryan',
        usuario: dadosUsuario.account,
        todasAsMensagens: dadosContatos
    }
    // console.log(message)
}

// getMensagensContato('11987876567')

const getConversaContato = function (palavra) {
    let resultados = []

    dados['whats-users'].forEach(usuario => {
        usuario.contacts.forEach(contato => {
            contato.messages.forEach(msg => {
                if (msg.content.toLowerCase().includes(palavra.toLowerCase())) {
                    resultados.push({
                        usuario: usuario.account,
                        contato: contato.name,
                        mensagem: msg
                    })
                }
            })
        })
    })

    return resultados
}



module.exports = {
    getAllContatos,
    getDadosConta,
    getDadosContato,
    getMensagensContato,
    getConversaContato
}