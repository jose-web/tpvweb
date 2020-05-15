import React from 'react'
import './estilos.css'
import Menu from '../../componentes/menu'
import Tabla from '../../componentes/tabla'
import BotonAbajo from '../../componentes/botonAbajo'
import iconoPagar from "./cash-register-solid.svg"
import { Redirect } from "react-router-dom"

export default class LineaDeFactura extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayFacturas: [],
            redireccionar: false,
            data: "",
            nombreCliente: "",
            cuentaTotal: 0,
            intervalo: ""
        };
        this.repetir = this.repetir.bind(this)
        this.atras = this.atras.bind(this)
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

    componentDidMount() {
        let id = sessionStorage.getItem("idFactura")

        if (id == null)
            this.setState({
                redireccionar: true
            })

        let arrayFacturas = JSON.parse(sessionStorage.getItem("arrayFacturas"))
        for (let i = 1; i < arrayFacturas.length; i++) {
            if (Number(arrayFacturas[i][0]) === Number(id)) {
                this.setState({ nombreCliente: arrayFacturas[i][1] })
                break;
            }
        }

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('codFactura', id)

        this.setState({ data })

        let intervalo = setInterval(this.repetir, 1000)

        this.setState({ intervalo })

    }

    atras() {
        clearInterval(this.state.intervalo)
        this.setState({
            redireccionar: true
        })
    }

    render() {
        if (this.state.redireccionar)
            return <Redirect to="/facturas" />
        return (
            <>
                <Menu />
                <section id="seccionLineaDeFactura">
                    <h1>Línea de factura</h1>
                    <div id="titulo"><p>{this.state.nombreCliente}</p><p className="derecha">{this.state.cuentaTotal.toFixed(2) + " €"}</p><img src={iconoPagar} alt="Pagar" /></div>
                    <Tabla datos={this.state.arrayFacturas} />
                </section>
                <BotonAbajo onClick={this.atras} />
                <BotonAbajo derecha />
            </>
        )
    }

}
