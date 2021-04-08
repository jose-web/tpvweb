import React from 'react'
import './estilos.scss'
import { Link } from "react-router-dom"

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            select: (pagina) => props.pagina === pagina ? "selected" : ""
        };
    }

    render() {
        return (
            <div id="menuPrincipal" >
                <h1>TPVWEB</h1>
                <ul>
                    <li className={this.state.select("facturas")}><Link to="/facturas" >Facturas</Link></li>
                    <li className={this.state.select("estadisticas")} ><Link to="/estadisticas" >Estadísticas</Link></li>
                    <li>Administración
                        <ul>
                            <li><Link to="/admin/productos" key="productos" >Productos</Link></li>
                            <li><Link to="/admin/facturas" key="facturas" >Facturas</Link></li>
                            <li><Link to="/admin/usuarios" key="usuarios" >Usuarios</Link></li>
                        </ul>
                    </li>
                    <li id="cerrarSesion"><Link to="/cerrarSesion" >Cerrar sesión</Link></li>
                </ul>
            </div>
        )
    }
}