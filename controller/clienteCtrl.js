//Essa classe será responsável por controlar as requisições HTTp para clientes
//Requisições HTTP: GET POST PUT DELETE
//Requisição e resposta

import Cliente from "../model/cliente"

export default class ClienteCtrl {
    // PUT
    gravar(resquisicao, resposta) {
        if (resquisicao.method === 'POST' && resquisicao.is("application/json")) {
            const dados = resquisicao.body
            const cpf = dados.cpf
            const nome = dados.nome
            const endereco = dados.endereco
            const bairro = dados.bairro
            const cidade = dados.cidade
            const uf = dados.uf
            const telefone = dados.telefone
            const email = dados.email

            if (cpf && nome && endereco && bairro && cidade && uf && telefone && email) {
                const cliente = new Cliente(cpf, nome, endereco, bairro, cidade, uf, telefone, email)
                cliente.gravar().then(() => {
                    resposta.status(201).json({
                        "status": true,
                        "mensagem": "Cliente gravado com sucesso"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao gravar o cliente" + erro
                    })
                })
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "todos os campos devem ser preenchidos"
                })
            }
        } else {
            resposta.status(400).json(
                {
                    "status": false,
                    "mensagem": "Requisição Inválida"
                }
            )

        }
    }
    // POST PATCH
    alterar(resquisicao, resposta) {
        if (resquisicao.method === 'PUT' || resquisicao.method === 'PATCH' && resquisicao.is('application/json')) {
            const dados = resquisicao.body
            const cpf = dados.cpf
            const nome = dados.nome
            const endereco = dados.endereco
            const bairro = dados.bairro
            const cidade = dados.cidade
            const uf = dados.uf
            const telefone = dados.telefone
            const email = dados.email
            if (cpf && nome && endereco && bairro && cidade && uf && telefone && email) {
                const cliente = new Cliente(cpf, nome, endereco, bairro, cidade, uf, telefone, email)
                cliente.alterar().then(() => {
                    resposta.status(201).json({
                        "status": true,
                        "mensagem": "Cliente alterado com sucesso"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao alterar o cliente" + erro
                    })
                })
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "todos os campos devem ser preenchidos"
                })
            }

        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição Inválida"
            })

        }
    }
    // DELETE
    excluir(resquisicao, resposta) {
        if (resquisicao.method === 'DELETE' && resquisicao.is('application/json')) {
            const dados = resquisicao.body
            const cpf = dados.cpf
            if (cpf) {
                const cliente = new Cliente(cpf)
                cliente.excluir().then(() => {
                    resposta.status(201).json({
                        "status": false,
                        "mensagem": "Cliente excluído com sucesso"
                    })
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o cliente" + erro
                    })
                })
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe o cpf do cliente a ser excluído"
                })
            }
        } else {
        }
    }
    // GET
    consultar(resquisicao, resposta) {
        if (resquisicao.method === 'GET') {
            const cliente = new Cliente();
            cliente.consultar().then((listaCLientes) => {
                resposta.status(200).json({
                    "status": true,
                    "clientes": listaCLientes
                })

            }).catch(erro => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar o cliente" + erro
                })
            })
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição Inválida"
            })
        }
    }
}