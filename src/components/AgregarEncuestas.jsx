import React from 'react'
import {db} from "../firebase"

import {UsuarioContext} from "../context/UsuarioProvider"
import {EncuestasContext} from "../context/EncuestasProvider"

const AgregarEncuestas = () => {


    const [titulo, setTitulo] = React.useState('')
    const [paginas, setPaginas] = React.useState('')

    const {usuario} = React.useContext(UsuarioContext)
    const {fetchEncuestas} = React.useContext(EncuestasContext)

    const agregarEncuesta = (e) => {

        e.preventDefault()

        if(!titulo.trim() || !paginas.trim()){
            console.log("campos vacios")
            return
        }

        db.collection('encuestas').add({
            titulo: titulo,
            paginas: paginas,
            uidAutor: usuario.uid,
            autor: db.collection('usuarios').doc(usuario.email)
        })
            .then(doc => {
                console.log("encuesta que queremos guardar", doc)
                fetchEncuestas()
            })
            .catch(error => console.log(error))

        setTitulo('')
        setPaginas('')
    }    

    return (
        <div className="mt-5">
            <h3>Agregar Encuestas</h3>
            <form onSubmit={agregarEncuesta}>
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
                    placeholder="ingresa paginas"
                    onChange={ (e) => setPaginas(e.target.value)}
                    value={paginas}

                />
                <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
        </div>
    )
}

export default AgregarEncuestas
