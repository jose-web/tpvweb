import React from 'react'
import "./estilos.scss"
import Menu from '../../../componentes/menu'
import BotonAbajo from '../../../componentes/botonAbajo'
// import { ReactComponent as Lapiz } from '../../../comunes/svg/pencil-alt-solid.svg'
// import { ReactComponent as Basura } from '../../../comunes/svg/trash-alt-regular.svg'
import { Redirect } from "react-router-dom"

export default class AdministracionLocal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redireccionar: "",
            arrayMenuProductos: "",
            arrayProductos: ""
        };
        this.irA = this.irA.bind(this)
    }

    componentDidMount() {
        let url = global.url + 'muestraProductosLocal/' + sessionStorage.getItem("idLocal");

        fetch(url, {
            method: 'GET',

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {

                sessionStorage.setItem("productosLocal", JSON.stringify(res))

                let menuProductos = []
                let arrayMenuProductos = <ul key="menuProductos" id="menuProductos">{menuProductos}</ul>

                for (let i = 0; i < Object.keys(res.categorias).length; i++) {
                    // let id = res.categorias[i].codCategoria
                    let nombre = res.categorias[i].nombre
                    let categoria = res.categorias[i].codCategoria
                    menuProductos.push(<li key={categoria + nombre} onClick={() => this.muestraCategoria(res.categorias[i].dentroCategoria)}>{nombre}</li>)
                }
                menuProductos.push(<li key="mas">+</li>)

                this.setState({ arrayMenuProductos })

                this.muestraCategoria(res.categorias[0].dentroCategoria)

            });
    }

    muestraCategoria($array) {
        let arrayProductos = []

        arrayProductos.push(<article><strong><p>Añadir una categoría</p><p>+</p></strong></article>)

        for (let o = 0; o < Object.keys($array).length; o++) {
            let identificador = ""
            let esCategoria = typeof $array[o].codCategoria !== "undefined"
            if (esCategoria)
                identificador = $array[o].codCategoria
            else
                identificador = $array[o].codProducto

            let contenido = <>
                <strong>{$array[o].nombre}</strong>
                {esCategoria ? "" : <>
                    <p>{$array[o].precio} €</p>
                </>}
            </>

            arrayProductos.push(<article
                className={($array[o].disponibilidad === "0" ? "opacidadAdministraCategoriaProducto " : "") + "administraCategoriaProducto"}
                key={identificador}
                tabIndex="0"
                onClick={() => esCategoria ? this.muestraCategoria($array[o].dentroCategoria) : ""}
            >
                <div>
                    {$array[o].disponibilidad === "0" ? <del>{contenido}</del> : contenido}
                </div>
            </article>)
        }

        this.setState({ arrayProductos })
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
                    {this.state.arrayMenuProductos}
                    {this.state.arrayProductos}
                </section>
                <BotonAbajo onClick={() => this.irA("/administracion")} />
                <BotonAbajo derecha />
            </>
        )
    }
}
