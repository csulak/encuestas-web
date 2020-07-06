import React from 'react'

import {EncuestasContext} from "../context/EncuestasProvider" 
import {UsuarioContext} from "../context/UsuarioProvider"
import {db} from "../firebase"


const VotarEncuesta = (props) => {

    const {encuestas} = React.useContext(EncuestasContext)
    const {fetchEncuestas} = React.useContext(EncuestasContext)

    const {usuario} = React.useContext(UsuarioContext)


    const votarEncuesta = async(idEncuesta, nombreOpcion) => {
        try {
                //obtengo la encuesta que voy a agregarle un voto
                const encuestaAModificar = encuestas.filter(encuesta => encuesta.id === idEncuesta)[0]
                    
                //le agrego un voto a la opcion que eligio el usuario
                const votosModificados= encuestaAModificar.opciones.map(opc => opc.nombreOpcion !== nombreOpcion ? opc : {
                        nombreOpcion: opc.nombreOpcion,
                        orden: opc.orden,
                        votos: opc.votos + 1  
                    })

                console.log("votos modificados list: ", votosModificados)
    
            //agrego una nueva lista de las opciones con el nuevo voto que se agrego
            //agrego a la lista de votantes el uid del usuario que acaba de votar en la encuesta
            await db.collection('encuestas').doc(idEncuesta).update({
                opciones: votosModificados,
                votantes:[
                    ...encuestaAModificar.votantes,
                    usuario.uid
                ]
            })
            fetchEncuestas()
    
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            {
                // valido si el usuario esta logueado y si no voto anteriormente la encuesta
                (usuario.email && !props.encuesta.votantes.includes(usuario.uid) ) && (
                    <button 
                        className="btn btn-dark float-right"
                        onClick={ () => votarEncuesta(props.encuesta.id, props.nombreOpcion)}
                    >
                        Votar
                    </button>
                )
            }
        </div>
    )
}

export default VotarEncuesta
