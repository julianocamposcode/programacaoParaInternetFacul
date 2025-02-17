import express from "express";
import autenticar from "./seguranca/autenticar.js";
import session from "express-session";

const porta = 3000
const localhost = '0.0.0.0' //define que nosso aplicativo estará disponível em todas as interfaces de redes desse computador

const app = express();

// configurar o express para reconhecer o corpo da requisição o campos do formulário

app.use(express.urlencoded({ extended: true })) //biblioteca QS / QueryString

app.use(session({
    secret: 'chaveSecreta',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 15 // 15 minutos de sessão
    }
}))

// o http é um protocolo estateles (sem estabelecimento de sessão)
// o servidor recebe uma requisição , processa a requisição e envia uma resposta 
// sem se preucupar em identificar os atores envolvidos

//com o auxílio da biblioteca express-session 
//vamos  implementar a halilidade de estabelecer uma sessão 
// para  um determinado usuário 


// oferecer o recurso login

app.get("/login", (requisicao, resposta) => {
    resposta.redirect('/login.html');
})

app.post("/login", (requisicao, resposta) => {
    const usuario = requisicao.body.nome
    const senha = requisicao.body.senha
    if (usuario === 'admin@gmail' && senha === '123') {
        requisicao.session.autenticado = true;
        resposta.redirect('/menu.html');
    } else {
        resposta.redirect('/login.html');
    }
})


app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy()
    resposta.redirect('/login.html');
})

//roda o arquivo index.html padrão para a aplicação pasta pública
app.use(express.static('./public'))

//disponibilizando a estrutura da pasta privada
// a função autenticar se comporta como um middware aquele que atua na camada do meio 
app.use(autenticar, express.static('./private'))


//preparação do servidor para disponibilizar conteúdos estáticos
app.listen(porta, localhost, () => {
    console.log(`Servidor disponível em ${porta}!`)
})
