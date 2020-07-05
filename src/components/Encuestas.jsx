import React from 'react'

import {EncuestasContext} from "../context/EncuestasProvider" 
import {UsuarioContext} from "../context/UsuarioProvider"
import PintarAutor from './PintarAutor'
import VotarEncuesta from './VotarEncuesta'

const Encuestas = () => {

    const {encuestas} = React.useContext(EncuestasContext)

    const {usuario} = React.useContext(UsuarioContext)

    return (
        <div className="mt-5">
            <h3>Lista de encuestas</h3>
            <ul className="list-group">
                {
                    encuestas.map(encuesta => (
                        <li className="list-group-item" key={encuesta.id}>
                            <h5>
                                {encuesta.titulo}
                            </h5>

                            <ul className="list-group">
                                {
                                    encuesta.opciones.map ( enc => (
                                        <li className="list-group-item" key={enc.orden}>
                                            <span>{enc.nombreOpcion} - {enc.votos}</span>

                                            <VotarEncuesta encuesta={encuesta} nombreOpcion={enc.nombreOpcion} />
                                        </li>
                                        
                                        )
                                    )
                                }

                            </ul>

                                {/* si el usuario ya voto la encuesta se muestra el cartel */}
                            {
                                (usuario.email && encuesta.votantes.includes(usuario.uid) ) && (
                                <span className="text-primary">Votaste esta encuesta</span>
                                )
                            }

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
