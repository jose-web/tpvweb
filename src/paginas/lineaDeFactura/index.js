import React from 'react'
import './estilos.scss'
import { Redirect } from "react-router-dom"
import Menu from '../../componentes/menu'
import Popup from '../../componentes/popup'
import Input from '../../componentes/input'
import Button from '../../componentes/button'

export default class LineaDeFactura extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            codFactura: props.match.params.codFactura === undefined ? -1 : props.match.params.codFactura
        };
        this.mostrarFactura = this.mostrarFactura.bind(this)
        this.insertarProductoEnFactura = this.insertarProductoEnFactura.bind(this)
        this.mostrarPopupInsertarProducto = this.mostrarPopupInsertarProducto.bind(this)
        this.cerrarPopup = this.cerrarPopup.bind(this)
        this.formulario = this.formulario.bind(this)
        this.editarNombreFactura = this.editarNombreFactura.bind(this)
    }

    componentDidMount() {
        this.mostrarFactura()

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
                                className="producto" onClick={() => this.mostrarPopupInsertarProducto(nombre, precio, 1)}
                                onContextMenu={(event) => {
                                    event.preventDefault();
                                    this.insertarProductoEnFactura(this.state.codFactura, nombre, precio, 1)
                                }}
                            >
                                <p>{nombre}</p>
                                <p>{precio + " €"}</p>
                            </div>)
                        }
                        arrayProductos.push(<div key={grupo + "pie"} className="contenedorProductos">
                            {opcionesproductos}
                        </div>)

                    }

                this.setState({
                    productos: arrayProductos.slice()
                })
            });
    }

    mostrarFactura() {
        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let url = global.url + 'mostrarFactura';

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
                let arrayLineaDeFactura = [<div className="producto titulo" key="-1"><p>NOMBRE</p><p title="PRECIO UNITARIO">PRECIO UNITARIO</p><p>CANTIDAD</p><p>PRECIO</p></div>]
                let total = 0
                if (typeof res !== "undefined")
                    for (let i = 0; i < Object.keys(res.factura).length; i++) {

                        let nombreProducto = res.factura[i].nombreProducto
                        let fecha = new Date(res.factura[i].fecha)
                        let precio = res.factura[i].precio
                        let cantidad = res.factura[i].cantidad
                        let pxc = Number(precio * cantidad).toFixed(2)

                        total += Number(precio * cantidad)

                        arrayLineaDeFactura.push(<div
                            key={i}
                            className="producto"
                            title={fecha.toLocaleString()}
                            onClick={() => this.mostrarPopupInsertarProducto(nombreProducto, precio, cantidad)}
                            onContextMenu={(event) => {
                                event.preventDefault();
                                this.insertarProductoEnFactura(this.state.codFactura, nombreProducto, precio, 1)
                            }}
                        >
                            <p>{nombreProducto}</p>
                            <p>{precio + " €"}</p>
                            <p>{cantidad}</p>
                            <p>{pxc + " €"}</p>
                        </div>)
                    }
                arrayLineaDeFactura.push(<div key="-2" className="producto pie">
                    <p>TOTAL</p>
                    <p>{total.toFixed(2) + " €"}</p>
                </div>)
                this.setState({
                    arrayLineaDeFactura: arrayLineaDeFactura.slice(),
                    nombreFactura: res.nombreFactura
                })
            });
    }

    insertarProductoEnFactura(codFactura, nombre, precio, cantidad) {
        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let url = global.url + 'insertarProductoEnFactura';

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);
        data.append('codFactura', codFactura);
        data.append('nombre', nombre);
        data.append('precio', precio);
        data.append('cantidad', cantidad);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                if (Number(codFactura) < 0) {
                    this.setState({ codFactura: res.respuesta })
                }
                this.mostrarFactura()
            });
    }

    mostrarPopupInsertarProducto(nombre, precio, cantidad) {
        let contenido = <form onSubmit={this.formulario}>
            <p className="titulo">AÑADIR PRODUCTO</p>
            <Input nombre="NOMBRE" value={nombre} />
            <Input nombre="PRECIO" value={precio} />
            <Input nombre="CANTIDAD" value={cantidad} focus={true} />
            <Button nombre="AÑADIR" />
        </form>
        this.setState({
            popup: <Popup contenido={contenido} cerrar={this.cerrarPopup} />
        })
    }

    mostrarPopupEditaNombreFactura(nombre) {
        let contenido = <p className="titulo">PARA EDITAR EL NOMBRE DE LA FACTURA <br /> AÑADE UN PRODUCTO PRIMERO</p>

        if (Number(this.state.codFactura) > 0)
            contenido = <form onSubmit={this.editarNombreFactura}>
                <p className="titulo">EDITAR FACTURA</p>
                <Input nombre="NOMBRE" value={nombre} focus={true} />
                <Button nombre="AÑADIR" />
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

    formulario(event) {
        event.preventDefault()

        let nombre = event.target.inputNOMBRE.value
        let precio = event.target.inputPRECIO.value
        let cantidad = event.target.inputCANTIDAD.value

        this.insertarProductoEnFactura(this.state.codFactura, nombre, precio, cantidad)
        this.cerrarPopup()
    }

    editarNombreFactura(event) {
        event.preventDefault()

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let url = global.url + 'editarNombreFactura';

        let codFactura = this.state.codFactura
        let nombre = event.target.inputNOMBRE.value

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);
        data.append('codFactura', codFactura);
        data.append('nombre', nombre);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                this.mostrarFactura()
                this.cerrarPopup()
            });
    }

    render() {
        if (this.state.redireccionar)
            return <Redirect to="/facturas" />
        return (
            <div id="lineaDeFactura" >
                <Menu />
                <h2 onClick={() => this.mostrarPopupEditaNombreFactura(this.state.nombreFactura)}>{this.state.nombreFactura}</h2>
                <div id="factura">{this.state.arrayLineaDeFactura}</div>
                <div id="productos">{this.state.productos}</div>
                {this.state.popup}
            </div>
        )
    }
}