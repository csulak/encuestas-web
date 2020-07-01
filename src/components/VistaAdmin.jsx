import React from 'react'
import {db, functions} from '../firebase'

const VistaAdmin = () => {

    const [usuarios, setUsuarios] = React.useState([])

    React.useEffect( () => {
        fetchUsuarios()
    }, [])

    const fetchUsuarios = async() => {
        try {

            const res = await db.collection('usuarios').get()

            const arrayUsuarios = res.docs.map(doc => doc.data())
            setUsuarios(arrayUsuarios)

        } catch (error) {
            console.log(error)
        }
    }

    const administrador = (email) => {
        if(!email.trim()){
            return console.log("email vacio!")
        }

        // gracias a la constante que importamos (functions) podemos leer las funciones que creamos en el backend. en este caso 'agregarAdministrador'
        const agregarRol = functions.httpsCallable('agregarAdministrador')

        agregarRol({email: email})
            .then(res => {
                console.log("respuesta de agregar rol(admin): ",res)
                if(res.data.error){

                    console.log("no tiene permisos")
                    return 
                }

                db.collection('usuarios').doc(email).update({rol: 'admin'})
                    .then(user => {
                        console.log("usuario agregado rol administrador")
                        fetchUsuarios()
                    })

            })


    }


    const crearAutor = (email) => {

        // gracias a la constante que importamos (functions) podemos leer las funciones que creamos en el backend. en este caso 'agregarAdministrador'
        const agregarRol = functions.httpsCallable('crearAutor')

        agregarRol({email: email})
            .then( res => {

                console.log("respuesta de agregar rol (autor): ",res)
                if(res.data.error){
                    console.log("no tienes permisos vieji")
                    return
                }

                db.collection('usuarios').doc(email).update({rol: 'autor'})
                    .then(user => {
                        console.log("usuario agregado rol autor")
                        fetchUsuarios()
                    })

            }) 

    }

    const eliminarAutor = (email) => {

        // gracias a la constante que importamos (functions) podemos leer las funciones que creamos en el backend. en este caso 'agregarAdministrador'
        const agregarRol = functions.httpsCallable('eliminarAutor')

        agregarRol({email: email})
            .then( res => {
                console.log("respuesta de eliminar rol (autor): ",res)
                if(res.data.error){
                    console.log("no tienes permisos vieji")
                    return
                }
                db.collection('usuarios').doc(email).update({rol:'invitado'})
                    .then(user => {
                        console.log("usuario eliminado rol autor, ahora es invitado")
                        fetchUsuarios()
                    })
            })

    }


    const eliminarAdministrador = (email) => {

        // gracias a la constante que importamos (functions) podemos leer las funciones que creamos en el backend. en este caso 'agregarAdministrador'
        const agregarRol = functions.httpsCallable('eliminarAdministrador')

        agregarRol({email: email})
            .then( res => {
                console.log("respuesta de eliminar rol (autor): ",res)
                if(res.data.error){
                    console.log("no tienes permisos vieji")
                    return
                }
                db.collection('usuarios').doc(email).update({rol:'invitado'})
                    .then(user => {
                        console.log("usuario eliminado rol administrador, ahora es invitado")
                        fetchUsuarios()
                    })
            })

    }

    return (
        <div className="mt-5">
            <h3>administracion de usuarios</h3>
            {
                usuarios.map(usuario => (
                    <div key={usuario.uid} className="mb-2">
                        {usuario.email} - rol: {usuario.rol}
                        {
                            usuario.rol === 'admin' ? (
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={ () => eliminarAdministrador(usuario.email)}
                                >
                                    eliminar Admin
                                </button>

                            ) : (
                                <>
                                    <button
                                        className="btn btn-warning mx-2"
                                        onClick={ () => administrador(usuario.email)}
                                    >
                                        administrador
                                    </button>

                                    <button
                                        className="btn btn-success mx-2"
                                        onClick={ () => crearAutor(usuario.email)}
                                    >
                                        Autor
                                    </button>

                                    <button
                                        className="btn btn-info mx-2"
                                        onClick={ () => eliminarAutor(usuario.email)}
                                    >
                                        Invitado
                                    </button>
                                </>
                            )
                        }

                    </div>
                ))
            }
        </div>
    )
}

export default VistaAdmin
