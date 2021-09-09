const pg = require('pg');

// INFORMA OS DADOS DO TEU POSTGRES
const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  password: '990623',
  database: 'Pratica5',
  port: 5432
}); 

module.exports = client