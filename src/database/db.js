
// importar a dependecia do sqlite3.
const sqlite3 = require("sqlite3").verbose();

// Criar o objeto    ira fazer operações no banco de dados.
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

// Utilizar o objeto de banco de dados para operações.

db.serialize(() => {
   // criar tabelas no banco de dados. 
   db.run(`
      CREATE TABLE IF NOT EXISTS places(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          image TEXT,
          address TEXT,
          address2 TEXT,
          state TEXT,
          city TEXT,
          itens TEXT
      );
   `)
   // Inserir dados na tabela.
  /* const query = `
        INSERT INTO places (
            name,
            image,
            address,
            address2,
            state,
            city ,
            itens
        ) VALUES (?,?,?,?,?,?,?);
        `
    const values = [
      "PaperSide 4",
      "https://images.unsplash.com/photo-1542827866-3e48c943da0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      "Avenida Paulista, Jardins",
      "Numero 35000",
      "São Paulo",
      "São Paulo",
      "Pilhas e Baterias"
    ]

    function afeterInsertData(err){
        if(err){
            console.log(err);
        }

        console.log("Cadastrado com Sucesso!");
        console.log(this);
    }

  db.run(query, values, afeterInsertData)
  */
});

// Consultar dados no banco.
//db.all(` SELECT * FROM places`, function(err, rows){
//    if(err){
//       console.log(err);
//    }
//    console.log("Aqui estão os registros:");
//    console.log(rows);
//});

// Deletar os dados.
/*db.run(`DELETE FROM places WHERE id = ?`,[14], function(err){
    if(err){
        console.log(err);
    }
    console.log("Registro Deleta com Sucesso!:");
});
*/