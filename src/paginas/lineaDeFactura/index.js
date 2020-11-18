import React from 'react'
import './estilos.scss'
import Menu from '../../componentes/menu'
import Tabla from '../../componentes/tabla'
import BotonAbajo from '../../componentes/botonAbajo'
import Popup from '../../componentes/popup'
import { ReactComponent as IconoPagar } from "./cash-register-solid.svg"
import Input from "../../componentes/input"
import Button from "../../componentes/button"
import { Redirect } from "react-router-dom"
import ScrollContainer from "react-indiana-drag-scroll"

export default class LineaDeFactura extends React.Component {

    constructor(props) {
        super(props);

        let id = sessionStorage.getItem("idFactura")

        if (id == null)
            this.setState({
                redireccionar: true
            })

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('codFactura', id)

        this.state = {
            arrayFacturas: [],
            redireccionar: false,
            data,
            cuentaTotal: 0,
            intervalo: "",
            nombreFactura: "",
            abierto: false,
            mostrarProductos: false,
            facturaContraida: true
        };
        this.repetir = this.repetir.bind(this)
        this.atras = this.atras.bind(this)
        this.cambiaNombre = this.cambiaNombre.bind(this)
        this.cambiaEstadoPopup = this.cambiaEstadoPopup.bind(this)
        this.mostrarProductos = this.mostrarProductos.bind(this)
        this.muestraPopUpPagar = this.muestraPopUpPagar.bind(this)
        this.muestraPopUpCambiaNombre = this.muestraPopUpCambiaNombre.bind(this)
        this.pagar = this.pagar.bind(this)
        this.muestraPopUpCambiaPoducto = this.muestraPopUpCambiaPoducto.bind(this)
        this.muestraPopUpAddProductoFactura = this.muestraPopUpAddProductoFactura.bind(this)
    }

    repetir() {
        let url = global.url + (this.state.facturaContraida ? 'muestraProductosFacturaContraida' : 'muestraProductosFactura')

        let arrayFacturas = []

        fetch(url, {
            method: 'POST',
            body: this.state.data,

        }).then(res => { if (res.ok) return res.json() })
            .catch(error => console.error('Error:', error))
            .then(res => {
                let cuentaTotal = 0
                arrayFacturas.push([["Nombre"], ["Precio"], ["Cantidad"], ["Precio total"], ["Comentario"]])
                if (typeof res !== "undefined")
                    for (let i = 0; i < Object.keys(res.productos).length; i++) {
                        let id = res.productos[i].codLinea
                        let nombre = res.productos[i].nombre
                        let precio = res.productos[i].precio
                        let cantidad = res.productos[i].cantidad
                        let comentario = res.productos[i].comentario
                        cuentaTotal += precio * cantidad
                        arrayFacturas.push([[id], [nombre], [Number(precio).toFixed(2) + " €"], [cantidad], [Number(precio * cantidad).toFixed(2) + " €"], [comentario]])
                    }
                this.setState({
                    arrayFacturas: arrayFacturas.slice(),
                    cuentaTotal: cuentaTotal
                })

            })

    }

    cambiaEstadoPopup() {

        if (this.state.abierto)
            setTimeout(function () {
                this.setState({ popup: "" })
            }.bind(this), 500)

        this.setState({
            abierto: !this.state.abierto,
            precioProducto: "",
            cantidadProducto: "",
            comentarioProducto: ""
        })
    }

    cambiaInputNombreFactura(evento) {
        this.setState({
            nombreFactura: evento
        })

    }

