import SortCss from './Sort.module.css'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../actions/index';


function Sort() {
    const dispatch = useDispatch()
    const [order, setOrder] = useState("");
    useEffect(() => {
        const ordenar = () => {
            dispatch(actions.sortPoke(order))
        }
        if (order !== "") {
            return ordenar(order)
        }
    }, [order])


    return (
        <div className={SortCss.sort}>
            <p>Sort by:</p>
            <button name="az" onClick={() => setOrder("az")}>A-Z</button>
            <button name="za" onClick={() => setOrder("za")}>Z-A</button>
            <button name="ataqueDesc" onClick={() => setOrder("ataqueDesc")}>Most attack</button>
            <button name="ataqueAsc" onClick={() => setOrder("ataqueAsc")}>Least attack</button>
        </div>
    )
};
export default Sort