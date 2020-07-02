import React from 'react'
import {db} from "../firebase"

import {UsuarioContext} from "../context/UsuarioProvider"
import {EncuestasContext} from "../context/EncuestasProvider"

const AgregarEncuestas = () => {


    const [titulo, setTitulo] = React.useState('')

    const [opcion, setOpcion] = React.useState('')
    const [opciones, setOpciones] = React.useState([])

    const {usuario} = React.useContext(UsuarioContext)
    const {fetchEncuestas} = React.useContext(EncuestasContext)


    const crearEncuesta = (e) => {

        e.preventDefault()

        if(!titulo.trim() || opciones.length === 0){
            console.log("campos vacios")
            return
        }

        db.collection('encuestas').add({
            titulo: titulo,
            uidAutor: usuario.uid,
            opciones: opciones,
            votantes: [],
            autor: db.collection('usuarios').doc(usuario.email)
        })
            .then(doc => {
                console.log("encuesta que queremos guardar", doc)
                fetchEncuestas()
            })
            .catch(error => console.log(error))

        setTitulo('')
        setOpciones([])
    }    


    const agregarOpcion = () => {

        if(!opcion.trim()){
            console.log("Nombre Vacio")
            return
        }



        setOpciones([
            ...opciones,
            {
                orden: opciones.length,
                nombreOpcion: opcion,
                votos: 0
        }])

        setOpcion('')
    }

    return (
        <div className="mt-5">
            <h3>Agregar Encuestas</h3>
            <form onSubmit={crearEncuesta}>
                <input 
                    type="text" 
                    className="form-control mb-2"
                    placeholder="ingresa un titulo"
                    onChange={ (e) => setTitulo(e.target.value)}
                    value={titulo}
                />

                <input 
                    type="text" 
                    className="form-control mb-2"
                    placeholder="ingresa una opcion"
                    onChange={ (e) => setOpcion(e.target.value)}
                    value={opcion}
                />

                <button 
                    className="btn btn-dark" 
                    type="button" 
                    onClick={ () => agregarOpcion()}
                >
                    Agregar opcion
                </button>

                <ul className="list-group">
                    {
                        opciones.map((opc) => (
                            <p key={opc.orden}>opcion {opc.orden} - {opc.nombreOpcion}</p>
                        ))
                    }
                </ul>


                <button type="submit" className="btn btn-primary mt-2">Crear Encuesta</button>
            </form>
        </div>
    )
}

export default AgregarEncuestas
