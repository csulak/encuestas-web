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
    
    
            const encuestaAModificarVoto = encuestas.filter(encues => encues.id === idEncuesta)[0]

            const prololo = encuestas.map(encuestin => encuestin.id !== idEncuesta ? encuestin : (
                encuestin.opciones.map(opc => opc.nombreOpcion !== nombreOpcion ? opc : {
                    nombreOpcion: opc.nombreOpcion,
                    orden: opc.orden,
                    votos: opc.votos + 1  
                })
                
                ))

                console.log("que flasheamo? :", prololo)

                const arrayPlano = [1,2,3]

                console.log("array plano: ", arrayPlano)

            const opcionesDeEncuestaANoModificarVoto = encuestaAModificarVoto.opciones.filter(opci => opci.nombreOpcion !== nombreOpcion)
            
            const opcionDeEncuestaAmodificarVoto = encuestaAModificarVoto.opciones.filter(opci => opci.nombreOpcion === nombreOpcion)[0]
    
            console.log("votame esta: ", encuestaAModificarVoto)
    
            await db.collection('encuestas').doc(idEncuesta).update({
                // opciones: [
                //     ...opcionesDeEncuestaANoModificarVoto,
                //     {
                //         nombreOpcion: opcionDeEncuestaAmodificarVoto.nombreOpcion,
                //         orden: opcionDeEncuestaAmodificarVoto.orden,
                //         votos: opcionDeEncuestaAmodificarVoto.votos + 1
                //     }
                // ],
                opciones: prololo.values(),
                votantes:[
                    ...encuestaAModificarVoto.votantes,
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
