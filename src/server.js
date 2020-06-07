const express = require('express');
const server = express();

// Pegar o banco de dados
const db = require('./database/db.js');

// Configurar pasta pública
server.use(express.static('public'));

// configurar uso de req.body na aplicação
server.use(express.urlencoded({extended: true}));


// Utilizando template engine

const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
});



// Configurar caminhos da minha aplicação
// Página inicial
// req: requisição/pedido
// res: resposta
server.get('/', (req, res) => {
    return res.render('index.html', { title: 'Seu Market Place de Coleta de Resíduos' });
});

server.get('/create-point', (req, res) => {

 
    return res.render('create-point.html');
});

server.post('/savepoint', (req, res) => {
    
    // req.query não irá funcionar aqui, porque utiliza query strings. No método post, o envio de informações não é feita por query strings. Neste caso, o método será:

    // console.log(req.body);
    // req.body deve ser habilitado no express para funcionar (linha 11)

    // req.query: Query strings da nossa url
    // console.log(req.query);

    // Inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `;
    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ];


    function afterInsertData(err) {
        if(err) {
            console.log(err);
            return res.render('create-point.html', { notsaved: true});
        }

        console.log('Cadastrado com sucesso');
        console.log(this);

        return res.render('create-point.html', { saved: true});
    };

    db.run(query, values, afterInsertData);  // se escrevemos function (), ela é executada     imediatamente. Se escrevemos function, ela não será executada imediatamente.

});

server.get('/search-results', (req, res) => {

    const search = req.query.search

    if(search == '') {
        // pesquisa vazia
        return res.render('search-results.html', { total: 0});
    }

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) { // * significa que será mostrado todos os registros. O asterisco pode ser substituído por qualquer item da tabela (name, adress, state, city, etc)
        if(err) {
            return console.log(err)
        };

        const total = rows.length;

        // Mostrar a página HTML com os dados do banco de dados
        return res.render('search-results.html', {places: rows, total: total});
    });

});

// Ligar o servidor
server.listen(3000);

/* 
LIKE >>> '%${search}%' >>> Aceita valores semelhantes à "search"
    Rio do sul
    Rio das Antas
    Sulamerica
    etc etc
*/