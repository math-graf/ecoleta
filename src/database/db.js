// importar a dependência do SQLite 3
const sqlite3 = require('sqlite3').verbose(); // mostra mensagens no terminal quando necessário

// Criar o objeto para fazer operações no banco de dados
const db = new sqlite3.Database('./src/database/database.db');  // new atribui à constante um objeto e a linha que segue é um constructor ou classe. Entende que deve criar um banco de dados com nome database.db

module.exports = db

// Utilizar o objeto de banco de dados para nossas operações
// db.serialize(() => {
    // Com comandos SQL:
    
    // 1) criar uma tabela
/*     db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);

    // 2) Inserir dados na tabela
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
        'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        'Papersider',
        'Guilherme Gemballa, Jardim América',
        'Número 260',
        'Santa Catarina',
        'Rio do Sul',
        'Papéis e Papelão'
    ];


    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log('Cadastrado com sucesso')
        console.log(this)
    };

    db.run(query, values, afterInsertData);  // se escremos function (), ela é executada     imediatamente. Se escrevemos function, ela não será executada imediatamente.

 */
/* 
    // 3) Consultar dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows) { // * significa que será mostrado todos os registros. O asterisco pode ser substituído por qualquer item da tabela (name, adress, state, city, etc)
        if(err) {
            return console.log(err)
        }

        console.log('Aqui estão os seus registros: ')
        console.log(rows)
    });
 */
    // 4) Deletar um dado da tabela
/* 
    db.run(`DELETE FROM places WHERE id = ?`, [15], function(err) {
        if(err) {
            return console.log(err)
        };

        console.log('Registro deletado com sucesso.'); 
        
    });
    */
//});

/* 
id              >>> identificador único
INTEGER         >>> tipo numérico no SQL
PRIMARY KEY     >>> campo principal da tabela para identificar o registro
AUTOINCREMENT   >>> números que irão se incrementar (começa registro(id) 1, depois 2, depois 3) OBS: se algum registro intermediário é deletado, é normal que ao consultar a tabela a sequência seja quebrada. Por exemplo: 1, 2, 3, 4, 5, 6. Ao deletar o id 4 e consultar a tabela, a sequência de registros será: 1, 2, 3, 5, 6. É um comportamento normal.
*/

/*
Função CALL BACK >>> As linhas de código após a função não serão pausadas aguardando pela conclusão da função, no caso, o retorno dos valores do banco de dados.
Palavra chave "this" >>> Não é utilizada Arrow Function. Procurar explicação no vídeo do Mayk sobre o this.
*/