import { GET_POKEMON, GET_POKEMONS, GET_TYPES, GET_POKEMON_DB, FILTER_TYPE, SORT_POKE, GET_NEXT, GET_PREVIOUS, GET_LAST, GET_FIRST, GET_NST } from '../actions/index'
const initialState = {
    pokemons: [],
    pokemon: [],
    pokemonDb: [],
    previous: [],
    next: "",
    types: [],
    filter: false
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                // previous: action.payload.previous,
                next: action.payload.next,
                pokemons: action.payload.current
            }
        case GET_NEXT:
            return {
                ...state,
                // previous: action.payload.previous,
                next: action.payload.next,
                pokemons: action.payload.current,
                previous: state.previous.concat(action.payload.previous)
            }
        case GET_LAST:
            return {
                ...state,
                next: [],
                pokemons: action.payload.current,
                previous: state.previous.concat(action.payload.previous)
            }
        case GET_FIRST:
            return {
                ...state,
                next: action.payload.next,
                pokemons: action.payload.current,
                previous: []
            }
        case GET_NST:
            return {
                ...state,
                next: action.payload.next,
                pokemons: action.payload.current,
                previous: action.payload.previous
            }
        case GET_PREVIOUS:
            return {
                ...state,
                next: action.payload.next,
                pokemons: action.payload.current,
                previous: action.payload.previous
            }
        case GET_POKEMON:
            return {
                ...state,
                pokemon: state.pokemon.concat(action.payload)
            }
        case GET_POKEMON_DB:
            return {
                ...state,
                pokemonDb: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case FILTER_TYPE:
            return {
                ...state,
                pokemons: action.payload.pokes,
                // pokemon: action.payload.poke,
                pokemonDb: action.payload.poke,
                next: action.payload.next,
                filter: true
            }
        case SORT_POKE:
            return {
                ...state,
                previous: [],
                pokemons: action.payload.pokes,
                next: action.payload.next,
                // pokemon: action.payload.poke,
                pokemonDb: action.payload.poke,
                filter: true
            }
        default:
            return state;
    }
}

export default rootReducer;
