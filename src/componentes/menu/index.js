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
                <Link to="/facturas" className="titulo" >TPVWEB</Link>
                <ul>
                    <li className={this.state.select("facturas")}><Link to="/facturas" >Facturas</Link></li>
                    <li className={this.state.select("estadisticas")} ><Link to="/estadisticas" >Estadísticas</Link></li>
                    <li className={"submenu "+this.state.select("administraProductos")}>Administración
                        <ul>
                            <li><Link to="/administracion/productos" key="productos" className={this.state.select("administraProductos")} >Productos</Link></li>
                            <li><Link to="/administracion/facturas" key="facturas" >Facturas</Link></li>
                            <li><Link to="/administracion/usuarios" key="usuarios" >Usuarios</Link></li>
                        </ul>
                    </li>
                    <li id="cerrarSesion"><Link to="/cerrarSesion" >Cerrar sesión</Link></li>
                </ul>
            </div>
        )
    }
}