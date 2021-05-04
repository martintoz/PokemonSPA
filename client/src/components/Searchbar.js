import SearchbarCss from './Searchbar.module.css'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import lupa from '../img/lupa.png';

function Searchbar() {
    const [input, setInput] = useState({
        search: ""
    })

    const handleInputChange = function (e) {
        const target = e.target
        const name = target.name
        const value = target.value
        setInput({
            ...input,
            [name]: value
        });
    }

    return (
        <div className={SearchbarCss.form}>
            <form name="searchName" >
                <label htmlFor="type">Search by name:
        <input type="text" name="search" id="search" onChange={handleInputChange} />
                </label>
            </form>
            <Link to={'/pokemons/' + input.search}><img className={SearchbarCss.lupa} src={lupa} /></Link>
        </div>
    )
};
export default Searchbar