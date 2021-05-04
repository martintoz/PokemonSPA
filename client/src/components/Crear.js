import { useState, useEffect } from 'react';
import CrearCss from './Crear.module.css';
import * as actions from '../actions/index';
import { useSelector, useDispatch } from 'react-redux';


export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Ponele nombre';
    } else if (!/^[a-zA-Z]+$/.test(input.name)) {
        errors.name = 'Solo letras';
    }
    // if (!input.img){
    //     errors.img = "Ponele imagen"
    // }
    if (input.hp <= 0) {
        errors.hp = 'Ponele vida'
    }
    // if(input.strength <= 0){
    //     errors.strength = 'Ponele fuerza'
    // }
    if (input.attack <= 0) {
        errors.attack = 'Ponele ataque'
    }
    if (input.defense <= 0) {
        errors.defense = 'Ponele defensa'
    }
    if (input.speed <= 0) {
        errors.speed = 'Ponele velocidad'
    }
    if (input.height <= 0) {
        errors.height = 'Ponele altura'
    }
    if (input.weight <= 0) {
        errors.weight = 'Ponele peso'
    }
    return errors;
}
const Crear = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    useEffect(() => {
        if (!state.types.length) {
            dispatch(actions.getTypes())
        }
    }, [state.types, dispatch])
    const [input, setInput] = useState({
        name: "",
        img: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
    });
    const [errors, setErrors] = useState({})
    const handleInputChange = function (e) {
        const target = e.target
        const name = target.name
        const value = target.value
        setInput({
            ...input,
            [name]: value
        });
        setErrors(validate({
            ...input,
            [name]: value
        }));
    }


    return (
        <div className={CrearCss.crear}>
            <h1>Creá tu propio Pokémon</h1>
            <form name="pokemon" method="POST" action="/pokemons">
                
                    <label>Nombre:</label>
                    <input className={`${errors.name && CrearCss.danger}`} type="text" name="name" onChange={handleInputChange} value={input.name} />

                
                {errors.name && (
                    <p className={CrearCss.danger}>{errors.name}</p>
                )}
                    <label>Imagen:</label>
                    <input className={`${errors.img && CrearCss.danger}`} type="text" name="img" onChange={handleInputChange} value={input.img} />

                {errors.img && (
                    <p className={CrearCss.danger}>{errors.img}</p>
                )}
                <div className={CrearCss.tipos}>
                    <div>
                        <label htmlFor="type">Tipo:</label>
                        <select name="type" id="type">
                            {state.types.map(tipo => <option name="type" key={tipo.id} value={tipo.id}>{tipo.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="type2">Tipo 2:</label>
                        <select name="type2" id="type2">
                            <option name="sinTipo" value="0">Sin tipo</option>
                            {state.types.map(tipo => <option name="type2" key={tipo.id} value={tipo.id}>{tipo.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className={CrearCss.stats}>
                    <div>
                        <div>
                            <label>Vida:
                            </label>
                            <input className={`${errors.hp && CrearCss.danger}`} type="number" name="hp" min="1" onChange={handleInputChange} value={input.hp} />
                        </div>
                        {errors.hp && (
                            <p className={CrearCss.danger}>{errors.hp}</p>
                        )}
                    </div>
                    <div>
                        <div>
                            <label>Ataque:
                            </label>
                            <input className={`${errors.attack && CrearCss.danger}`} type="number" name="attack" min="1" onChange={handleInputChange} value={input.attack} />
                        </div>
                        {errors.attack && (
                            <p className={CrearCss.danger}>{errors.attack}</p>
                        )}
                    </div>
                    <div>
                        <div>
                            <label>Defensa:
                            </label>
                            <input className={`${errors.defense && CrearCss.danger}`} type="number" name="defense" min="1" onChange={handleInputChange} value={input.defense} />
                        </div>
                        {errors.defense && (
                            <p className={CrearCss.danger}>{errors.defense}</p>
                        )}
                    </div>
                    <div>
                        <div>
                            <label>Velocidad:
                            </label>
                            <input className={`${errors.speed && CrearCss.danger}`} type="number" name="speed" min="1" onChange={handleInputChange} value={input.speed} />
                        </div>
                        {errors.speed && (
                            <p className={CrearCss.danger}>{errors.speed}</p>
                        )}
                    </div>
                    <div>
                        <div>
                            <label>Altura (cm):
                            </label>
                            <input className={`${errors.height && CrearCss.danger}`} type="number" name="height" min="1" onChange={handleInputChange} value={input.height} />
                        </div>
                        {errors.height && (
                            <p className={CrearCss.danger}>{errors.height}</p>
                        )}
                    </div>
                    <div>
                        <div>
                            <label>Peso (kg):
                            </label>
                            <input className={`${errors.weight && CrearCss.danger}`} type="number" name="weight" min="0.1" step="0.1" onChange={handleInputChange} value={input.weight} />
                        </div>
                        {errors.weight && (
                            <p className={CrearCss.danger}>{errors.weight}</p>
                        )}
                    </div>
                </div>
                <button type="submit" disabled={Object.keys(errors).length || input.hp === 0}>Crear</button>
            </form>
        </div >
    )
}

export default Crear