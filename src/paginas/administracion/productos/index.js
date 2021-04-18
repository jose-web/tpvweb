import React from 'react'
import './estilos.scss'

import { Redirect } from "react-router-dom"
import Menu from '../../../componentes/menu'
import Popup from '../../../componentes/popup'
import Input from "../../../componentes/input"
import Button from "../../../componentes/button"

export default class AdministraProductos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redireccionar: false
        };

        this.cerrarPopup = this.cerrarPopup.bind(this)

    }

    componentDidMount() {
        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let url = global.url + 'mostrarProductos';

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);
        data.append('codFactura', this.state.codFactura);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                let arrayProductos = []
                if (typeof res !== "undefined")
                    for (const grupo in res.productos) {
                        arrayProductos.push(<React.Fragment key={"opcion" + grupo}><input type="radio" name="productos" id={"opcion" + grupo} defaultChecked={arrayProductos.length === 0} /> <label htmlFor={"opcion" + grupo}>{grupo}</label></React.Fragment>)
                        let opcionesproductos = []
                        for (const producto in res.productos[grupo]) {
                            let nombre = res.productos[grupo][producto].nombre
                            let precio = res.productos[grupo][producto].precio

                            opcionesproductos.push(<div
                                key={producto}
                                className="producto" onClick={() => this.mostrarPopupEditarProducto(nombre, precio)}
                            >
                                <p>{nombre}</p>
                                <p>{precio + " €"}</p>
                            </div>)
                        }
                        arrayProductos.push(<div key={grupo + "pie"} className="opcionElegida">
                            <div className="contenedorProductos">
                                {opcionesproductos}
                            </div>
                        </div>)

                    }

                this.setState({
                    productos: arrayProductos.slice()
                })
            });
    }

    mostrarPopupEditarProducto(nombre, precio) {
        let contenido = <form onSubmit={this.formulario}>
            <p className="titulo">EDITAR PRODUCTO</p>
            <Input nombre="NOMBRE" value={nombre} />
            <Input nombre="PRECIO" value={precio} focus/>
            <Button nombre="EDITAR" submit />
        </form>
        this.setState({
            popup: <Popup contenido={contenido} cerrar={this.cerrarPopup} />
        })
    }

    cerrarPopup() {
        this.setState({
            popup: ""
        })
    }

    render() {
        if (this.state.redireccionar)
            return <Redirect to="/facturas" />

        return (
            <div id="administraProductos" >
                <Menu pagina="administraProductos" />
                <div id="productos">{this.state.productos}</div>
                {this.state.popup}
            </div>
        )
    }

}