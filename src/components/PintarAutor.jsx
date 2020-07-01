import React from 'react'
import {db} from "../firebase"
import {EncuestasContext} from "../context/EncuestasProvider"
import {UsuarioContext} from "../context/UsuarioProvider"

const PintarAutor = (props) => {

    const  [autor, setAutor] = React.useState('')

    const {fetchEncuestas} = React.useContext(EncuestasContext)
    const {usuario} = React.useContext(UsuarioContext)

    React.useEffect( () => {
        fetchAutor()
    }, [])

    const eliminarEncuesta = async() => {
        try {
            
            await db.collection('encuestas').doc(props.idEncuesta).delete()
            fetchEncuestas()

        } catch (error) {
            console.log(error)
        }
    }

    const fetchAutor = async() => {
        try {
            
            const res = await props.referencia.get()
            console.log("respuesta de llamar a la referencia(autor) de un encuesta especifico :", res.data())

            setAutor(res.data().email)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <span> {autor}</span>
            {
                (autor === usuario.email || usuario.rol === 'admin') && (

                    <button 
                        className="btn btn-danger float-right"
                        onClick={eliminarEncuesta}
                    >
                        Eliminar
                    </button>
                )
            }

        </>
    )
}

export default PintarAutor
