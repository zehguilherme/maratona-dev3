const express = require('express')
const server = express()

// req: requisições - pedidos
// res: resposta
server.get('/', function(req, res) {
    return res.send('ok, outro teste')
})

// Ligação do servidor - acesso na porta 3000
server.listen(3000, function() {
    console.log('Servidor iniciado');
})