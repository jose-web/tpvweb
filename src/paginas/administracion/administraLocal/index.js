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
        this.atras = this.atras.bind(this)
    }

    atras() {
        this.setState({
            redireccionar: "/administracion/seleccionLocal"
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
                    <h1>Administración</h1>
                    <article>Empleados</article>
                    <article>Productos</article>
                    <article>Mapa</article>
                </section>
                <BotonAbajo onClick={this.atras} />
            </>
        )
    }
}
