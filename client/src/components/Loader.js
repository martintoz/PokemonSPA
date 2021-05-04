import spinner from '../img/pokeball.gif'
import LoaderCss from './Loader.module.css'

const Loader = () => {
    return (
        <div className={LoaderCss.loader}>
            <img src={spinner} alt="loading"></img>
        </div>
    )
}

export default Loader