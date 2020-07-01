import React from 'react'

import {EncuestasContext} from "../context/EncuestasProvider" 
import PintarAutor from './PintarAutor'

const Encuestas = () => {

    const {encuestas} = React.useContext(EncuestasContext)

    return (
        <div className="mt-5">
            <h3>Lista de encuestas</h3>
            <ul className="list-group">
                {
                    encuestas.map(encuesta => (
                        <li className="list-group-item" key={encuesta.id}>
                            <span>
                                {encuesta.titulo}
                            </span>
                            <span>
                                <PintarAutor referencia={encuesta.autor} idEncuesta={encuesta.id}/>
                            </span>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default Encuestas
