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
            redireccionar: false,
            data: ""
        };
        this.repetir = this.repetir.bind(this)
    }

    repetir() {
        let url = global.url + 'muestraFacturasLocal'

        let arrayFacturas = []

        fetch(url, {
            method: 'POST',
            body: this.state.data,

        }).then(res => res.json())
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
                this.setState({
                    arrayFacturas: arrayFacturas.slice()
                })

            })

    }

    componentDidMount() {
        let id = sessionStorage.getItem("idFactura")

        if (id == null)
            this.setState({
                redireccionar: true
            })

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('id', id)

        this.setState({ data: data })

    }

    render() {
        this.repetir()
        let intervalo = setInterval(this.repetir, 2000)

        if (this.state.redireccionar) {
            clearInterval(intervalo)
            return <Redirect to="/locales" />
        }

        return (
            <>
                <Menu />
                <section id="seccionFacturas">
                    <h1>Facturas</h1>
                    <Tabla datos={this.state.arrayFacturas} link="/lineaDeFactura"/>
                </section>
            </>
        )
    }

}
