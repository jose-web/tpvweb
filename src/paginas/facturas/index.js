import React from 'react'
import './estilos.scss'
import { Link } from "react-router-dom"
import Menu from '../../componentes/menu'

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

        let url = global.url + 'mostrarFacturas';

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

                        arrayFacturas.push(<Link to={"/factura/" + id} key={id} className="factura" title={fecha.toLocaleString()}>
                            <p>{nombre}</p>
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
            <div id="facturas" >
                <Menu pagina="facturas" />
                <div id="listadoDeFacturas">{this.state.arrayFacturas}</div>
                <Link to="/factura/nueva" key="/nueva" id="nuevaFactura" title="Nueva factura">+</Link>
            </div>
        )
    }

}