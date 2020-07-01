import React from 'react'
import {db} from "../firebase"

export const EncuestasContext = React.createContext()

const EncuestasProvider = (props) => {

    const [encuestas, setEncuestas] = React.useState([])

    React.useEffect( () => {

        fetchEncuestas()

    }, [])


    const fetchEncuestas = async() => {

        try {

            //leemos la coleccion 'encuestas'
            const res = await db.collection('encuestas').get()

            // mapeamos todos los documentos de la coleccion
            const arrayEncuestas = res.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })

            console.log('como queda mapeada la coleccion de encuestas: ', arrayEncuestas)

            //seteamos el mapeo de toda la coleccion a nustro hook
            setEncuestas(arrayEncuestas)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <EncuestasContext.Provider value={{encuestas, fetchEncuestas}}>
            {props.children}
        </EncuestasContext.Provider>
    )
}

export default EncuestasProvider
