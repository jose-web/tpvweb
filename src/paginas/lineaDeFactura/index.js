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
            mostrarProductos: false
        };
        this.repetir = this.repetir.bind(this)
        this.atras = this.atras.bind(this)
        this.cambiaInputNombreFactura = this.cambiaInputNombreFactura.bind(this)
        this.cambiaNombre = this.cambiaNombre.bind(this)
        this.cambiaEstadoPopup = this.cambiaEstadoPopup.bind(this)
        this.mostrarProductos = this.mostrarProductos.bind(this)
    }

    repetir() {
        let url = global.url + 'muestraProductosFactura'

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
        this.setState({
            abierto: !this.state.abierto
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

    componentDidMount() {

        this.repetir()
        let intervalo = setInterval(this.repetir, 3000)

        let url = global.url + 'muestraProductosLocal/' + sessionStorage.getItem("idLocal")

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

            let contenido = <>
                <strong>{$array[o].nombre}</strong>
                {esCategoria ? "" : <>
                    <p>{$array[o].precio} €</p>
                </>}
            </>

            if ($array[o].disponibilidad !== "0")
                arrayProductos.push(<article
                    className={($array[o].disponibilidad === "0" ? "opacidadAdministraCategoriaProducto " : "") + "administraCategoriaProducto"}
                    key={identificador}
                    tabIndex="0"
                    onClick={() => esCategoria ? this.muestraCategoria($array[o].codCategoria, $array[o].dentroCategoria) : ""}
                >
                    <div>
                        {contenido}
                    </div>
                </article>)
        }

        this.setState({
            arrayProductos,
            codCategoria: $codCategoria
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

    render() {
        if (this.state.redireccionar)
            return <Redirect to="/facturas" />

        let popup = <form id="formularioCambiaNombre" onSubmit={this.cambiaNombre}>
            <strong>Cambiar el nombre del cliente</strong>
            <Input label="NOMBRE CLIENTE" cambia={this.cambiaInputNombreFactura} value={sessionStorage.getItem("nombreFactura")} />
            <Button submit value="CAMBIAR" />
        </form>

        return (
            <>
                <Popup contenido={popup} estado={this.state.abierto} cambiaEstadoPopup={this.cambiaEstadoPopup} />
                <Menu />
                <section id="seccionLineaDeFactura">
                    <h1>Línea de factura</h1>
                    <article id="contieneFactura" className={this.state.mostrarProductos ? "oculto" : ""}>
                        <div id="titulo"><p onClick={this.cambiaEstadoPopup}>{sessionStorage.getItem("nombreFactura")}</p><p className="derecha">{this.state.cuentaTotal.toFixed(2) + " €"}</p><IconoPagar /></div>
                        <Tabla datos={this.state.arrayFacturas} />
                    </article>
                    <article id="agregarProductos" className={this.state.mostrarProductos ? "" : "oculto"}>
                        <ScrollContainer className="contenedorMenuProductos">{this.state.arrayMenuProductos}</ScrollContainer>
                        {this.state.arrayProductos}
                    </article>
                </section>
                <BotonAbajo onClick={this.atras} />
                <div className={this.state.mostrarProductos ? "oculto" : ""}>
                    <BotonAbajo derecha onClick={this.mostrarProductos} />
                </div>
            </>
        )
    }

}
