const client = require('../connection');
client.connect();

// NO TERMINAL DA O COMANDO: NODE CAMINHO DESSE ARQUIVO, FAZ O MSM COM O USERMIGRATION
// PRA CRIAR AS TABELAS NO BANCO
const query = `
  DROP TABLE IF EXISTS employee;
  CREATE TABLE IF NOT EXISTS employee (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  office VARCHAR(50) NOT NULL,
  birth_date DATE NOT NULL,
  initial_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)`;

client.query(query, (err) => {
  if (!err) {
    console.log('sucess')
  }
  client.end();
})
