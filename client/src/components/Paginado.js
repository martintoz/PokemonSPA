import PaginadoCss from './Paginado.module.css'
import * as actions from '../actions/index';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Paginado() {
    const [previous, setPrevious] = useState(0)
    const [next, setNext] = useState(0)

    const state = useSelector(state => state)
    const statePrev = useSelector(state => state.previous)
    const stateNext = useSelector(state => state.next)
    const statePoke = useSelector(state => state.pokemons)
    const dispatch = useDispatch()
    useEffect(() => {
        setPrevious(statePrev.length)
        setNext(stateNext.length)
    }, [statePrev, stateNext, statePoke])
    var actual = previous + 1
    var nextLast = [actual + 1, actual + 2, actual + 3, next + 1]
    var last = nextLast[3] + actual
    var previousFirst = ["1", actual - 3, actual - 2, actual - 1]
    return (
        <div className={PaginadoCss.paginado}>
            <div className={PaginadoCss.atras}>
                <p className={PaginadoCss.primeros}>{actual > 4 ?
                    <button onClick={() => dispatch(actions.getFirst(state.pokemons, state.next, state.previous))} className={PaginadoCss.next}>{"<<"}</button> : ""}</p>
                <p><button name='previous' onClick={() => dispatch(actions.getPrevious(state.pokemons, state.next, state.previous))} disabled={!state.previous.length}>{"<"}</button></p>
            </div>
            <div className={PaginadoCss.numeros}>
                <p className={PaginadoCss.primeros}>
                    {actual > 4 ?
                        next < 1 ?
                            <>
                                <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, previousFirst[1] - 3))} className={PaginadoCss.next}>{previousFirst[1] - 3}</button>
                                <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, previousFirst[1] - 2))} className={PaginadoCss.next}>{previousFirst[1] - 2}</button>
                                <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, previousFirst[1] - 1))} className={PaginadoCss.next}>{previousFirst[1] - 1}</button>
                            </> :
                            next < 2 ?
                                <>
                                    <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, previousFirst[1] - 2))} className={PaginadoCss.next}>{previousFirst[1] - 2}</button>
                                    <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, previousFirst[1] - 1))} className={PaginadoCss.next}>{previousFirst[1] - 1}</button>
                                </> :
                                next < 3 ?
                                    <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, previousFirst[1] - 1))} className={PaginadoCss.next}>{previousFirst[1] - 1}</button> :
                                    "" :
                        ""}
                </p>

                <p className={PaginadoCss.primeros}>
                    {
                        previousFirst[3] < actual && previousFirst[3] > 0 ?
                            previousFirst[2] < actual && previousFirst[2] > 0 ?
                                previousFirst[1] < actual && previousFirst[1] > 0 ?
                                    <>
                                        <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, previousFirst[1]))} className={PaginadoCss.next}>{previousFirst[1]}</button>
                                        <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, previousFirst[2]))} className={PaginadoCss.next}>{previousFirst[2]}</button>
                                        <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, previousFirst[3]))} className={PaginadoCss.next}>{previousFirst[3]}</button>
                                    </> :
                                    <>
                                        <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, previousFirst[2]))} className={PaginadoCss.next}>{previousFirst[2]}</button>
                                        <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, previousFirst[3]))} className={PaginadoCss.next}>{previousFirst[3]}</button>
                                    </> :
                                <>
                                    <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, previousFirst[3]))} className={PaginadoCss.next}>{previousFirst[3]}</button>
                                </> :
                            ""
                    }
                </p>

                <p><button className={PaginadoCss.actual}>{actual}</button></p>

                <p>
                    {nextLast[0] <= actual + next ?
                        nextLast[1] <= actual + next ?
                            nextLast[2] <= actual + next ?
                                <>
                                    <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, nextLast[0]))} className={PaginadoCss.next}>{nextLast[0]}</button>
                                    <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, nextLast[1]))} className={PaginadoCss.next}>{nextLast[1]}</button>
                                    <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, nextLast[2]))} className={PaginadoCss.next}>{nextLast[2]}</button>
                                </> :
                                <>
                                    <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, nextLast[0]))} className={PaginadoCss.next}>{nextLast[0]}</button>
                                    <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, nextLast[1]))} className={PaginadoCss.next}>{nextLast[1]}</button>
                                </> :
                            <>
                                <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, nextLast[0]))} className={PaginadoCss.next}>{nextLast[0]}</button>
                            </> :
                        ""}</p>
                <p className={PaginadoCss.ultimos}>
                    {last >= 7 ?
                        actual < 2 ?
                            <>
                                <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, nextLast[2] + 1))} className={PaginadoCss.next}>{nextLast[2] + 1}</button>
                                <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, nextLast[2] + 2))} className={PaginadoCss.next}>{nextLast[2] + 2}</button>
                                <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, nextLast[2] + 3))} className={PaginadoCss.next}>{nextLast[2] + 3}</button>
                            </> :
                            actual < 3 ?
                                <>
                                    <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, nextLast[2] + 1))} className={PaginadoCss.next}>{nextLast[2] + 1}</button>
                                    <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, nextLast[2] + 2))} className={PaginadoCss.next}>{nextLast[2] + 2}</button>
                                </> :
                                actual < 4 ?
                                    <button onClick={() => dispatch(actions.getNst(state.pokemons, state.next, state.previous, actual, nextLast[2] + 1))} className={PaginadoCss.next}>{nextLast[2] + 1}</button> :
                                    "" :
                        ""}
                </p>
            </div>
            <div className={PaginadoCss.adelante}>
                <p><button name='next' onClick={() => dispatch(actions.getNext(state.pokemons, state.next))} disabled={!state.next.length}>{">"}</button></p>
                <p>{last > (actual + 4) ?
                    <button onClick={() => dispatch(actions.getLast(state.pokemons, state.next))} className={PaginadoCss.next}>{">>"}</button> : ""}</p>
            </div>
        </div>
    )
};
export default Paginado