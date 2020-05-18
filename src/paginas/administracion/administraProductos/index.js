import React from 'react'
import "./estilos.css"
import Menu from '../../../componentes/menu'
import BotonAbajo from '../../../componentes/botonAbajo'
import { ReactComponent as Lapiz } from '../../../comunes/svg/pencil-alt-solid.svg'
import { ReactComponent as Basura } from '../../../comunes/svg/trash-alt-regular.svg'
import { Redirect } from "react-router-dom"

export default class AdministracionLocal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redireccionar: "",
            arrayProductos: ""
        };
        this.irA = this.irA.bind(this)
    }

    componentDidMount() {
        let url = global.url + 'muestraProductosLocal';
        let arrayProductos = []

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('codLocal', sessionStorage.getItem("idLocal"))

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {

                for (let i = 0; i < Object.keys(res.productos).length; i++) {
                    let id = res.productos[i].codProducto;
                    let nombre = res.productos[i].nombre;
                    let precio = res.productos[i].precio;
                    let img = res.productos[i].img;

                    arrayProductos.push(<article className="administraProducto" onClick={() => this.guardaSesionYRedirije(id)} key={id} tabIndex="0">
                        <Basura />
                        <div>
                            <p>{img}</p>
                            <strong>{nombre}</strong>
                            <p>{precio} €</p>
                        </div>
                        <Lapiz />
                    </article>)

                }
                this.setState({ arrayProductos })

            });
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
                    <h1>{sessionStorage.getItem("nombreLocal")} - Administración de productos</h1>
                    {this.state.arrayProductos}
                </section>
                <BotonAbajo onClick={() => this.irA("/administracion")} />
            </>
        )
    }
}
