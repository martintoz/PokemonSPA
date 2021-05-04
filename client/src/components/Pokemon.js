import PokemonCss from './Pokemon.module.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/index';
import { Link } from 'react-router-dom';


function Pokemon({ name, url }) {

    // const [pokemon, setPokemon] = useState([]);
    const dispatch = useDispatch()
    const statePoke = useSelector(state => state.pokemon)
    const statePokeDb = useSelector(state => state.pokemonDb)
    // const stateTypes = useSelector(state => state.types)
    // const stateFilter = useSelector(state => state.filter)
    var id = url.split('/')[6]

    useEffect(() => {
        const buscaPokemon = () => {
            dispatch(actions.getPokemon(id))
        }
        if (id < 899 || id > 10000) {
            buscaPokemon()
        }

    }, [])
    var poke = statePoke.find(poke => poke.name === name)
    if (!poke && statePokeDb.length) {
        var pokeDb = statePokeDb.find(poke => poke.name === name)
    }
    // var idTipo = statePoke.types[0].url.split('/')[6]
    // var types = stateTypes.find(type => type.id === idTipo)
    // console.log(id)
    // var tipo = Type.findByPk(idTipo)

    return (
        <Link to={`/pokemons/${name}`}>
            <div className={PokemonCss.pokemon}>
                {!poke && !pokeDb ?
                    <p className={PokemonCss.name}>{name}</p>
                    :
                    <>
                        <p className={PokemonCss.name}>{name}</p>
                        <img src={pokeDb ?
                            pokeDb.img
                            : poke.img} alt={name}></img>
                        <div className={PokemonCss.types}>
                            <p>{pokeDb ?
                                pokeDb.types[0].name
                                : poke.types[0].name}</p>
                            {pokeDb ?
                                pokeDb.types[1] ?
                                    <>
                                        <p>/</p><p>{pokeDb.types[1].name}</p>
                                    </> :
                                    <></>
                                : poke.types[1] ?
                                    <>
                                        <p>/</p><p>{poke.types[1].name}</p>
                                    </>
                                    : <></>}
                        </div> 
                    </>
                }

            </div>
        </Link>
    )
};

export default Pokemon;