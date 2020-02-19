// Configuração do servidor
const express = require('express')
const server = express()

// Configurar o servidor para apresentar arquivos estáticos
// use: configuração expecífica do servidor
// Middleware
server.use(express.static('public'))  //arquivos estáticos ficam na pasta 'public'

// Habilitar body do formulário
// Middleware
server.use(express.urlencoded({ extended: true }))

// Configurar a conexão ao banco de dados
// Pool: tipo de conexão que mantém ela ativa (não é necessário sempre conectar e desconectar manualmente)
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '97j23g28t',
    host: 'localhost',
    port: 5432,
    database: 'blood-donation'
})

// Configurar a template engine nunjucks (permitir passar dados para HTML)
const nunjucks = require('nunjucks')
nunjucks.configure('./', {
    express: server,  //configuração do express será 'server'
    noCache: true,  //não salva cache no sistema
})

// req: requisições - pedidos
// res: resposta
// Configuração da apresentação da página

// get: pegar, mostrar, servir algo
server.get('/', function(req, res) {
    
    // Buscar valores (doadores) dentro do banco
    db.query('SELECT * FROM donors', function(err, result) {
        if(err) return res.send('Erro na consulta ao banco de dados.')

        const donors = result.rows  //traz as linhas do banco

        return res.render('index.html', { donors })
    })
})

// Receber dados do formulário (inputs)
// post: registrar, guardar dados
server.post('/', function(req, res) {
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    // Verificação de campos de input vazios
    if(name == '' || email == '' || blood == '') {
        return res.send('Todos os campos são obrigatórios.')
    }

    // colocar valores (doadores) dentro do banco de dados
    const query = `INSERT INTO donors("name", "email", "blood")
                   VALUES($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, function(err) {
        if(err) return res.send('Erro no banco de dados.')  //encontra erro no banco
        
        // Redirecionará para a página inicial
        return res.redirect('/')
    })
})

// Ligação do servidor - inicialização na porta 3000
server.listen(3000)