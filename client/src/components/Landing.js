import LandingCss from './Landing.module.css'
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import * as actions from '../actions/index';
import {useEffect} from 'react';

function Landing() {
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(actions.getTypes())
    }, [dispatch])

    return (
        <div className={LandingCss.fondo}>
            <Link to='/pokemons'><h1>Enter</h1></Link>
        </div>
    )
};

export default Landing;