const express = require('express')
require("dotenv").config() // Carga variables de configuracion
require('./utils/db') // lanzar BBDD con Mongoose

const pages = require('./routes/pages')
const products = require('./routes/products')

const app = express()
const port = 3000


// http://localhost:3000/products?key=123hola
function hasApiKey (req,res,next){
  const API_KEY = req.query.key;

  if(API_KEY && API_KEY==="123hola"){
    next();
  }else{
    res.status(403).send("403 - Forbidden. You shall not pass");
  }
}

// Motor de vistar
app.set('view engine', 'pug');
app.set('views','./views');

// Middlewares
// app.use(hasApiKey) // Para comprobar Api Key
app.use(express.json()); // para convertir a JSON
// Rutas
// http://localhost:3000/about --> WEB --> vista
// http://localhost:3000/api/products --> API --> objeto
app.use('/',pages); // para las vistas de la WEB
app.use('/api',products) // para la API


app.get('*', (req, res) => {
    res.status(404).send("Sorry...404 Not found");
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})