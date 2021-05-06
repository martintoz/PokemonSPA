import PokedexCss from './Pokedex.module.css'
import Loader from './Loader'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import * as actions from '../actions/index';
import Pokemon from './Pokemon';
import Paginado from './Paginado';
import FilterType from './FilterType';
import FilterExistent from './FilterExistent';
import Sort from './Sort';
import Searchbar from './Searchbar';

export default function Pokedex() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const location = useLocation()

    useEffect(() => {
        const buscaPokemons = () => {
            dispatch(actions.getPokemons())
        }
        if (!state.types.length) {
            dispatch(actions.getTypes())
        }
        if (location.search) {
            var type = location.search.split("=")[1]
            const filtroType = () => {
                dispatch(actions.filterType(type))
            }
            return filtroType(type)
        }
        else {
            buscaPokemons()
        }
    }, [])

    return (
        <div className={PokedexCss.pokedex}>
            {state.pokemons.length < 1 && <Loader />}{state.pokemons.length > 0 &&
                <div>
                    <div className={PokedexCss.sortFilterContainer}>
                        <div className={PokedexCss.searchbar}><Searchbar /></div>
                        <div className={PokedexCss.filterExistent} ><FilterExistent /></div>
                        <div className={PokedexCss.filterType} ><FilterType /></div>
                        <div className={PokedexCss.sort} ><Sort /></div>
                    </div>
                        <div className={PokedexCss.paginado} ><Paginado /></div>
                    <ul className={PokedexCss.pokemons}>
                        {state.pokemons.map(poke => <li key={poke.name}><Pokemon name={poke.name} url={poke.url} /></li>)}
                    </ul>
                    <Paginado />
                </div>
            }
        </div>
    )
};
