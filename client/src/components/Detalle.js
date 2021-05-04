import DetalleCss from './Detalle.module.css'
import DetalleTiposCss from './DetalleTipos.module.css'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../actions/index';
import Loader from './Loader';
import deprimiditto from '../img/deprimiditto.png'

const Detalle = () => {
    const dispatch = useDispatch()
    const [detalle, setDetalle] = useState("")
    const [skip, setSkip] = useState(true)
    const [detalleDb, setDetalleDb] = useState(null)
    const { name } = useParams();
    const statePokeDb = useSelector(state => state.pokemonDb)
    const statePoke = useSelector(state => state.pokemon)
    
    useEffect( () => {
        const getDetallesDb = () => { dispatch(actions.getPokemonDb(name)) }
        async function getData(){const detalles = await statePoke.find(poke => poke.name === name)
        if (detalles) { setDetalle(detalles) }
        else {
            getDetallesDb(name)
        }}
        getData()
    }, [dispatch,name,statePoke])

    useEffect(() => {
        if (skip) {
            return setSkip(false)
        }
        return setDetalleDb(statePokeDb)
    }, [statePokeDb])

    var tipo
    var tipoDb
    var tipoImg
    var tipoImg2
    var tipo2


    return (

        <div className={DetalleCss.detalle}>

            {!detalle && !detalleDb ?
                <Loader />
                : detalleDb === "Pokemon not found in API or DB" ?
                <div className={DetalleCss.notFound}>
                    <h1>404 Pokemon no encontrado</h1>
                    <img src={deprimiditto}/>
                    </div>
                    : <>
                        <div className={DetalleCss.setTipo}>
                            {detalle ?
                                (tipo = detalle.types[0].name,
                                    tipoDb = tipo + "Db",
                                    tipoImg = tipo + "Img")
                                : (tipo = detalleDb.types[0].name,
                                    tipoDb = tipo + "Db",
                                    tipoImg = tipo + "Img")}
                            {detalle ?
                                detalle.types[1] ? (
                                    tipo2 = detalle.types[1].name,
                                    tipoImg2 = tipo2 + "Img")
                                    : tipo2
                                : detalleDb ?
                                    detalleDb.types[1] ?
                                        (tipo2 = detalleDb.types[1].name,
                                            tipoImg2 = tipo2 + "Img")
                                        : tipo2
                                    : tipo2
                            }
                        </div>
                        <div className={`${DetalleCss.card} ${DetalleTiposCss[tipo]}`}>
                            <div className={DetalleCss.headerCard}>
                                <h1>{detalle ? detalle.name : detalleDb.name}</h1>
                                <p>HP: {detalle ? detalle.hp
                                    : detalleDb.hp}</p>
                                <div>
                                    <div title={tipo} className={`${DetalleTiposCss.typeImg} ${DetalleTiposCss[tipoImg]}`}>
                                    </div>
                                    {tipo2 ? <div title={tipo2} className={`${DetalleTiposCss.typeImg} ${DetalleTiposCss[tipoImg2]}`}>
                                    </div> : <></>}
                                </div>
                            </div>
                            <div className={`${DetalleCss.imagen} ${DetalleTiposCss[tipoDb]}`}>
                                <h2 className={DetalleCss.id}>#{detalle ? detalle.id : detalleDb.id}</h2>
                                <img src={detalle ? detalle.img2
                                    : detalleDb.sprites ?
                                        detalleDb.sprites.front_default
                                        : detalleDb.img2} alt={detalle ? detalle.name : detalleDb.name}></img>
                            </div>
                            <div className={DetalleCss.hewe}>
                                <p>{detalle ? detalle.weight / 10 : detalleDb.weight / 10} kg</p>
                                <p>{detalle ? detalle.height / 10 : detalleDb.height / 10} m</p>
                            </div>
                            <div className={DetalleCss.stats}>
                                <div className={DetalleCss.stat}>
                                    <div title={tipo} className={`${DetalleTiposCss.typeImg} ${DetalleTiposCss[tipoImg]}`}>
                                    </div>
                                    <p>Ataque:</p>
                                    <span>{detalle ? detalle.attack
                                        : detalleDb.attack}</span>
                                </div>
                                <hr />
                                <div className={DetalleCss.stat}>
                                    <div title={tipo} className={`${DetalleTiposCss.typeImg} ${DetalleTiposCss[tipoImg]}`}></div>
                                    <p>Defensa:</p>
                                    <span>  {detalle ? detalle.defense
                                        : detalleDb.defense}</span>
                                </div>
                                <hr />
                                <div className={DetalleCss.stat}>
                                    <div title={tipo} className={`${DetalleTiposCss.typeImg} ${DetalleTiposCss[tipoImg]}`}></div>
                                    <p>Velocidad:</p>
                                    <span> {detalle ? detalle.speed
                                        : detalleDb.speed}</span>
                                </div>
                            </div>
                        </div>
                    </>}

        </div>
    )
}

export default Detalle