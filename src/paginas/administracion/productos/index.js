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
        this.mostrarPopupNuevoProducto = this.mostrarPopupNuevoProducto.bind(this)

    }

    componentDidMount() {
        this.mostrarProductos()
    }

    mostrarProductos() {
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
                        let opcionesproductos = [<div key="-1" className="producto" onClick={() => this.mostrarPopupNuevoProducto(grupo)}>+</div>
                        ]
                        for (const producto in res.productos[grupo]) {
                            let nombre = res.productos[grupo][producto].nombre
                            let precio = res.productos[grupo][producto].precio
                            let codProducto = res.productos[grupo][producto].codProducto

                            opcionesproductos.push(<div
                                key={producto}
                                className="producto"
                                onClick={() => this.mostrarPopupEditarProducto(codProducto, nombre, precio, grupo)}
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

    cerrarPopup() {
        this.setState({
            popup: ""
        })
    }

    mostrarPopupNuevoProducto(grupo) {
        let contenido = <form onSubmit={(event) => this.nuevoProducto(event)}>
            <p className="titulo">AÑADIR PRODUCTO</p>
            <Input nombre="NOMBRE" focus />
            <Input nombre="PRECIO" />
            <Input nombre="GRUPO" value={grupo} />
            <Button nombre="AÑADIR" submit />
        </form>
        this.setState({
            popup: <Popup contenido={contenido} cerrar={this.cerrarPopup} />
        })
    }

    nuevoProducto(event) {
        event.preventDefault()

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let url = global.url + 'nuevoProducto';

        let nombre = event.target.inputNOMBRE.value
        let precio = event.target.inputPRECIO.value
        let grupo = event.target.inputGRUPO.value

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);
        data.append('nombre', nombre);
        data.append('precio', precio);
        data.append('grupo', grupo);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                this.mostrarProductos()
                this.cerrarPopup()
            });
    }

    mostrarPopupEditarProducto(codProducto, nombre, precio, grupo) {
        let contenido = <form onSubmit={(event) => this.editarProducto(event, codProducto)}>
            <p className="titulo">EDITAR PRODUCTO</p>
            <Input nombre="NOMBRE" value={nombre} />
            <Input nombre="PRECIO" value={precio} focus />
            <Input nombre="GRUPO" value={grupo} />
            <Button nombre="EDITAR" submit />
        </form>
        this.setState({
            popup: <Popup contenido={contenido} cerrar={this.cerrarPopup} />
        })
    }

    editarProducto(event, codProducto) {
        event.preventDefault()

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let url = global.url + 'editarProducto';

        let nombre = event.target.inputNOMBRE.value
        let precio = event.target.inputPRECIO.value
        let grupo = event.target.inputGRUPO.value

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);
        data.append('codProducto', codProducto);
        data.append('nombre', nombre);
        data.append('precio', precio);
        data.append('grupo', grupo);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                this.mostrarProductos()
                this.cerrarPopup()
            });
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