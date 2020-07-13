
// importar o express.
const express = require("express");
const server = express();

// importar o banco de dados.
const db = require("./database/db");
// Configurar a Pasta Public.
server.use(express.static("public"));

// Habilitar o uso do req.body na nossa Aplicação.
server.use(express.urlencoded({ extended: true }));

// Utilizando template engine.
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server, // liga o nunjucks ao express.
    noCache: true,
});

// Configurar caminho da aplicação.
server.get("/", (req, res) => {
    return res.render("index.html");
});

// Essa é a rota que recebe os dados do formulário.
server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const city = req.body.city;

    db.all(`SELECT * FROM places WHERE name = '${name}' AND address = '${address}' AND CITY = '${city}'`, function (err, rows) {
        if (err) {
            return console.log(err);
        };
        if (rows.length == 0) {
            const query = `
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
                req.body.name,
                req.body.image,
                req.body.address,
                req.body.address2,
                req.body.state,
                req.body.city,
                req.body.itens
            ]
            // Função depois de salvar os dados.
            function afeterInsertData(err) {
                if (err) {
                    console.log(err);
                    return res.render("create-point.html", { error: true })
                }
                console.log("Cadastrado com Sucesso!");
                console.log(this);
                return res.render("create-point.html", { saved: true });
            }
            db.run(query, values, afeterInsertData);
        } else {
            return res.render("create-point.html", { exists: true });
        }
    });
});

// Essa é a rota que ira para pagina de search com a cidade selecionada.
server.get("/search", (req, res) => {
    const search = req.query.search;
    if (search == "") {
        return res.render("search-results.html", { total: 0 });
    }

    // Consulta dados do banco de dados.
    db.all(` SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            console.log(err);
        }
        const total = rows.length;
        // Mostra na pagina html os dados do banco Sqlite.
        return res.render("search-results.html", { places: rows, total });
    });
});

// Ligar o Servidor.
server.listen(3000);


