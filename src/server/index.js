const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'triatlo',
  port: 3307 
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});


// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Rotas para obter dados
app.get('/api/tempos', (req, res) => {
  const sql = 'SELECT * FROM tempos';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});


// Rotas para inserir dados
app.post('/api/tempos/{id}', (req, res) => {
  const sql = 'UPDATE FROM tempos WHERE id =${id} ';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});
  
//Rota para eliminar dados 
app.get('/api/tempos/{id}/delete', (req, res) => {
  const sql = 'DELETE FROM tempos WHERE id =${id} ';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});


// Todas as minhas colunas da tabela tempos Id,Nome,TipoID,NatacaoHoras,NatacaoMinutos,NatacaoSegundos,T1Horas,T1Minutos,T1Segundos,CiclismoHoras,CiclismoMinutos,CiclismoSegundos,T2Horas,T2Minutos,T2Segundos,CorridaHoras,CorridaMinutos,CorridaSegundos,Total ;

//Rota para inserir dados
app.post('/api/tempos', (req, res) => {
  const sql = 'INSERT INTO tempos SET ?';
  db.query(sql, req.body, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});