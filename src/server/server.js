const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuração da base de dados MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "triatlo",
  port: 3307,
});

//Ligação através do npm run server
db.connect((err) => {
  if (err) {
    console.error("Erro ao ligar à base de dados:", err);
    return;
  }
  console.log("Ligado à base de dados MySQL!");
});

// Rotas para obter dados
// Teste exemplo postman localhost:3000/api/tempos/
app.get("/api/tempos", (req, res) => {
  const sql = "SELECT * FROM tempos ORDER BY total";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao obter os dados:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Rota para obter um tempo único
// Teste exemplo postman localhost:3000/api/tempos/3
app.get("/api/tempos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM tempos WHERE ID =?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao obter os dados:", err);
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send({ message: "Registo não encontrado!" });
    }
    res.json(results[0]);
  });
});

// Rota para inserir dados
// Teste exemplo postman localhost:3000/api/tempos/ enviar body json com o corpo do mysql
app.post("/api/tempos", (req, res) => {
  const sql = "INSERT INTO tempos SET ?";
  db.query(sql, req.body, (err, results) => {
    if (err) {
      console.error("Erro ao inserir os dados:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Rota para atualizar dados
// Teste exemplo postman localhost:3000/api/tempos/13
app.put("/api/tempos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE tempos SET ? WHERE ID = ?";
  db.query(sql, [req.body, id], (err, results) => {
    if (err) {
      console.error("Erro ao atualizar os dados:", err);
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: "Registo não encontrado!" });
    }
    res.json(results);
  });
});

// Rota para eliminar dados
// Teste exemplo postman localhost:3000/api/tempos/13
app.delete("/api/tempos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM tempos WHERE ID = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao apagar o registo:", err);
      return res.status(500).send(err);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: "Registo não encontrado!" });
    }
    res.json(results);
  });
});

// Inicia o servidor e verifica a porta
app.listen(port, () => {
  console.log(`Servidor a trabalhar na porta ${port}`);
});
