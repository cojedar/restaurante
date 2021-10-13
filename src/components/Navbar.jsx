import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { auth } from '../firebase'

const Navbar = (props) => {

    const cerrarSesion = ()=>{
        auth.signOut()
            .then(
                ()=>{
                    props.history.push('/login')
                }
            )
    }

    return (
        <div className="navbar 
                    navbar-dark 
                    bg-dark">

            <Link to="/" className="navbar-brand">
                Menu Restaurante las Delicias
            </Link>
            <div>
                <div className="d-flex">

                    <NavLink
                        className="btn btn-dark"
                        to="/"
                        exact>
                        Inicio
                    </NavLink>

                    {
                        props.usuario !== null ? (

                            <NavLink className="btn btn-dark" to="/menus">
                                Menu
                            </NavLink>
                            

                        ) : null
                    }
                    {    
                        props.usuario !== null ? (

                            <NavLink className="btn btn-dark" to="/clientes">
                                Clientes
                            </NavLink>
                        ) : null
                    }
                    {    
                        props.usuario !== null ? (

                            <NavLink className="btn btn-dark" to="/pedidos">
                                Pedidos
                            </NavLink>
                        ) : null
                    }
                    {
                        props.usuario !== null ? (
                            <button className="btn btn-warning" 
                                onClick={ ()=> cerrarSesion() }
                            >
                                Cerrar sesión
                            </button>
                        ) : (

                            <NavLink className="btn btn-dark" to="/login"
                            >Login
                            </NavLink>
                            

                        )
                    }




                </div>

            </div>




        </div>
    )
}

export default withRouter(Navbar)
