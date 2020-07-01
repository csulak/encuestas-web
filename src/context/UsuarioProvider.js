import React from 'react'
import {auth, db, firebase} from "../firebase"

export const UsuarioContext = React.createContext()

const UsuarioProvider = (props) => {

    const dataUsuarioInicial = {
        email: null,
        uid: null,
        activo: null
    }

    const [usuario, setUsuario] = React.useState(dataUsuarioInicial)

    React.useEffect( () => {
        detectarUsuario()
    }, [])

    const detectarUsuario = () =>{

        auth.onAuthStateChanged( user => {
            if(user){
                console.log('usuario logueado: ',user)

                user.getIdTokenResult()
                    .then(idTokenResult => {
                        console.log('el idToken es: ', idTokenResult)
                        if(!!idTokenResult.claims.admin){
                            console.log('es un usuario administrador')

                            setUsuario({
                                email: user.email,
                                uid: user.uid,
                                activo: 'true',
                                rol: 'admin'
                            })
                        }else if(!!idTokenResult.claims.autor){
                            console.log('es un usuario autor')

                            setUsuario({
                                email: user.email,
                                uid: user.uid,
                                activo: 'true',
                                rol: 'autor'
                            })
                        }else{
                            console.log('es un usuario invitado')

                            setUsuario({
                                email: user.email,
                                uid: user.uid,
                                activo: 'true',
                                rol: 'invitado'
                            })
                        }
                    })

            }else{
                console.log('usuario no logueado: ',user)
                setUsuario({
                    email: null,
                    uid: null,
                    activo: false,
                    rol: null
                })
            }
        })

    }


    const iniciarSesion = async() => {
        try {
            
            //aca creamos un provider de google
            const provider = new firebase.auth.GoogleAuthProvider()

            // aca se abre un popup para iniciar sesion que es de google (porque le pase por parametros el provider que iniciamos en la linea de arriba)
            const res = await auth.signInWithPopup(provider)

            //confirmamos que el usuario que se esta iniciando exista en nuestra db dentro de la coleccion "usuarios"
            const existe = await db.collection('usuarios').doc(res.user.email).get()

            if(!existe.exists){
                //si no existe, creamos el usuario
                await db.collection('usuarios').doc(res.user.email).set({
                    uid: res.user.uid,
                    email: res.user.email,
                    rol: 'invitado'
                })
            }

        } catch (error) {
            console.log("fallo la creacion o logueo de usuario: ", error)
        }
    }

    const cerrarSesion = () => {
        auth.signOut()
    }

    return (
        <UsuarioContext.Provider value={{usuario, iniciarSesion, cerrarSesion}}>
            {props.children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioProvider
