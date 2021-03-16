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
                    <li><Link to="/estadisticas" >Estadísticas</Link></li>
                    <li id="cerrarSesion"><Link to="/cerrarSesion" >Cerrar sesión</Link></li>
                </ul>
            </div>
        )
    }
}