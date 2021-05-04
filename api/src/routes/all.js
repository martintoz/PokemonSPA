// const { Router } = require('express');
const { Pokemon, Type } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const fetch = require("node-fetch");
var express = require('express');
const { get150, getTypes } = require('../utils');
var router = express.Router();
// const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// getTypes()
// get150()

// router.get('/:type', async function (req, res) {
//   var type = req.params.type
//   console.log("type", type)
//   var pokeTipo = []
//   for (let i = 1; i < 151; i++) {
//     // console.log(pokeTipo)
//     var url = 'https://pokeapi.co/api/v2/pokemon/' + i
//     let res = await fetch(url)
//     res = await res.json()
//     if (res.types[0].type.name === type) {
//       pokeTipo.push(res)
//     }
//     else if(res.types[1] && res.types[1].type.name === type){
//       pokeTipo.push(res)
//     }
//   }
//   console.log("siguiente paso")
//   console.log(pokeTipo[0])
//   res.send(pokeTipo)

// })
router.get('/sort/:order', function (req, res) {
  var order = req.params.order
  if (order === "az") {
    Pokemon.findAll({
      order: [['name', 'ASC']],
      include: [{
        model: Type,
      }]
    })
      .then(poke => res.send(poke))
  }
  if (order === "za") {
    Pokemon.findAll({
      order: [['name', 'DESC']],
      include: [{
        model: Type,
      }]
    })
      .then(poke => res.send(poke))
  }
  if (order === "ataqueDesc") {
    Pokemon.findAll({
      order: [['attack', 'DESC']],
      include: [{
        model: Type,
      }]
    })
      .then(poke => res.send(poke))
  }
  if (order === "ataqueAsc") {
    Pokemon.findAll({
      order: [['attack', 'ASC']],
      include: [{
        model: Type,
      }]
    })
      .then(poke => res.send(poke))
  }
})
router.get('/:type', function (req, res) {
  var tipo = req.params.type
  if (tipo === "t" || tipo === "f") {
    Pokemon.findAll({
      where: { existent: tipo },
      include: [{
        model: Type,
      }]
    })
      .then(poke => res.send(poke))
  }
  else {
    Pokemon.findAll({
      include: [{
        model: Type,
        where: { name: tipo }
      }]
    })
      .then(poke => res.send(poke))
  }
})

module.exports = router;
