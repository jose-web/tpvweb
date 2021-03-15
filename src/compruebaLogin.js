import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import Facturas from "./paginas/facturas"

export default class CompruebaLogin extends React.Component {

    render() {
        if (localStorage.getItem("usuario") === null) {
            return <Redirect to="/login" />
        } else {
            let usuario = JSON.parse(localStorage.getItem("usuario"))
            let url = global.url + 'ObtenerDatosUsuario'

            let data = new FormData();
            data.append('email', usuario.email);
            data.append('pass', usuario.pass);

            fetch(url, {
                method: 'POST',
                body: data,

            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(res => {
                    if (res.datos) {
                        sessionStorage.setItem("img", global.url + "img/usuarios/" + res.datos.img)
                        sessionStorage.setItem("camarero", res.datos.camarero)
                        sessionStorage.setItem("encargado", res.datos.encargado)
                        sessionStorage.setItem("cocinero", res.datos.cocinero)
                        document.body.style = res.datos.tema
                    }
                });
        }
        return <BrowserRouter>
            <Switch>
                <Route exact path="/facturas" component={Facturas} />

                <Redirect from="*" to="/facturas" />
            </Switch>
        </BrowserRouter>
    }
}