import { Router } from "express";
import ClienteCtrl from "../controller/clienteCtrl.js";

const rotaCLiente = Router(); // mini aplicação http

const cliCtrl = new ClienteCtrl()

rotaCLiente.get('/:cpf', cliCtrl.consultar)
rotaCLiente.get('/', cliCtrl.consultar)
rotaCLiente.post('/', cliCtrl.gravar)
rotaCLiente.put('/', cliCtrl.alterar)
rotaCLiente.patch('/', cliCtrl.alterar)
rotaCLiente.delete('/', cliCtrl.excluir)

export default rotaCLiente;