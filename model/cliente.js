import ClienteDB from "../DB/clienteDB.js"


export default class Cliente {
    // atributos de um cliente 
    // definição de atributos privados e seus respectivos métodos
    #cpf //# é ultilizado para definir que um atributo é privado
    #nome
    #endereco
    #bairro
    #cidade
    #uf
    #telefone
    #email

    constructor(cpf, nome, endereco, bairro, cidade, uf, telefone, email) {
        this.cpf = cpf
        this.nome = nome
        this.endereco = endereco
        this.bairro = bairro
        this.cidade = cidade
        this.uf = uf
        this.telefone = telefone
        this.email = email

    }

    get cpf() { //pegar
        return this.#cpf
    }
    set cpf(novoCPF) { //adicionar alguma coisa
        this.#cpf = novoCPF
    }
    get nome() {
        return this.#nome
    }
    set nome(novoNome) {
        this.#nome = novoNome
    }
    get endereco() {
        return this.#endereco
    }
    set endereco(novoEndereco) {
        this.#endereco = novoEndereco
    }
    get bairro() {
        return this.#bairro
    }
    set bairro(novoBairro) {
        this.#bairro = novoBairro
    }
    get cidade() {
        return this.#cidade
    }
    set cidade(novoCidade) {
        this.#cidade = novoCidade
    }
    get uf() {
        return this.#uf
    }
    set uf(novaUf) {
        this.#uf = novaUf
    }
    get telefone() {
        return this.#telefone
    }
    set telefone(novoTelefone) {
        this.#telefone = novoTelefone
    }
    get email() {
        return this.#email
    }
    set email(novoEmail) {
        this.#email = novoEmail
    }

    //Formato JSON de um objeto
    toJSON() {
        return {
            'cpf': this.#cpf,
            'nome': this.#nome,
            'endereco': this.#endereco,
            'bairro': this.#bairro,
            'cidade': this.#cidade,
            'uf': this.#uf,
            'telefone': this.#telefone,
            'email': this.#email,

        }
    }
    async gravar() {
        const cliDB = new ClienteDB()
        cliDB.gravar(this)
    }
    async editar() {
        const cliDB = new ClienteDB()
        cliDB.editar(this)
    }
    async excluir() {
        const cliDB = new ClienteDB()
        cliDB.excluir(this)
    }
    async consultar() {
        const cliDB = new ClienteDB()
        return await cliDB.consultar()
    }
    async consultarPorCpf(cpf) {
        const cliDB = new ClienteDB()
        return await cliDB.consultarPorCpf(cpf)
    }

}
