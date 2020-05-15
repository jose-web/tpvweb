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

                if (typeof res !== "undefined")
                    for (let i = 0; i < Object.keys(res.locales).length; i++) {

                        let id = res.locales[i].id
                        let nombreEmpresa = res.locales[i].nombreEmpresa
                        let nombreLocal = res.locales[i].nombreLocal
                        let direccion = res.locales[i].direccion

                        arrayFacturas.push(<article key={id} tabIndex="0" onClick={() => this.irAAdministrarLocal(id)}>
                            <strong>{nombreEmpresa}</strong>
                            <p>{nombreLocal}</p>
                            <p>{direccion}</p>
                        </article>)
                    }
                sessionStorage.setItem("arrayFacturas", JSON.stringify(arrayFacturas))
                this.setState({
                    arrayFacturas: arrayFacturas.slice()
                })

            })
    }

    irAAdministrarLocal($id) {
        console.log("dfds")
        sessionStorage.setItem("idLocal", $id)
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
            clearInterval(this.state.intervalo)
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
