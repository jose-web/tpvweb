import React from 'react'
import './estilos.scss'
import { Link } from "react-router-dom"

export default class Menu extends React.Component {

    cerrarSesion() {
        localStorage.removeItem('usuario')
        sessionStorage.clear()
    }

    render() {
        return (
            <>
                <input type="checkbox" id="checkHamburguesa" />
                <header id="menu">
                    <label id="menuHamburguesa" htmlFor="checkHamburguesa" tabIndex="0">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    <div id="menuOpciones">
                        <ul>
                            <Link to="/administracion/seleccionLocal" className={this.props.estoyEn === "administracion" ? "activo" : ""}><li>Administración</li></Link>
                            <Link to="/suscripcion" className={this.props.estoyEn === "suscripcion" ? "activo" : ""}><li>Suscripción</li></Link>
                            <Link to="/cerrarSesion" id="cerrarSesion" onClick={this.cerrarSesion}><li>cerrar sesión</li></Link>
                        </ul>
                        <div id="bolaMenuOpciones"></div>
                    </div>
                    <label htmlFor="checkHamburguesa" id="fondoMenu" aria-hidden="true"></label>
                </header>
            </>
        )
    }
}
