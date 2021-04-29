import React from 'react'
import './estilos.scss'
import { Redirect } from "react-router-dom"
import Menu from '../../componentes/menu'
import Popup from '../../componentes/popup'
import Input from '../../componentes/input'
import Button from '../../componentes/button'
import Productos from '../../componentes/productos'

export default class LineaDeFactura extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            codFactura: props.match.params.codFactura === undefined ? -1 : props.match.params.codFactura,
            simplificada: true
        };
        this.mostrarFactura = this.mostrarFactura.bind(this)
        this.insertarProductoEnFactura = this.insertarProductoEnFactura.bind(this)
        this.mostrarPopupInsertarProducto = this.mostrarPopupInsertarProducto.bind(this)
        this.cerrarPopup = this.cerrarPopup.bind(this)
        this.formulario = this.formulario.bind(this)
        this.editarNombreFactura = this.editarNombreFactura.bind(this)
        this.mostrarPopupEditaNombreFactura = this.mostrarPopupEditaNombreFactura.bind(this)
        this.mostrarPopupPagar = this.mostrarPopupPagar.bind(this)
        this.pagar = this.pagar.bind(this)
        this.ocultarFactura = this.ocultarFactura.bind(this)

    }

    componentDidMount() {
        this.mostrarFactura()
    }

    mostrarFactura() {
        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let url = global.url + 'mostrarFactura' + (this.state.simplificada ? "Simplificada" : "");

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
                let arrayLineaDeFactura = [<div className="producto titulo" key="-1" onClick={() => this.facturaSimplificada()}><p>NOMBRE</p><p title="PRECIO UNITARIO">PRECIO UNITARIO</p><p>CANTIDAD</p><p>PRECIO</p></div>]
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
                                this.insertarProductoEnFactura(nombreProducto, precio, 1)
                            }}
                        >
                            <p>{nombreProducto}</p>
                            <p>{precio + " €"}</p>
                            <p>{cantidad}</p>
                            <p>{pxc + " €"}</p>
                        </div>)
                    }
                this.setState({
                    arrayLineaDeFactura: arrayLineaDeFactura.slice(),
                    nombreFactura: res.nombreFactura,
                    total: total.toFixed(2) + " €"
                })
            });
    }

    facturaSimplificada() {
        this.setState(
            { simplificada: !this.state.simplificada },
            () => this.mostrarFactura())
    }

    insertarProductoEnFactura(nombre, precio, cantidad) {
        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let url = global.url + 'insertarProductoEnFactura';

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);
        data.append('codFactura', this.state.codFactura);
        data.append('nombre', nombre);
        data.append('precio', precio);
        data.append('cantidad', cantidad);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                if (Number(this.state.codFactura) < 0) {
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
            <Button nombre="AÑADIR" submit />
        </form>
        this.setState({
            popup: <Popup contenido={contenido} cerrar={this.cerrarPopup} />
        })
    }

    mostrarPopupEditaNombreFactura() {
        let contenido = <p className="titulo">PARA EDITAR EL NOMBRE DE LA FACTURA <br /> AÑADE UN PRODUCTO PRIMERO</p>

        if (Number(this.state.codFactura) > 0)
            contenido = <form onSubmit={this.editarNombreFactura}>
                <p className="titulo">EDITAR FACTURA</p>
                <Input nombre="NOMBRE" value={this.state.nombreFactura} focus={true} />
                <Button nombre="AÑADIR" submit />
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

        this.insertarProductoEnFactura(nombre, precio, cantidad)
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

    ocultarFactura(event) {
        event.preventDefault()

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let url = global.url + 'ocultarFactura';

        let codFactura = this.state.codFactura

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);
        data.append('codFactura', codFactura);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                this.setState({ redireccionar: true })
            });
    }

    mostrarPopupPagar() {
        let contenido = <p className="titulo">PARA PAGAR LA FACTURA <br /> AÑADE UN PRODUCTO PRIMERO</p>

        if (Number(this.state.codFactura) > 0)
            contenido = <form onSubmit={this.pagar}>
                <Button nombre="CERRAR FACTURA" onClick={this.ocultarFactura} />
                <p className="titulo">A PAGAR: {this.state.total}</p>
                <Input nombre="DINERO" focus={true} />
                <Button nombre="PAGAR" submit />
            </form>

        this.setState({
            popup: <Popup contenido={contenido} cerrar={this.cerrarPopup} />
        })
    }

    pagar(event) {
        event.preventDefault()

        let dinero = event.target.inputDINERO.value

        this.insertarProductoEnFactura("PAGO", "-" + dinero, 1)
        this.cerrarPopup()
    }

    render() {
        if (this.state.redireccionar)
            return <Redirect to="/facturas" />
        return (
            <div id="lineaDeFactura" >
                <Menu />
                <h2 onClick={this.mostrarPopupEditaNombreFactura}>{this.state.nombreFactura}</h2>
                <div id="facturaProductos">
                    <div id="factura">{this.state.arrayLineaDeFactura}</div>
                    <Productos
                        izquierdo={this.mostrarPopupInsertarProducto}
                        derecho={this.insertarProductoEnFactura}
                    />
                </div>
                <div id="total" onClick={this.mostrarPopupPagar}>TOTAL: {this.state.total}</div>
                {this.state.popup}
            </div>
        )
    }
}