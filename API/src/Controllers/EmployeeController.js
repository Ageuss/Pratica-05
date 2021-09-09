const client = require('../../Database/connection.js');
const express = require('express');
const router = express.Router();
const validate = require('../validations/EmployeeValidation.js')
const val = new validate();

// MOSTRA O LOG DE CADA REQUISIÇÃO FEITA PARA A API
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
})

client.connect();
// RETORNA A LISTA DE TODOS OS FUNCIONARIOS CADASTRADOS
router.get('/', (req, res) => {
  client.query(`Select * from employee ORDER BY id DESC`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
})

router.get('/qtd/:qtd', (req, res) => {
  let qtd = val.validadeId(req.params.qtd);
  if (qtd) {
    client.query(`Select * from employee ORDER BY id DESC LIMIT '${qtd}'`, (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else
        res.send("Erro")
    });
  } else
    res.send('Dados invalidos')
  client.end;
})

router.get('/office/:office', (req, res) => {
  client.query(`Select * from employee WHERE LOWER(office) LIKE ('${req.params.office.toLowerCase()}')`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else
      res.send("Nenhum funcionario cadastrado nesse cargo")
  });
  client.end;
})

// RETORNA UM UNICO ITEM, PASSANDO UM ID POR REQUISICAO GET 
router.get('/:id', (req, res) => {
  let id = val.validadeId(req.params.id);
  if (id) {
    client.query(`Select * from employee WHERE id = '${id}'`, (err, result) => {
      if (result.rowCount) {
        res.send(result.rows);
      } else {
        res.send(false)
      }
    });
  } else {
    res.send(false)
  }

  client.end;
})


// INSERE UM FUNCIONARIOS NA TABELA PASSANDO UMA REQUISICAO POST
router.post('/', (req, res) => {
  const employee = val.validateEmployee(req.body);
  if (employee) {
    let insertQuery = `insert into employee(name, office, birth_date, initial_date) 
    values ('${employee.name}', '${employee.office}', '${employee.birth_date}', '${employee.initial_date}')`
    client.query(insertQuery, (err, result) => {
      if (!err) {
        res.send(true)
      } else
        console.log(err)
    })
  } else
    res.send('Dados invalidos')
  client.end;
})

router.put('/:id', (req, res) => {
  const employee = val.validateEmployee(req.body);
  let id = val.validadeId(req.params.id);
  if (employee && id) {
    let updateQuery = `UPDATE employee SET name = '${employee.name}', office = '${employee.office}', birth_date = '${employee.birth_date}', initial_date ='${employee.initial_date}'
    WHERE id = '${id}'`
    client.query(updateQuery, (err, result) => {
      if (result.rowCount == 1) {
        res.send(true)
      } else
        res.send('Funcionario inexistente')
    })
  } else
    res.send('Dados invalidos')
  client.end;
})

router.delete('/:id', (req, res) => {
  let id = val.validadeId(req.params.id);
  if (id) {
    let deletQuery = `DELETE FROM employee WHERE id = '${id}'`
    client.query(deletQuery, (err, result) => {
      if (result.rowCount == 1) {
        res.send(true)
      } else
        res.send("Usuario inexistente")
    })
  }
  client.end;
})

module.exports = router;