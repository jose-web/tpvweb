import React from 'react'
import "./estilos.scss"
import Menu from '../../../componentes/menu'
import BotonAbajo from '../../../componentes/botonAbajo'
// import { ReactComponent as Lapiz } from '../../../comunes/svg/pencil-alt-solid.svg'
// import { ReactComponent as Basura } from '../../../comunes/svg/trash-alt-regular.svg'
import Popup from '../../../componentes/popup'
import Input from "../../../componentes/input"
import Button from "../../../componentes/button"
import { Redirect } from "react-router-dom"
import ScrollContainer from "react-indiana-drag-scroll"

export default class AdministracionLocal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redireccionar: "",
            arrayMenuProductos: "",
            arrayProductos: "",
            nombreCategoria: "",
            abierto: false,
            nombreProducto: "",
            precioProducto: "",
            descripcionProducto: "",
            disponibilidadProducto: "",
            codCategoria: "",
            popup: "",
            nuevoPrecio: "",
            nuevaDisponibilidad: ""
        }

        this.irA = this.irA.bind(this)
        this.cambiaEstadoPopup = this.cambiaEstadoPopup.bind(this)
        this.nuevaCategoria = this.nuevaCategoria.bind(this)
        this.popupNuevaCategoria = this.popupNuevaCategoria.bind(this)
        this.popupNuevoProducto = this.popupNuevoProducto.bind(this)
        this.cambiaEstado = this.cambiaEstado.bind(this)
        this.nuevoProducto = this.nuevoProducto.bind(this)
        this.editaProducto = this.editaProducto.bind(this)
    }

    componentDidMount() {
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
                    menuProductos.push(<li key={categoria + nombre} onClick={() => this.muestraCategoria(id, res.categorias[i].dentroCategoria)}>{nombre}</li>)
                }
                menuProductos.push(<li id="mas" key="mas" onClick={this.popupNuevaCategoria}>+</li>)

                this.setState({ arrayMenuProductos })
                if (typeof res.categorias[0] !== "undefined")
                    this.muestraCategoria(res.categorias[0].codCategoria, res.categorias[0].dentroCategoria)

            })
    }

    popupNuevaCategoria() {
        this.setState({
            popup: <form id="formularioCambiaNombre" onSubmit={this.nuevaCategoria}>
                <strong>Añadir una nueva categoría</strong>
                <Input label="NOMBRE" cambia={($valor) => this.cambiaEstado($valor, "nombreCategoria")} />
                <Button submit value="AÑADIR" />
            </form>
        })
        this.cambiaEstadoPopup()
    }

    popupNuevoProducto() {
        this.setState({
            popup: <form id="formularioCambiaNombre" onSubmit={this.nuevoProducto}>
                <strong>Añadir un nuevo producto</strong>
                <Input label="NOMBRE" cambia={($valor) => this.cambiaEstado($valor, "nombreProducto")} />
                <Input label="PRECIO" cambia={($valor) => this.cambiaEstado($valor, "precioProducto")} />
                <Input label="DESCRIPCIÓN" cambia={($valor) => this.cambiaEstado($valor, "descripcionProducto")} />
                <Input label="DISPONIBILIDAD" cambia={($valor) => this.cambiaEstado($valor, "disponibilidadProducto")} />
                <Button submit value="AÑADIR" />
            </form>
        })

        this.cambiaEstadoPopup()
    }

    popupEditaProducto($idProducto, $nombre, $precio, $disponibilidad) {
        this.setState({
            popup: <form id="formularioCambiaNombre" onSubmit={this.editaProducto}>
                <strong>Editar el producto "{$nombre}"</strong>
                <Input label="PRECIO" cambia={($valor) => this.cambiaEstado($valor, "nuevoPrecio")} value={$precio} />
                <Input label="DISPONIBILIDAD" cambia={($valor) => this.cambiaEstado($valor, "nuevaDisponibilidad")} value={$disponibilidad} />
                <Button submit value="EDITAR" />
            </form>,
            idProducto: $idProducto,
            nuevoPrecio: $precio,
            nuevaDisponibilidad: $disponibilidad
        })
        this.cambiaEstadoPopup()
    }

    cambiaEstado($valor, $nombre) {
        let objaux = {}
        objaux[$nombre] = $valor
        this.setState(
            objaux
        )
    }

    muestraCategoria($codCategoria, $array) {
        let arrayProductos = []

        // arrayProductos.push(<article><strong><p>Añadir una categoría</p><p>+</p></strong></article>)

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

            arrayProductos.push(<article
                className={($array[o].disponibilidad === "0" ? "opacidadAdministraCategoriaProducto " : "") + "administraCategoriaProducto"}
                key={identificador}
                tabIndex="0"
                onClick={() => esCategoria ? this.muestraCategoria($array[o].codCategoria, $array[o].dentroCategoria) : this.popupEditaProducto(identificador, $array[o].nombre, $array[o].precio, $array[o].disponibilidad)}
            >
                <div>
                    {$array[o].disponibilidad === "0" ? <del>{contenido}</del> : contenido}
                </div>
            </article>)
        }

        if (Object.keys($array).length === 0) {
            arrayProductos.push(<article key="sinProductos">
                <div>No hay productos</div>
            </article>)
        }

        this.setState({
            arrayProductos,
            codCategoria: $codCategoria
        })
    }

    editaProducto(evento) {
        evento.preventDefault()

        let url = global.url + 'editaProducto'

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('idLocal', sessionStorage.getItem("idLocal"))
        data.append('idCategoria', this.state.codCategoria)
        data.append('idProducto', this.state.idProducto)
        data.append('precio', this.state.nuevoPrecio)
        data.append('disponibilidad', this.state.nuevaDisponibilidad)

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                this.cambiaEstadoPopup()
                this.componentDidMount()
            })
    }

    irA($sitio) {
        this.setState({
            redireccionar: $sitio
        })
    }

    cambiaEstadoPopup() {

        if (this.state.abierto)
            setTimeout(function () {
                this.setState({ popup: "" })
            }.bind(this), 500)

        this.setState({
            abierto: !this.state.abierto
        })
    }

    nuevaCategoria(evento) {
        evento.preventDefault()

        let url = global.url + 'crearCategoria'

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData();
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('codLocal', sessionStorage.getItem("idLocal"))
        data.append('nombre', this.state.nombreCategoria)
        data.append('padre', null)

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                this.componentDidMount()
                this.cambiaEstadoPopup()
            })
    }

    nuevoProducto(evento) {
        evento.preventDefault()

        let url = global.url + 'crearProducto'

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData();
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('codLocal', sessionStorage.getItem("idLocal"))
        data.append('codCategoria', this.state.codCategoria)
        data.append('nombreProducto', this.state.nombreProducto)
        data.append('precioProducto', this.state.precioProducto)
        data.append('descripcionProducto', this.state.descripcionProducto)
        data.append('disponibilidadProducto', this.state.disponibilidadProducto)

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                this.componentDidMount()
                this.cambiaEstadoPopup()
            })
    }

    render() {
        if (this.state.redireccionar !== "") {
            return <Redirect to={this.state.redireccionar} />
        }

        return (
            <>
                <Popup contenido={this.state.popup} estado={this.state.abierto} cambiaEstadoPopup={this.cambiaEstadoPopup} />
                <Menu estoyEn="administracion" />
                <section id="seccionLocalAdministracion">
                    <h1>{sessionStorage.getItem("nombreLocal")} - Administración de productos</h1>
                    <ScrollContainer className="contenedorMenuProductos">{this.state.arrayMenuProductos}</ScrollContainer>
                    {this.state.arrayProductos}
                </section>
                <BotonAbajo onClick={() => this.irA("/administracion")} />
                <BotonAbajo derecha onClick={this.popupNuevoProducto} />
            </>
        )
    }
}
