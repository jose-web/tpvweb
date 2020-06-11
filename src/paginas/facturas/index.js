import React from 'react'
import './estilos.scss'
import Menu from '../../componentes/menu'
import Tabla from '../../componentes/tabla'
import BotonAbajo from '../../componentes/botonAbajo'
import { Redirect } from "react-router-dom"

export default class Facturas extends React.Component {

    constructor(props) {
        super(props);

        let id = sessionStorage.getItem("idLocal")

        if (id == null)
            this.setState({
                redireccionar: "/locales"
            })

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('id', id)

        this.state = {
            arrayFacturas: [],
            redireccionar: "",
            data,
            intervalo: ""
        };
        this.repetir = this.repetir.bind(this)
        this.irLineaDeFactura = this.irLineaDeFactura.bind(this)
        this.atras = this.atras.bind(this)
        this.creaFacturaBarra = this.creaFacturaBarra.bind(this)
    }

    repetir() {
        let url = global.url + 'muestraFacturasLocal'

        let arrayFacturas = []

        fetch(url, {
            method: 'POST',
            body: this.state.data,

        }).then(res => { if (res.ok) return res.json() })
            .catch(error => console.error('Error:', error))
            .then(res => {

                arrayFacturas.push([["Fecha"], ["Cliente"], ["Cuenta total"]])

                if (typeof res !== "undefined")
                    for (let i = 0; i < Object.keys(res.facturas).length; i++) {

                        let id = res.facturas[i].id
                        let fecha = res.facturas[i].fecha
                        let nombre = res.facturas[i].nombre
                        let cuentaTotal = res.facturas[i].cuentaTotal

                        arrayFacturas.push([[id], [fecha], [nombre], [cuentaTotal]+" €"])
                    }
                this.setState({
                    arrayFacturas: arrayFacturas.slice()
                })

            })

    }

    componentDidMount() {

        this.repetir()
        let intervalo = setInterval(this.repetir, 3000)

        this.setState({ intervalo })

    }

    irLineaDeFactura($id) {
        sessionStorage.setItem("idFactura", $id)
        this.setState({
            redireccionar: "/lineaDeFactura"
        })
    }

    guardaNombre($nombre) {
        sessionStorage.setItem("nombreFactura", $nombre)
    }

    atras() {
        this.setState({
            redireccionar: "/locales"
        })
    }

    creaFacturaBarra() {
        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData();
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('codLocal', sessionStorage.getItem("idLocal"))

        let url = global.url + 'creaFacturaBarra'

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => { if (res.ok) return res.json() })
            .catch(error => console.error('Error:', error))
            .then(res => {
                if (res.creaFacturaBarra) {
                    this.guardaNombre("Cliente sin nombre")
                    this.irLineaDeFactura(res.codFactura)
                }
            })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalo)
    }

    render() {
        if (this.state.redireccionar !== "") {
            return <Redirect to={this.state.redireccionar} />
        }

        let camarero = sessionStorage.getItem("camarero")
        let encargado = sessionStorage.getItem("encargado")
        let cocinero = sessionStorage.getItem("cocinero")
        let sumaLocales = Number(camarero) + Number(encargado) + Number(cocinero)

        return (
            <>
                <Menu />
                <section id="seccionFacturas">
                    <h1>Facturas</h1>
                    <Tabla datos={this.state.arrayFacturas} onClick={this.irLineaDeFactura} guardaNombre={this.guardaNombre} />
                </section>
                {sumaLocales === 1 ? "" : <BotonAbajo onClick={this.atras} />}
                <BotonAbajo derecha onClick={this.creaFacturaBarra} />
            </>
        )
    }

}
