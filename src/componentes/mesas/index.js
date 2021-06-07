import React from 'react'
import './estilos.scss'
import { Link } from "react-router-dom"

export default class Mesas extends React.Component {

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

        let url = global.url + 'mostrarMesas';

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);


        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                let mesas = []
                console.log(res);
                if (typeof res !== "undefined")
                    for (let i = 0; i < Object.keys(res.mesas).length; i++) {

                        let codMesa = res.mesas[i].codMesa
                        let nombreMesa = res.mesas[i].nombreMesa
                        let codFactura = res.mesas[i].codFactura

                        let alto = res.mesas[i].alto
                        let ancho = res.mesas[i].ancho
                        let posArriba = res.mesas[i].posArriba
                        let posIzquierda = res.mesas[i].posIzquierda

                        let estilos = {
                            height: alto + "%",
                            width: ancho + "%",
                            top: posArriba + "%",
                            left: posIzquierda + "%"
                        }

                        mesas.push(<Link
                            to={
                                codFactura ?
                                    "/factura/" + codFactura :
                                    "/factura/nueva"
                            }
                            key={codMesa}
                            className="mesa"
                            style={estilos}
                        >
                            <p>{nombreMesa}</p>
                        </Link>)
                    }
                this.setState({
                    mesas: mesas.slice()
                })
            });
    }

    render() {
        return (
            <div id="mesas">
                {this.state.mesas}
            </div>
        )
    }

}