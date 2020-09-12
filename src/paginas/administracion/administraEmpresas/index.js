import React from 'react'
import Menu from '../../../componentes/menu'
import Popup from '../../../componentes/popup'
import Input from "../../../componentes/input"
import Button from "../../../componentes/button"

export default class Empresas extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            abierto: false
        }
        this.creaEmpresa = this.creaEmpresa.bind(this)
        this.popupCreaEmpresa = this.popupCreaEmpresa.bind(this)
        this.cambiaEstadoPopup = this.cambiaEstadoPopup.bind(this)
    }

    componentDidMount() {
        let url = global.url + 'muestraMisEmpresas'

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                let arrayEmpresas = []
                for (let i = 0; i < Object.keys(res.empresas).length; i++) {
                    let empresa = res.empresas[i]
                    arrayEmpresas.push(
                        <article key={empresa.codEmpresa}>
                            <p>{empresa.nombre}</p>
                            <p>{empresa.nif}</p>
                        </article>
                    )
                }
                this.setState({ arrayEmpresas })
            })
    }

    cambiaEstado($valor, $nombre) {
        let objaux = {}
        objaux[$nombre] = $valor
        this.setState(
            objaux
        )
    }

    cambiaEstadoPopup() {

        if (this.state.abierto)
            setTimeout(function () {
                this.setState({ popup: "" })
            }.bind(this), 500)

        this.setState({
            abierto: !this.state.abierto,
            disponibilidadProducto: false
        })
    }

    popupCreaEmpresa() {
        this.setState({
            popup: <form id="formularioCambiaNombre" onSubmit={this.creaEmpresa}>
                <strong>Nueva empresa</strong>
                <Input label="NOMBRE" cambia={($valor) => this.cambiaEstado($valor, "nuevaEmpresa")} />
                <Button submit value="CREAR" />
            </form>
        })
        this.cambiaEstadoPopup()
    }

    creaEmpresa(evento) {
        evento.preventDefault()

        let url = global.url + 'creaUnaEmpresa'

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('nombre', this.state.nuevaEmpresa)

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


    render() {
        return (
            <>
                <Popup contenido={this.state.popup} estado={this.state.abierto} cambiaEstadoPopup={this.cambiaEstadoPopup} />
                <Menu />
                <section id="locales">
                    <h1>Empresas</h1>
                    <article onClick={this.popupCreaEmpresa}>
                        <p>Crear una empresa</p>
                    </article>
                    {this.state.arrayEmpresas}
                </section>
            </>
        )
    }
}