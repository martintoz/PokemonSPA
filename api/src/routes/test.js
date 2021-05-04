var supertest = require('supertest-as-promised')(require('../app'));
var expect = require('chai').expect;
// var model = require('../models/model');

describe('Routes', function() {
    describe('/pokemons', function() {
        it('GET responde con un los 12 primeros Pokemon de la API', function() {
            return supertest // supertest nos permite hacer y testear requests HTTP
              .get('/pokemons') // hacemos un request HTTP: GET a '/families'
              .expect(200) // el codigo de status del response
              .expect('Content-Type', /json/) // podemos testear los headers
              .expect(function(res) {
                expect(res.body.current).to.have.length(12); // testeamos la respuesta con el body
              });
          });
        })
    })