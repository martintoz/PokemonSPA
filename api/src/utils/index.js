const fetch = require("node-fetch");
const { Type, Pokemon } = require('../db');
module.exports = {

    getTypes: function () {
        fetch('https://pokeapi.co/api/v2/type/')
            .then(res => res.json())
            .then(tipos => {
                return tipos.results.forEach(tipo => Type.findOrCreate({
                    where: {
                        name: tipo.name,
                        id: tipo.url.split('/')[6]
                    }
                }))
            })
    },

    get150: async function () {
        for (let i = 1; i <= 151; i++) {
            // console.log(pokeTipo)
            // if(i === 118){
            //     var url = 'https://pokeapi.co/api/v2/pokemon/goldeen'
            // }
            // else{
            var url = 'https://pokeapi.co/api/v2/pokemon/' + i + '/'
            // }
            let res = await fetch(url)
            res = await res.json()
            const poke = await Pokemon.findOrCreate({
                where: {
                    name: res.name,
                    id: res.id,
                    img: res.sprites.front_default,
                    height: res.height,
                    weight: res.weight,
                    hp: res.stats[0].base_stat,
                    attack: res.stats[1].base_stat,
                    defense: res.stats[2].base_stat,
                    speed: res.stats[5].base_stat,
                    existent: true
                }
            })
            var urlType = res.types[0].type.url.split('/')[6]
            await poke[0].addTypes(urlType)
            if (res.types[1]) {
                var urlType2 = res.types[1].type.url.split('/')[6]
                await poke[0].addTypes(urlType2)
            }
        }
    }

}