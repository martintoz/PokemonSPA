import HeaderCss from './Header.module.css'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Searchbar from './Searchbar';
import logo from '../img/pokemon.png';
import * as actions from '../actions/index';

function Header() {
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        if (location.search) {
            var search = location.search.split("=")[0]
            var pokemon = location.search.split("=")[1]
            // console.log("location.search", pokemon)
            if(search === "?search"){
                window.location.replace("/pokemons/" + pokemon);
            }

        }
    }, [])
    return (
        <div className={HeaderCss.header}>
            <Link to={'/pokemons/crear'}><button className={HeaderCss.boton} name="crear">Create Pokémon</button></Link>
            <a href='/pokemons'><img className={HeaderCss.logo} alt="pokemon" src={logo} name="logo" /></a>
            <div className={HeaderCss.searchbar}><Searchbar  /></div>
        </div>
    )
};

export default Header;