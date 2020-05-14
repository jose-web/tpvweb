import React from 'react'
import './estilos.css'
import Menu from '../../componentes/menu'
import Tabla from '../../componentes/tabla'
// import { Redirect } from "react-router-dom"

export default class LineaDeFactura extends React.Component {

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
        let url = global.url + 'muestraProductosFactura'

        let arrayFacturas = []

        fetch(url, {
            method: 'POST',
            body: this.state.data,

        }).then(res => { if (res.ok) return res.json() })
            .catch(error => console.error('Error:', error))
            .then(res => {
                console.log(res)
                arrayFacturas.push([["Nombre"], ["Precio"], ["Cantidad"], ["Precio total"], ["Comentario"]])
                if (typeof res !== "undefined")
                    for (let i = 0; i < Object.keys(res.productos).length; i++) {
                        let id = res.productos[i].codLinea
                        let nombre = res.productos[i].nombre
                        let precio = res.productos[i].precio
                        let cantidad = res.productos[i].cantidad
                        let comentario = res.productos[i].comentario

                        arrayFacturas.push([[id], [nombre], [precio], [cantidad], [precio * cantidad], [comentario]])
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
        data.append('codFactura', id)

        this.setState({ data })

        this.repetir()
        let intervalo = setInterval(this.repetir, 2000)

        this.setState({ intervalo })

    }

    render() {

        return (
            <>
                <Menu />
                <section id="seccionLineaDeFactura">
                    <h1>Linea de factura</h1>
                    <Tabla datos={this.state.arrayFacturas} />
                </section>
            </>
        )
    }

}
