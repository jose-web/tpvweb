import React from 'react'

import { Redirect } from "react-router-dom"
import Menu from '../../../componentes/menu'
import Popup from '../../../componentes/popup'
import Input from "../../../componentes/input"
import Button from "../../../componentes/button"
import Productos from "../../../componentes/productos"

export default class AdministraProductos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redireccionar: false
        };

        this.cerrarPopup = this.cerrarPopup.bind(this)
        this.mostrarPopupNuevoProducto = this.mostrarPopupNuevoProducto.bind(this)
        this.mostrarPopupEditarProducto = this.mostrarPopupEditarProducto.bind(this)

    }

    componentDidMount() {
        this.mostrarProductos()
    }

    mostrarProductos() {
        this.setState({
            productos: ""
        })

        this.setState({
            productos: <Productos
                izquierdo={this.mostrarPopupEditarProducto}
                nuevo={this.mostrarPopupNuevoProducto}
            />
        })
    }

    cerrarPopup() {
        this.setState({
            popup: ""
        })
    }

    mostrarPopupNuevoProducto(grupo) {
        let contenido = <form onSubmit={(event) => this.nuevoProducto(event)} encType="multipart/form-data">
            <p className="titulo">AÑADIR PRODUCTO</p>
            <Input nombre="IMAGEN" file/>
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
        let img = event.target.inputIMAGEN.files[0]
        let grupo = event.target.inputGRUPO.value
        

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);
        data.append('nombre', nombre);
        data.append('precio', precio);
        data.append('img', img);
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

    mostrarPopupEditarProducto(nombre, precio, cantidad, codProducto, grupo) {
        let contenido = <form onSubmit={(event) => this.editarProducto(event, codProducto)}>
            <p className="titulo">EDITAR PRODUCTO</p>
            <Input nombre="IMAGEN" file/>
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
        let img = event.target.inputIMAGEN.files[0]
        let grupo = event.target.inputGRUPO.value

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);
        data.append('codProducto', codProducto);
        data.append('nombre', nombre);
        data.append('precio', precio);
        data.append('img', img);
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
                {this.state.productos}
                {this.state.popup}
            </div>
        )
    }

}