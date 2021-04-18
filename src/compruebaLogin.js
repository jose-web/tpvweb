import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import Facturas from "./paginas/facturas"
import LineaDeFactura from "./paginas/lineaDeFactura"
import AdministraProductos from "./paginas/administracion/productos"

export default class CompruebaLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (localStorage.getItem("usuario") === null) {
            return <Redirect to="/login" />
        } else {
            let usuario

            try {
                usuario = JSON.parse(localStorage.getItem("usuario"))
            } catch (e) {
                localStorage.removeItem("usuario")
                this.setState({ redireccionar: true })
                return 0;
            }

            let url = global.url + 'compruebaSesion'

            let data = new FormData();
            data.append('email', usuario.email);
            data.append('pass', usuario.pass);

            fetch(url, {
                method: 'POST',
                body: data,

            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(res => {
                    if (!res.respuesta) {
                        this.setState({ redireccionar: true })
                    }
                });
        }

        if (this.state.redireccionar) {
            localStorage.removeItem("usuario")
            return <Redirect to="/login" />
        }


        return <BrowserRouter>
            <Switch>
                <Route exact path="/cerrarSesion" component={() => {
                    this.setState({ redireccionar: true })
                    return <Redirect to="/login" />
                }} />
                <Route exact path="/facturas" component={Facturas} />
                <Route exact path="/factura/nueva" component={LineaDeFactura} />
                <Route exact path="/factura/:codFactura(\d+)" component={LineaDeFactura} /> {/* codFactura solo números */}
                <Route exact path="/administracion/productos" component={AdministraProductos} />

                <Redirect from="*" to="/facturas" />
            </Switch>
        </BrowserRouter>
    }
}