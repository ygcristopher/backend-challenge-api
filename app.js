const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'rinha-db',
  password: 'rinha-db',
  database: 'rinha-db'
});

const validateTransactionRequest = (req, res, next) => {
    const { value, type, description } = req.body;

    if (!value || !type || !description) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios: valor, tipo e descrição.' });
      }
    
    next();
}

app.post('/clients/:id/transactions', validateTransactionRequest, (req, res) => {
  const clientId = req.params.id;
  const { value, type, description } = req.body;


  res.json({
    limit: 100000,
    balance: -9098
  });
});

app.get('/clients/:id/extract', (req, res) => {
  const clientId = req.params.id;


  res.json({
    balance: {
      total: -9098,
      statement_date: new Date().toISOString(),
      limit: 100000
    },
    recent_transactions: [
      {
        value: 10,
        type: 'c',
        description: 'description',
        executed_at: new Date().toISOString()
      },
      {
        value: 90000,
        type: 'd',
        description: 'description',
        executed_at: new Date().toISOString()
      }
    ]
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
