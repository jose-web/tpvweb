import React from 'react'
import Menu from '../../../componentes/menu'
import BotonAbajo from '../../../componentes/botonAbajo'
import { Redirect } from "react-router-dom"

export default class AdministracionLocal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redireccionar: ""
        };
        this.irA = this.irA.bind(this)
    }

    irA($sitio) {
        this.setState({
            redireccionar: $sitio
        })
    }

    render() {
        if (this.state.redireccionar !== "") {
            return <Redirect to={this.state.redireccionar} />
        }

        let atras = sessionStorage.getItem("irAtras") === "atras" ? "/locales" : "/administracion/seleccionLocal"

        return (
            <>
                <Menu estoyEn="administracion" />
                <section className="contieneCajas">
                    <h1>{sessionStorage.getItem("nombreLocal")} - Administración</h1>
                    {/* <article onClick={() => this.irA("/administracion/empleados")}>Empleados</article> */}
                    <article className="caja" onClick={() => this.irA("/administracion/productos")}>Productos</article>
                    <article className="caja">Mapa</article>
                </section>
                <BotonAbajo onClick={() => this.irA(atras)} />
            </>
        )
    }
}
