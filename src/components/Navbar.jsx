import React from 'react'

import {UsuarioContext} from "../context/UsuarioProvider"
import { auth } from '../firebase'

import {NavLink} from 'react-router-dom'

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

                    {
                        usuario.rol === 'admin' && <NavLink className="btn btn-dark mr-2" to="/admin" exact>admin</NavLink>
                    }

                    {
                        usuario.rol === 'autor' && <NavLink className="btn btn-dark mr-2" to="/encuestador" exact>encuestador</NavLink>
                    }

                <NavLink className="btn btn-dark mr-2" to="/" exact>encuestas</NavLink>

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
