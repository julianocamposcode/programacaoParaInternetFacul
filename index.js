import Cliente from "./model/cliente.js";

var cliente = new Cliente(
    '121.652.899-39',
    'Juliano Campos dos Santos',
    'Rua Um',
    'Bairro Um',
    'Cidade Um',
    'UF',
    '49 9906 1282',
    'juliano.kampus@gmail'
)
//gravar o cliente no banco de dados 
//resolvendo os métodos assíncronos s

cliente.gravar().then(() => {
    console.log('Cliente gravado com sucesso')
}).catch((erro) => {
    console.log(`Erro ao gravar o cliente ${erro}`)
})
cliente.consultar().then(listaCLientes => {
    for (const cliente of listaCLientes) {
        console.log(cliente.toJSON())
    }
})

// cliente.excluir().then(() => {
//     console.log('cliente excluido com sucesso')
// }).catch(() => {
//     console.log('Erro ao excluir o cliente')
// })

// cliente.editar().then(() => {
//     console.log('cliente editado com sucesso')
// }).catch(() => {
//     console.log('Erro ao editar o cliente')
// })
