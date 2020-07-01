import React from 'react'

import {UsuarioContext} from "../context/UsuarioProvider"
import { auth } from '../firebase'

const Navbar = () => {

    const {usuario, iniciarSesion, cerrarSesion} = React.useContext(UsuarioContext)

    return (
        <div className="navbar navbar-dark bg-dark">
            <div className="container">

                <div>
                    {
                        usuario.email ? (
                            <button className="btn btn-dark" onClick={cerrarSesion}>
                                cerrar sesion
                            </button>
                        ) : (
                            <button className="btn btn-dark" onClick={iniciarSesion}>
                                Login
                            </button>

                        )
                    }

                </div>

                <div>
                    <span className="text-light">
                        {
                            usuario.email ? usuario.email : "invitado"
                        }
                    </span>
                </div>

            </div>
        </div>
    )
}

export default Navbar
