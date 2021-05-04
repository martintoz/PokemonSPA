import FilterExistentCss from './FilterExistent.module.css'
import { useState } from 'react';


function FilterExistent() {
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
        <form className={FilterExistentCss.form} name="filterExistent">
            <label htmlFor="type">Filtrar por existente:
        <select name="existent" id="existent" onChange={handleInputChange}>
                    <option value="t">Solo existentes</option>
                    <option value="f">Solo creados</option>
                </select>
            </label>
            <button type="submit">Filtrar</button>
        </form>
    )
};
export default FilterExistent