import React from 'react'
import './estilos.css'
import { Link } from "react-router-dom"

export default class Menu extends React.Component {
    render() {
        return (
            <>
                <input type="checkbox" id="checkHamburguesa" />
                <header id="menu">
                    <label id="menuHamburguesa" htmlFor="checkHamburguesa" tabindex="0">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    <div id="menuOpciones">
                        <ul>
                            <Link to="/administracion"><li>Administración</li></Link>
                            <Link to="/suscripcion"><li>Suscripción</li></Link>
                            <Link to="/cerrarSesion" id="cerrarSesion"><li>cerrar sesion</li></Link>
                        </ul>
                        <div id="bolaMenuOpciones"></div>
                    </div>
                    <label htmlFor="checkHamburguesa" id="fondoMenu" aria-hidden="true"></label>
                </header>
            </>
        )
    }
}
