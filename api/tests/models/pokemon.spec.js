const { Pokemon, conn } = require('../../src/db.js');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var expect = chai.expect;

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('Modelo Pokemon', () => {
      it('debe devolver un error si no tiene nombre', async () => {
        var poke = async () => await Pokemon.create({})
        expect(poke()).to.be.rejected
      });
      it('debe devolver un error si no tiene ID', () => {
        var poke = async () => await Pokemon.create({ name: 'Hauche'})
        expect(poke()).to.be.rejected
      });
      it('debe funcionar con nombre y ID válidos', async () => {
        const poke = await Pokemon.create({ name: 'Hauche', id: 1111 });
        expect(poke.name).to.eql('Hauche');
      });
      it('debe devolver un error si las stats no son números', async () => {
        var poke = async () => await Pokemon.create({ name: 'Hauche', id:1111, hp:"buena salud"})
        var poke2 = async () => await Pokemon.create({ name: 'Hauche', id:1111, speed:"muy rápido"})
        var poke3 = await Pokemon.create({ name: 'Hauche', id:1111, hp:30})
        expect(poke()).to.be.rejected
        expect(poke2()).to.be.rejected
        expect(poke3.hp).to.eql(30)
      });
      it('existent debe ser un booleano', async () => {
        var poke = await Pokemon.create({ name: 'Hauche', id:1111, existent:false})
        var poke2 = async () =>await Pokemon.create({ name: 'Hauche', id:1111, existent:"no"})
        expect(poke.existent).to.be.false
        expect(poke2()).to.be.rejected
      });
    });
  });
});
