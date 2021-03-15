import React from 'react'
import './estilos.scss'
import { Link } from "react-router-dom"

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div id="menuPrincipal" >
                <h1>TPVWEB</h1>
                <ul>
                    <li className="selected">Principal</li>
                    <li>Estadísticas</li>
                    <li id="cerrarSesion">Cerrar sesión</li>
                </ul>
            </div>
        )
    }

}