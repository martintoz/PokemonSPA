// const { Router } = require('express');
const { Type } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// var {getTypes} = require('../utils/index')
const fetch = require("node-fetch");
var express = require('express');
var router = express.Router();
// const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/', async function(req, res){
  const types = await Type.findAll(
    {attributes: ['id', 'name']}
  )
  // .then(res => res.json())
  .then(tipos => {
    var tiposFiltrados = tipos.map(x => x.dataValues)
    // console.log("tipos", tiposFiltrados, typeof tiposFiltrados)
    res.send(tiposFiltrados)
  })
})


module.exports = router;
