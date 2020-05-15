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

        return (
            <>
                <Menu estoyEn="administracion" />
                <section id="seccionLocalAdministracion">
                    <h1>Administración</h1>
                    <article onClick={() => this.irA("/administracion/empleados")}>Empleados</article>
                    <article>Productos</article>
                    <article>Mapa</article>
                </section>
                <BotonAbajo onClick={() => this.irA("/administracion/seleccionLocal")} />
            </>
        )
    }
}
