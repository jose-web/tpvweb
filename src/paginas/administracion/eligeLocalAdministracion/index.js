import React from 'react'
import './estilos.css'
import Menu from '../../../componentes/menu'
import BotonAbajo from '../../../componentes/botonAbajo'
import { Redirect } from "react-router-dom"

export default class EligeLocalAdministracion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayFacturas: [],
            redireccionar: ""
        };
        this.irAAdministrarLocal = this.irAAdministrarLocal.bind(this)
        this.atras = this.atras.bind(this)
    }

    componentDidMount() {
        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)

        let url = global.url + 'muestraLocalesEncargado'

        let arrayFacturas = []

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => { if (res.ok) return res.json() })
            .catch(error => console.error('Error:', error))
            .then(res => {

                if (typeof res !== "undefined") {
                    let numeroLocales = Object.keys(res.locales).length
                    if (numeroLocales > 1) {
                        for (let i = 0; i < numeroLocales; i++) {

                            let id = res.locales[i].id
                            let nombreEmpresa = res.locales[i].nombreEmpresa
                            let nombreLocal = res.locales[i].nombreLocal
                            let direccion = res.locales[i].direccion

                            arrayFacturas.push(<article key={id} tabIndex="0" onClick={() => this.irAAdministrarLocal(id, nombreLocal)}>
                                <strong>{nombreEmpresa}</strong>
                                <p>{nombreLocal}</p>
                                <p>{direccion}</p>
                            </article>)
                        }
                        this.setState({
                            arrayFacturas: arrayFacturas.slice()
                        })
                    } else {
                        sessionStorage.setItem("irAtras", "atras")
                        let id = res.locales[0].id
                        let nombreLocal = res.locales[0].nombreLocal
                        this.irAAdministrarLocal(id, nombreLocal)
                    }
                }
            })
    }

    irAAdministrarLocal($id, $nombre) {
        sessionStorage.setItem("idLocal", $id)
        sessionStorage.setItem("nombreLocal", $nombre)
        this.setState({
            redireccionar: "/administracion"
        })
    }

    atras() {
        this.setState({
            redireccionar: "/locales"
        })
    }

    render() {
        if (this.state.redireccionar !== "") {
            return <Redirect to={this.state.redireccionar} />
        }

        return (
            <>
                <Menu estoyEn="administracion" />
                <section id="seccionLocalAdministracion">
                    <h1>Locales que puedes administrar</h1>
                    {this.state.arrayFacturas}
                </section>
                <BotonAbajo onClick={this.atras} />
            </>
        )
    }
}
