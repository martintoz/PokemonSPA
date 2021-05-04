// const { Router } = require('express');
const { Pokemon, Type } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const fetch = require("node-fetch");
var express = require('express');
var router = express.Router();
// const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
let idPoke = 898

router.get('/', function (req, res) {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
  var number = parseInt(req.query.name)
  var name = req.query.name
  // console.log("name", typeof name)
  if (number) { return res.status(400).json("Name must be only letters"); }
  if (name) {
    var url = 'https://pokeapi.co/api/v2/pokemon/' + name + '/'
    fetch(url)
      .then(async function (res) {

        if (!res.ok) {
          var pokedb = await Pokemon.findOne({
            where: {
              name: name
            }, include: Type,
            order:[[Type, 'createdAt', 'DESC']]
          })
          // console.log("POKEDB", pokedb)
          return pokedb
        }
        else {
          // console.log("HUBO RES")
          return res.json()
        }
      })
      .then(function (poke) {
        if (poke) {
          if (poke.types[0].type) {
            var typeId = poke.types[0].type.url.split('/')[6]
            var pokemon = {
              name: poke.name,
              id: poke.id,
              weight: poke.weight,
              height: poke.height,
              img: poke.sprites.front_default,
              img2: poke.sprites.other["official-artwork"].front_default,
              types: [{ name: poke.types[0].type.name, id: typeId }],
              hp: poke.stats[0].base_stat,
              attack: poke.stats[1].base_stat,
              defense: poke.stats[2].base_stat,
              speed: poke.stats[5].base_stat,
              existent: true
            }
            if (poke.types[1]) {
              var typeId2 = poke.types[1].type.url.split('/')[6]
              pokemon.types.push({ name: poke.types[1].type.name, id: typeId2 })
            }
            return res.json(pokemon)
          }
          return res.json(poke)
        }
        else { throw new Error("Pokemon not found in API or DB") }
      })
      .catch(function (err) {

        console.log("err", typeof err, err)
        res.statusMessage = err;
        res.status(404).json(err.message)

      })
  }
  else {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=1118&offset=0')
      .then(res => res.json())
      .then(poke => {
        const chunk = (arr, size) =>
          Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
            arr.slice(i * size, i * size + size)
          );
        var paginado = chunk(poke.results,12);
        var current = paginado.shift()
        var inicial = {
          current: current,
          next: paginado
        }
        res.json(inicial)
      });
  }
})

router.get('/:id', async function (req, res) {
  // console.log("req.params.id", typeof parseInt(req.params.id), req.params.id)
  var id = parseInt(req.params.id)
  if (id < 1) {
    res.status(400)
    return res.json('El ID debe ser un número mayor a 0')
  }
  if (id > 898 && id < 10001) {
    // console.log("FINDONE BY ID")
    const poke = await Pokemon.findOne({
      where: {
        id: id
      }, include: Type
    })
    // console.log("poke", poke)
    if (poke) {
      res.json(poke)
    }
    else {
      console.log("No existe el Pokemon")
    }
  }
  else {
    var url = 'https://pokeapi.co/api/v2/pokemon/' + req.params.id + '/'
    fetch(url)
      .then(function (res) {
        if (!res.ok) {
          return Pokemon.findOne({
            where: {
              name: req.params.id
            }, include: Type
          })
        }
        else {
          return res.json()
        }
      })
      .then(function (poke) {
        if (poke) {
          // console.log("RESPUESTAPOKE", poke)
          var typeId = poke.types[0].type.url.split('/')[6]
          var pokemon = {
            name: poke.name,
            id: poke.id,
            weight: poke.weight,
            height: poke.height,
            img: poke.sprites.front_default,
            img2: poke.sprites.other["official-artwork"].front_default,
            types: [{ name: poke.types[0].type.name, id: typeId }],
            hp: poke.stats[0].base_stat,
            attack: poke.stats[1].base_stat,
            defense: poke.stats[2].base_stat,
            speed: poke.stats[5].base_stat,
            existent: true
          }
          if (poke.types[1]) {
            var typeId2 = poke.types[1].type.url.split('/')[6]
            pokemon.types.push({ name: poke.types[1].type.name, id: typeId2 })
          }

          res.json(pokemon)
        }
        else { throw new Error("Pokemon not found in API or DB") }
      })
      .catch(function (err) {

        console.log("err", typeof err, err)
        res.statusMessage = err;
        res.status(404).json(err.message)

      })
  }
})

router.post('/', async function (req, res) {
  idPoke += 1

  Pokemon.findOrCreate({
    where: {
      name: req.body.name,
      id: idPoke,
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      // strength: req.body.strength,
      speed: req.body.speed,
      height: req.body.height,
      weight: req.body.weight * 10,
      existent: false,
      img: req.body.img && req.body.img !== "" ? req.body.img : 'https://static.wikia.nocookie.net/pokemon/images/0/05/Ghost_Lavender_Town_RBY.png',
      img2: req.body.img && req.body.img !== "" ? req.body.img : 'https://static.wikia.nocookie.net/pokemon/images/0/05/Ghost_Lavender_Town_RBY.png'
    }
  })
    .then(function (poke) {
      if (req.body.type2 !== '0' && req.body.type !== req.body.type2) {
        poke[0].addTypes(req.body.type)
        poke[0].addTypes(req.body.type2)
      }
      else {
        poke[0].setTypes(req.body.type)
      }
      var url = '/pokemons/' + req.body.name
      return res.redirect(url)
    })
    .catch(err => res.status(400).json(err.message))
})


module.exports = router;
