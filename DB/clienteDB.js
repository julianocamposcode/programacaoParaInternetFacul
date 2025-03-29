import Cliente from "../model/cliente.js";
import conectar from "./conexao.js";

export default class ClienteDB {

    constructor() {
        this.init()
    }
    //nós estaremos nos comunicando com uma aplicação  
    //externa  (banco de dados)
    //portanto nossos métodos serão assíncronos 
    //significando que a resposta não tem previsão para chegar 
    //a resposta depende do banco de dados
    async init() {
        try {
            const conexao = await conectar()
            const sql = `CREATE TABLE IF NOT EXISTS cliente (
            cpf VARCHAR(14) NOT NULL PRIMARY KEY ,
            nome VARCHAR(100) NOT NULL,
            endereco VARCHAR(150) NOT NULL,
            bairro VARCHAR(100) NOT NULL,
            cidade VARCHAR(100) NOT NULL,
            uf VARCHAR(2) NOT NULL,
            telefone VARCHAR(15) NOT NULL,
            email VARCHAR(100) NOT NULL
            )`
            await conexao.execute(sql)
        } catch (error) {
            console.log(`Erro ao iniciar a tabela cliente ${error}`)
        }
    }
    async gravar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar()
            const sql = `INSERT INTO cliente (cpf, nome, endereco, bairro, cidade, uf, telefone, email)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
             `
            const parametros = [
                cliente.cpf,
                cliente.nome,
                cliente.endereco,
                cliente.bairro,
                cliente.cidade,
                cliente.uf,
                cliente.telefone,
                cliente.email
            ]
            await conexao.execute(sql, parametros)
            await conexao.release() //liberar a conexao de volta para o pool
        }
    }
    async editar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar()
            const sql = `
            UPDATE cliente SET nome = ?,
             endereco = ?,
             bairro = ?,
             cidade = ?,
             uf = ?,
             telefone = ?,
             email = ? WHERE cpf = ?
             `
            const parametros = [
                cliente.nome,
                cliente.endereco,
                cliente.bairro,
                cliente.cidade,
                cliente.uf,
                cliente.telefone,
                cliente.email,
                cliente.cpf
            ]
            await conexao.execute(sql, parametros)
            await conexao.release()
        }
    }
    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar()
            const sql = `DELETE FROM cliente WHERE cpf = ?`
            const parametros = [cliente.cpf]
            await conexao.execute(sql, parametros)
            await conexao.release()
        }
    }
    async consultar() { 
        const conexao = await conectar()
        const sql = `SELECT * FROM cliente ORDER BY nome`
        const [linhas, campos] = await conexao.execute(sql)
        await conexao.release() 
        const clientes = []
        for (const linha of linhas) {
            const cliente = new Cliente(
                linha.cpf,
                linha.nome,
                linha.endereco,
                linha.bairro,
                linha.cidade,
                linha.uf,
                linha.telefone,
                linha.email
            )
            clientes.push(cliente)
        }
        return clientes
    }

    async consultarPorCpf(cpf) {
        const conexao = await conectar()
        const sql = `SELECT * FROM cliente WHERE cpf = ?`
        const [linhas, campos] = await conexao.execute(sql, [cpf])
        await conexao.release()
        const clientes = []
        for (const linha of linhas) {
            const cliente = new Cliente(
                linha.cpf,
                linha.nome,
                linha.endereco,
                linha.bairro,
                linha.cidade,
                linha.uf,
                linha.telefone,
                linha.email
            )
            clientes.push(cliente)
        }
        return clientes
    }
}