export const GET_POKEMONS = "GET_POKEMONS"
export const GET_POKEMON = "GET_POKEMON"
export const GET_POKEMON_DB = "GET_POKEMON_DB"
export const GET_TYPES = "GET_TYPES"
export const GET_NEXT = "GET_NEXT"
export const GET_LAST = "GET_LAST"
export const GET_PREVIOUS = "GET_PREVIOUS"
export const GET_FIRST = "GET_FIRST"
export const GET_NST = "GET_NST"
export const AZ = "AZ"
export const FILTER_TYPE = "FILTER_TYPE"
export const SORT_POKE = "SORT_POKE"

let baseURL= process.env.REACT_APP_API;
baseURL = baseURL || 'http://localhost:3001';

const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );

export function getPokemons() {
    return function (dispatch) {
        return fetch(`${baseURL}/pokemons`)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: GET_POKEMONS, payload: {
                        current: json.current,
                        next: json.next
                    }
                });
            });
    };
}
export function getNext(current, next) {
    return function (dispatch) {
        var newCurrent = next.shift()
        var newPrevious = []
        newPrevious.push(current)
        dispatch({
            type: GET_NEXT, payload: {
                current: newCurrent,
                next,
                previous: newPrevious
            }
        });

    };
}
export function getLast(current, next) {
    return function (dispatch) {
        var newCurrent = next.pop()
        var newPrevious = []
        newPrevious.push(current)
        newPrevious.push(...next)
        dispatch({
            type: GET_LAST, payload: {
                current: newCurrent,
                previous: newPrevious
            }
        });

    };
}
export function getPrevious(current, next, previous) {
    return function (dispatch) {
        var newNext = []
        newNext.push(...next)
        newNext.unshift(current)
        var newCurrent = previous.pop()
        dispatch({
            type: GET_PREVIOUS, payload: {
                current: newCurrent,
                next: newNext,
                previous,
            }
        });

    };
}
export function getFirst(current, next, previous) {
    return function (dispatch) {
        var newNext = []
        var newCurrent = previous.shift()
        newNext.push(...previous)
        newNext.push(current)
        newNext.push(...next)
        dispatch({
            type: GET_FIRST, payload: {
                current: newCurrent,
                next: newNext
            }
        });

    };
}
export function getNst(current, next, previous, actual, clicked) {
    return function (dispatch) {
        // console.log("actual",actual,"clicked", clicked,"next", next.length, "previous", previous.length)
        if(actual<clicked){
            var indexSplice = clicked - actual
            var newCurr = next.splice(0,indexSplice)
            var newCurrent = newCurr.pop()
            // console.log("newCurrent",newCurrent)
            // console.log("newCurr",newCurr)
            previous.push(current)
            if(newCurr.length){
                previous.push(...newCurr)
            }
            // console.log("previous",previous)
        }
        else{
            var newCurr = previous.splice(clicked - 1)
            // console.log("newCurr",newCurr)
            var newCurrent = newCurr.shift()
            next.unshift(current)
            if(newCurr.length){
                next.unshift(...newCurr)
            }
        }

        dispatch({
            type: GET_NST, payload: {
                current:newCurrent,
                next,
                previous
            }
        });
    };
}
// export function getNext(next) {
//     return function(dispatch) {
//         return fetch(next)
//         .then(response => response.json())
//         .then(json => {
//             dispatch({ type: GET_POKEMONS, payload: json });
//         });
//     };
// }

export function getPokemon(url) {
    return function (dispatch) {
        return fetch(`${baseURL}/pokemons/${url}`)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_POKEMON, payload: json });
            });
    };
}

export function getPokemonDb(name) {
    return function (dispatch) {
        return fetch(`${baseURL}/pokemons/?name=${name}`)
            .then(response => response.json())
            .then(json => {
                dispatch({ type: GET_POKEMON_DB, payload: json });
            });
    };
}

export function getTypes() {
    return function (dispatch) {
        return fetch(`${baseURL}/types`)
            .then(response => response.json())
            .then(json => {
                var tiposExistentes = json.filter(tipo => tipo.id < 20)
                dispatch({ type: GET_TYPES, payload: tiposExistentes });
            });
    };
}

export function filterType(type) {
    return function (dispatch) {
        return fetch(`${baseURL}/all/${type}`)
            .then(response => response.json())
            .then(json => {
                var pokesPoke = {}
                var namesUrls = json.map(poke => { return { name: poke.name, url: 'https://pokeapi.co/api/v2/pokemon/' + poke.id } })
                var paginado = chunk(namesUrls, 12);
                var current = paginado.shift()
                pokesPoke.next = paginado
                pokesPoke.poke = json
                pokesPoke.pokes = current
                dispatch({ type: FILTER_TYPE, payload: pokesPoke });
            });
    };
}

export function sortPoke(order) {
    return function (dispatch) {
        return fetch(`${baseURL}/all/sort/${order}`)
            .then(response => response.json())
            .then(json => {
                var pokesPoke = {}
                var namesUrls = json.map(poke => { return { name: poke.name, url: 'https://pokeapi.co/api/v2/pokemon/' + poke.id + '/' } })
                var paginado = chunk(namesUrls, 12);
                var current = paginado.shift()
                pokesPoke.next = paginado
                pokesPoke.poke = json
                pokesPoke.pokes = current
                dispatch({ type: SORT_POKE, payload: pokesPoke });
            });
    };
}