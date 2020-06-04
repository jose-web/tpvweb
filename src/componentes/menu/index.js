import React from 'react'
import './estilos.scss'
import { Link } from "react-router-dom"

export default class Menu extends React.Component {

    cerrarSesion() {
        localStorage.removeItem('usuario')
        sessionStorage.clear()
    }

    render() {
        let fotoUsuario = sessionStorage.getItem("img")
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
                            {sessionStorage.getItem("encargado") > 0 ?
                                <Link to="/administracion/seleccionLocal" className={this.props.estoyEn === "administracion" ? "activo" : ""}><li>Administración</li></Link> : ""
                            }
                            <Link to="/temas" id="temas"><li>Temas</li></Link>
                            <Link to="/cerrarSesion" id="cerrarSesion" onClick={this.cerrarSesion}><li>cerrar sesión</li></Link>
                        </ul>
                        <div id="bolaMenuOpciones"></div>
                    </div>
                    <Link to="/locales">TPVWEB</Link>
                    <Link to="/perfil"><img src={fotoUsuario} alt="perfil" /></Link>
                    <label htmlFor="checkHamburguesa" id="fondoMenu" aria-hidden="true"></label>
                </header>
            </>
        )
    }
}
