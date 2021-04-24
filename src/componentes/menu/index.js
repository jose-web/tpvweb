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
                <input type="checkbox" id="checkboxMenu" />
                <label id="miniMenu" htmlFor="checkboxMenu"><span></span><span></span><span></span></label>
                <ul>
                    <li className={this.state.select("facturas")}><Link to="/facturas" >Facturas</Link></li>
                    <li className={this.state.select("estadisticas")} ><Link to="/estadisticas" >Estadísticas</Link></li>
                    <li className={"submenu " + (this.state.select("administraProductos") || this.state.select("administraFacturas") || this.state.select("administraUsuarios"))}>Administración
                        <ul>
                            <li><Link to="/administracion/productos" key="productos" className={this.state.select("administraProductos")} >Productos</Link></li>
                            <li><Link to="/administracion/facturas" key="facturas" className={this.state.select("administraFacturas")}>Facturas</Link></li>
                            <li><Link to="/administracion/usuarios" key="usuarios" className={this.state.select("administraUsuarios")}>Usuarios</Link></li>
                        </ul>
                    </li>
                    <li id="cerrarSesion"><Link to="/cerrarSesion" >Cerrar sesión</Link></li>
                </ul>
                <label id="fondoMiniMenu" htmlFor="checkboxMenu" />
            </div>
        )
    }
}