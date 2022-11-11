const express = require('express');
const app = express();
const {sumaArray} = require ("./sumArray");

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: `hola`,
  });
});


app.get('/test', (req, res) => {
  res.send({
    message: `test`,
  });
});

app.post ('/sum', (req, res) => {
 const {a, b} = req.body;
 res.send ({result: a + b})
  })
  

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});


app.post ('/sumArray', (req, res) => {
    const {array, num} = req.body;
    const result = sumaArray (array, num)
    res.send ({
      result: result
    })
  });


  

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar

