import express from "express"
import rotaCLiente from "./Routes/rotaCliente.js"

const host = '0.0.0.0' // qq interface do host
const app = express()

// preparar a aplicação para manipulação de dados json
const porta = 4000

app.use(express.json())

app.use("/clientes", rotaCLiente)

app.listen(porta, host, () => {
    console.log(`servidor backend em execução : http://${host}:${porta}`)
})