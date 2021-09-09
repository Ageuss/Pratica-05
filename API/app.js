const express = require('express');
const app = express();
const employee = require('./src/Controllers/EmployeeController.js')
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cors());

// INICIA O SERVER COM NODE .\APP.JS
app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})

app.use('/employee', employee);

