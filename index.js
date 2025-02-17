import express from "express";
import autenticar from "./seguranca/autenticar.js";

const porta = 3000
const localhost = '0.0.0.0' //define que nosso aplicativo estará disponível em todas as interfaces de redes desse computador

const app = express();

app.get('/dinheiro', (req, resp) => {

})

// o http é um protocolo estateles (sem estabelecimento de sessão)
// o servidor recebe uma requisição , processa a requisição e envia uma resposta 
// sem se preucupar em identificar os atores envolvidos

//disponibilizando a estrutura da pasta privada
// a função autenticar se comporta como um middware aquele que atua na camada do meio 

app.use(autenticar, express.static('./private'))

//roda o arquivo index.html padrão para a aplicação pasta pública
app.use(express.static('./public'))

//preparação do servidor para disponibilizar conteúdos estáticos
app.listen(porta, localhost, () => {
    console.log(`Servidor disponível em ${porta}!`)
})
