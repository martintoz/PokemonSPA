// const { Router } = require('express');
const { Type } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// var {getTypes} = require('../utils/index')
const fetch = require("node-fetch");
var express = require('express');
const { getTypes, get150 } = require('../utils');
var router = express.Router();
// const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/', async function(req, res){
  let types;
  try{
    types =  await Type.findAll(
      {attributes: ['id', 'name']}
      )
    
    if(types.length < 1){
      await getTypes();
      types =  await Type.findAll(
        {attributes: ['id', 'name']}
        )
      }

        let tiposFiltrados = types.map(x => x.dataValues)
        res.send(tiposFiltrados)
    }
    catch(error){
      console.log(error);
      res.status(500).json(error)
    }
  })
  

module.exports = router;
