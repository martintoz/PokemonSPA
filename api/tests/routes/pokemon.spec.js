/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
var supertest = require('supertest-as-promised')(require('../../src/app.js'));
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = { name: 'hauche', hp: 175, attack: 20, defense: 40, speed: 30, height: 70, weight: 25, existent: false, id: 899 };

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );
  });
});

describe('Routes', function () {
  describe('/pokemons', function () {
    it('GET responde con un array de los 12 primeros Pokemon de la API con nombre y url', function () {
      return supertest
        .get('/pokemons')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body.current).to.have.length(12);
          expect(res.body.current[0].name).to.eql('bulbasaur');
          expect(res.body.current[11].name).to.eql('butterfree');
          expect(res.body.current[7].url).to.eql('https://pokeapi.co/api/v2/pokemon/8/');
        });

    });
    it('GET responde un array next con los demás', function () {
      return supertest
        .get('/pokemons')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body.next).to.have.length(93);
          expect(res.body.next[92][1].name).to.eql('toxtricity-low-key-gmax');
          expect(res.body.next[68][5].url).to.eql('https://pokeapi.co/api/v2/pokemon/834/');
        });
    });
  })
})

describe('Routes', function () {
  describe('/pokemons/?name=', function () {
    it('GET ?name="nombre" devuelve los detalles del Pokemon indicado', function () {
      return supertest
        .get('/pokemons/?name=pikachu')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body.name).to.eql('pikachu');
          expect(res.body.weight).to.eql(60);
        })
    });
    it('GET ?name="nombre" debe devolver los detalles del Pokemon indicado desde la API', function () {
      return supertest
        .get('/pokemons/?name=meowth')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body.name).to.eql('meowth');
          expect(res.body.weight).to.eql(42);
        })
    });
    it('GET ?name="nombre" devuelve un error 400 y un mensaje adecuado si se pasa un número', function () {
      return supertest
        .get('/pokemons?name=123')
        .expect(400)
        .expect(function (res) {
          expect(res.body).to.eql("Name must be only letters"); 
        })
        
    });
    it('GET ?name="nombre" devuelve un error 404 y un mensaje adecuado si no encuentra el pokemon', function () {
      return supertest
        .get('/pokemons?name=goku')
        .expect(404)
        .expect(function (res) {
          expect(res.body).to.eql("Pokemon not found in API or DB");
        })
    });
  })
})