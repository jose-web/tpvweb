import React from 'react'
import './estilos.css'
import Menu from '../../componentes/menu'
import Tabla from '../../componentes/tabla'
import { Redirect } from "react-router-dom"

export default class Facturas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayFacturas: [],
            redireccionar: "",
            data: "",
            intervalo: ""
        };
        this.repetir = this.repetir.bind(this)
        this.irLineaDeFactura = this.irLineaDeFactura.bind(this)
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

                arrayFacturas.push([["Cliente"], ["Cuenta total"]])

                if (typeof res !== "undefined")
                    for (let i = 0; i < Object.keys(res.facturas).length; i++) {

                        let id = res.facturas[i].id
                        let nombre = res.facturas[i].nombre
                        let cuentaTotal = res.facturas[i].cuentaTotal

                        arrayFacturas.push([[id], [nombre], [cuentaTotal]])
                    }
                sessionStorage.setItem("arrayFacturas", JSON.stringify(arrayFacturas))
                this.setState({
                    arrayFacturas: arrayFacturas.slice()
                })

            })

    }

    componentDidMount() {
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

        this.setState({ data })

        this.repetir()
        let intervalo = setInterval(this.repetir, 100)

        this.setState({ intervalo })

    }

    irLineaDeFactura($id) {
        console.log($id)
        sessionStorage.setItem("idFactura", $id)
        this.setState({
            redireccionar: "/lineaDeFactura"
        })
    }

    render() {

        if (this.state.redireccionar !== "") {
            clearInterval(this.state.intervalo)
            return <Redirect to={this.state.redireccionar} />
        }

        return (
            <>
                <Menu />
                <section id="seccionFacturas">
                    <h1>Facturas</h1>
                    <Tabla datos={this.state.arrayFacturas} onClick={this.irLineaDeFactura} />
                </section>
            </>
        )
    }

}
