import FilterTypeCss from './FilterType.module.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';


function FilterType() {
    const state = useSelector(state => state)
    const [input, setInput] = useState({
        type: ""
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
        <form className={FilterTypeCss.form} name="filterType">
        <label htmlFor="type">Filter by type:
        <select name="type" id="type" onChange={handleInputChange}>
                {state.types.map(tipo => <option key={tipo.name} value={tipo.name}>{tipo.name}</option>)}
            </select>
        </label>
        <button type="submit">Filter</button>
    </form>
    )
};
export default FilterType