    cambiaNombre(evento) {
        evento.preventDefault()

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData();
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('idFactura', sessionStorage.getItem("idFactura"))
        data.append('nuevoNombreCliente', this.state.nombreFactura)
        data.append('estadoPagado', 0)

        let url = global.url + 'actualizaFactura'

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => { if (res.ok) return res.json() })
            .catch(error => console.error('Error:', error))
            .then(res => {
                if (res.actualizaFactura) {
                    sessionStorage.setItem("nombreFactura", this.state.nombreFactura)
                    this.cambiaEstadoPopup()
                }
            })
    }

    pagar(evento) {
        evento.preventDefault()

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData();
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('idFactura', sessionStorage.getItem("idFactura"))
        data.append('nuevoNombreCliente', sessionStorage.getItem("nombreFactura"))
        data.append('estadoPagado', 1)

        let url = global.url + 'actualizaFactura'

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => { if (res.ok) return res.json() })
            .catch(error => console.error('Error:', error))
            .then(res => {
                if (res.actualizaFactura) {
                    this.setState({
                        redireccionar: true
                    })
                }
            })
    }

    componentDidMount() {

        this.repetir()
        let intervalo = setInterval(this.repetir, 3000)

        let url = global.url + 'muestraProductosLocal'

        fetch(url, {
            method: 'GET',

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {

                sessionStorage.setItem("productosLocal", JSON.stringify(res))

                let menuProductos = []
                let arrayMenuProductos = <ul key="menuProductos" id="menuProductos">{menuProductos}</ul>

                for (let i = 0; i < Object.keys(res.categorias).length; i++) {
                    let id = res.categorias[i].codCategoria
                    let nombre = res.categorias[i].nombre
                    let categoria = res.categorias[i].codCategoria
                    if (Object.keys(res.categorias[i].dentroCategoria).length > 0)
                        menuProductos.push(<li key={categoria + nombre} onClick={() => this.muestraCategoria(id, res.categorias[i].dentroCategoria)}>{nombre}</li>)
                }

                this.setState({ arrayMenuProductos })
                if (typeof res.categorias[0] !== "undefined")
                    this.muestraCategoria(res.categorias[0].codCategoria, res.categorias[0].dentroCategoria)

            })

        this.setState({ intervalo })

    }

    muestraCategoria($codCategoria, $array) {
        let arrayProductos = []

        for (let o = 0; o < Object.keys($array).length; o++) {
            let identificador = ""
            let esCategoria = typeof $array[o].codCategoria !== "undefined"
            if (esCategoria)
                identificador = $array[o].codCategoria
            else
                identificador = $array[o].codProducto

            if ($array[o].disponibilidad !== "0")
                arrayProductos.push(<article
                    className={($array[o].disponibilidad === "0" ? "opacidadAdministraCategoriaProducto " : "") + "administraCategoriaProducto"}
                    key={identificador}
                    tabIndex="0"
                    onClick={() => esCategoria ? this.muestraCategoria($array[o].codCategoria, $array[o].dentroCategoria) : this.muestraPopUpAddProductoFactura($array[o])}
                >
                    <div>
                        <strong>{$array[o].nombre}</strong>
                        {esCategoria ? "" : <>
                            <p>{$array[o].precio} €</p>
                        </>}
                    </div>
                </article>)
        }

        this.setState({
            arrayProductos,
            codCategoria: $codCategoria
        })
    }

    addProductoFactura($array) {
        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData();
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('idFactura', sessionStorage.getItem("idFactura"))
        data.append('idProducto', $array["codProducto"])
        data.append('precio', $array["precio"])
        data.append('cantidad', this.state.cantidadProducto)
        data.append('comentario', "")

        let url = global.url + 'addProductoFactura'

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => { if (res.ok) return res.json() })
            .catch(error => console.error('Error:', error))
            .then(res => {
                if (res.addProductoFactura)
                    this.repetir()
            })
    }

    actualizaProducto(evento, $valor) {
        evento.preventDefault()

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData();
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('idLineaDeFactura', $valor)
        data.append('nuevoPrecio', this.state.precioProducto)
        data.append('nuevaCantidad', this.state.cantidadProducto)
        data.append('nuevoComentario', this.state.comentarioProducto)

        let url = global.url + 'actualizaProductoFactura'

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => { if (res.ok) return res.json() })
            .catch(error => console.error('Error:', error))
            .then(res => {
                if (res.actualizaProductoFactura) {
                    this.repetir()
                    this.cambiaEstadoPopup()
                }
            })
    }

    atras() {
        if (this.state.mostrarProductos)
            this.mostrarProductos()
        else
            this.setState({
                redireccionar: true
            })
    }

    mostrarProductos() {
        this.setState({
            mostrarProductos: !this.state.mostrarProductos
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalo)
    }

    cambiaEstado($valor, $nombre) {
        let objaux = {}
        objaux[$nombre] = $valor
        this.setState(
            objaux
        )
    }
    imprimir() {
        window.print()
    }

    muestraPopUpPagar($valor = null) {
        let resta = this.state.cuentaTotal - $valor
        this.setState({
            popup: <form id="formularioCambiaNombre" onSubmit={this.pagar}>
                <strong>TOTAL A PAGAR</strong>
                <strong>{this.state.cuentaTotal.toFixed(2) + " €"}</strong>
                <p>{(resta > 0 ? "Faltan: " : "Devolver: ") + Math.abs(resta).toFixed(2) + " €"}</p>
                <Input label="DINERO" cambia={($valor) => this.muestraPopUpPagar($valor)} />
                <Button submit value="PAGAR" />
                <button className="boton" onClick={this.imprimir}>IMPRIMIR FACTURA</button>
            </form>
        })
        if ($valor === null)
            this.cambiaEstadoPopup()
    }

    muestraPopUpCambiaNombre() {
        this.setState({
            popup: <form id="formularioCambiaNombre" onSubmit={this.cambiaNombre}>
                <strong>Cambiar el nombre del cliente</strong>
                <Input label="NOMBRE CLIENTE" cambia={($valor) => this.cambiaEstado($valor, "nombreFactura")} value={sessionStorage.getItem("nombreFactura")} />
                <Button submit value="CAMBIAR" />
            </form>
        })
        this.cambiaEstadoPopup()
    }

    muestraPopUpAddProductoFactura($array) {
        this.setState({
            popup: <form id="formularioCambiaNombre" onSubmit={() => this.addProductoFactura($array)}>
                <strong>Cantidad</strong>
                <Input label="CANTIDAD DEL PRODUCTO" cambia={($valor) => this.cambiaEstado($valor, "cantidadProducto")} value={1} />
                <Button submit value="AÑADIR" />
            </form>
        })
        this.cambiaEstadoPopup()
    }

    borraProductoFactura($valor) {
        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData();
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('idLineaDeFactura', $valor)

        let url = global.url + 'borraProductoFactura'

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => { if (res.ok) return res.json() })
            .catch(error => console.error('Error:', error))
            .then(res => {
                if (res.actualizaProductoFactura) {
                    this.repetir()
                    this.cambiaEstadoPopup()
                }
            })
    }

    muestraPopUpCambiaPoducto($valor) {
        let nombre = ""
        let precio = ""
        let cantidad = ""
        let comentario = ""
        for (let i = 1; i < this.state.arrayFacturas.length; i++) {
            if (this.state.arrayFacturas[i][0][0] === $valor[0]) {
                nombre = this.state.arrayFacturas[i][1][0]
                precio = this.state.arrayFacturas[i][2][0]
                cantidad = this.state.arrayFacturas[i][3][0]
                comentario = this.state.arrayFacturas[i][5][0]
            }
        }
        this.setState({
            popup: <form id="formularioCambiaNombre" onSubmit={(evento) => this.actualizaProducto(evento, $valor)}>
                <strong>Actualizar producto: {nombre}</strong>
                <Input label="PRECIO" cambia={($valor) => this.cambiaEstado($valor, "precioProducto")} value={precio.substr(0, precio.length - 2)} />
                <Input label="CANTIDAD" cambia={($valor) => this.cambiaEstado($valor, "cantidadProducto")} value={cantidad} />
                <Input label="COMENTARIO" cambia={($valor) => this.cambiaEstado($valor, "comentarioProducto")} value={comentario === "" ? "Sin comentario" : comentario} />
                <Button submit value="ACTUALIZAR" />
                {sessionStorage.getItem("encargado") > 0 ?
                    <button className="boton" onClick={() => this.borraProductoFactura($valor)}>BORRAR PRODUCTO</button>
                    : ""}
            </form>
        })
        this.cambiaEstadoPopup()
    }

    render() {
        if (this.state.redireccionar)
            return <Redirect to="/facturas" />
        return (
            <>
                <Popup contenido={this.state.popup} estado={this.state.abierto} cambiaEstadoPopup={this.cambiaEstadoPopup} />
                <Menu />
                <section id="seccionLineaDeFactura">
                    <h1><span id="nombreLocalImpresion">{sessionStorage.getItem("nombreLocal")} - </span>Línea de factura</h1>
                    <article id="contieneFactura" className={this.state.mostrarProductos ? "oculto" : ""}>
                        <div id="titulo"><p onClick={this.muestraPopUpCambiaNombre}>{sessionStorage.getItem("nombreFactura")}</p><p onClick={() => this.muestraPopUpPagar()} className="derecha">{this.state.cuentaTotal.toFixed(2) + " €"}</p><IconoPagar onClick={() => this.muestraPopUpPagar()} /></div>
                        <Tabla datos={this.state.arrayFacturas} onClick={($valor) => this.muestraPopUpCambiaPoducto($valor)} />
                    </article>
                    <article id="agregarProductos" className={this.state.mostrarProductos ? "" : "oculto"}>
                        <ScrollContainer className="contenedorMenuProductos">{this.state.arrayMenuProductos}</ScrollContainer>
                        {this.state.arrayProductos}
                    </article>
                </section>
                <BotonAbajo onClick={this.atras} />
                <div id="divBotonOculto" className={this.state.mostrarProductos ? "oculto" : ""}>
                    <BotonAbajo derecha onClick={this.mostrarProductos} />
                </div>
            </>
        )
    }

}
