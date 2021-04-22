import React from 'react'
import './estilos.scss'
import { Link } from "react-router-dom"
import Menu from '../../../componentes/menu'

export default class Facturas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        let usuario

        try {
            usuario = JSON.parse(localStorage.getItem("usuario"))
        } catch (e) {
            localStorage.removeItem("usuario")
            this.setState({ redireccionar: true })
            return 0;
        }

        let url = global.url + 'mostrarTodasFacturas';

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                let arrayFacturas = []

                if (typeof res !== "undefined")
                    for (let i = 0; i < Object.keys(res.facturas).length; i++) {

                        let id = res.facturas[i].codFactura
                        let fecha = new Date(res.facturas[i].fecha)
                        let nombre = res.facturas[i].nombre
                        let cuentaTotal = res.facturas[i].factura
                        let displonible = res.facturas[i].displonible

                        arrayFacturas.push(<Link to={"/factura/" + id} key={id} className={"factura " + (displonible === "1" ? "displonible" : "")}>
                            <p>{id}</p>
                            <p>{nombre}</p>
                            <p>{fecha.toLocaleString()}</p>
                            <p>{cuentaTotal + " €"}</p>
                        </Link>)
                    }
                this.setState({
                    arrayFacturas: arrayFacturas.slice()
                })
            });
    }

    render() {
        return (
            <>
                <Menu pagina="administraFacturas" />
                <div id="todasFacturas">{this.state.arrayFacturas}</div>
            </>
        )
    }

}