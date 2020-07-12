import React from 'react'
import {db} from "../firebase"

import {UsuarioContext} from "../context/UsuarioProvider"
import {EncuestasContext} from "../context/EncuestasProvider"

const AgregarEncuestas = () => {


    const [titulo, setTitulo] = React.useState('')
    const [errorTitulo, setErrorTitulo] = React.useState('')

    const [opcion, setOpcion] = React.useState('')
    const [errorOpcion, setErrorOpcion] = React.useState('')

    const [opciones, setOpciones] = React.useState([])
    const [errorOpciones, setErrorOpciones] = React.useState([])

    const {usuario} = React.useContext(UsuarioContext)
    const {fetchEncuestas} = React.useContext(EncuestasContext)

    const [categoria, setCategoria] = React.useState('general')


    const crearEncuesta = (e) => {
        setErrorOpcion('')
        setErrorTitulo('')

        e.preventDefault()

        if(!titulo.trim()){
            console.log("campos vacios")
            setErrorTitulo("Ingresa un titulo.")
            return
        }


        if(opciones.length === 0){
            console.log("campos vacios")
            setErrorOpciones("Ingresa al menos una opcion.")
            return
        }
        
        
        db.collection('encuestas').add({
            titulo: titulo,
            uidAutor: usuario.uid,
            opciones: opciones,
            votantes: [],
            categoria: categoria,
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
        setErrorOpcion('')

        if(!opcion.trim()){
            console.log("Nombre Vacio")
            setErrorOpciones('')
            setErrorOpcion("Elija un nombre para la opcion.")
            return
        }

        setErrorOpciones('')



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

                <h5>Seleccione una categoria</h5>

                <select id="categoriaId" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    <option value="general">General</option>
                    <option value="deporte">Deporte</option>
                    <option value="politica">Politica</option>
                    <option value="duda_existencial">Duda Existencial</option>
                </select>

                <input 
                    type="text" 
                    className="form-control my-2"
                    placeholder="ingresa un titulo"
                    onChange={ (e) => setTitulo(e.target.value)}
                    value={titulo}
                />

                {
                    errorTitulo && (
                        <span className="text-danger text-small d-block mb-2">
                            {errorTitulo} 
                        </span>
                    )
                
                }

                <input 
                    type="text" 
                    className="form-control mb-2"
                    placeholder="ingresa una opcion"
                    onChange={ (e) => setOpcion(e.target.value)}
                    value={opcion}
                />

                {
                    (opciones.length === 0  || errorOpciones || errorOpcion) && (
                        <span className="text-danger text-small d-block mb-2">
                            {errorOpcion} {errorOpciones} 
                        </span>
                    )
                
                }


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
