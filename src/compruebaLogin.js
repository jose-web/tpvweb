import React from 'react'
import { Redirect, Route } from "react-router-dom"
import Locales from "./paginas/locales"
import Facturas from "./paginas/facturas"
import LineaDeFactura from "./paginas/lineaDeFactura"
import EligeLocalAdministracion from "./paginas/administracion/eligeLocalAdministracion"
import AdministracionLocal from "./paginas/administracion/administraLocal"
import AdministracionEmpleados from "./paginas/administracion/administraEmpleados"
import BuscaEmpleado from "./paginas/administracion/buscaEmpleado"
import Productos from "./paginas/administracion/administraProductos"
import Perfil from "./paginas/perfil"

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
                    }
                });
        }
        return <>
            <Route exact path="/locales" component={Locales} />
            <Route exact path="/facturas" component={Facturas} />
            <Route exact path="/lineaDeFactura" from="/facturas" component={LineaDeFactura} />
            <Route exact path="/administracion/seleccionLocal" component={EligeLocalAdministracion} />
            <Route exact path="/administracion" component={AdministracionLocal} />
            <Route exact path="/administracion/empleados" component={AdministracionEmpleados} />
            <Route exact path="/administracion/empleados/buscar" component={BuscaEmpleado} />
            <Route exact path="/administracion/productos" component={Productos} />
            <Route exact path="/perfil" component={Perfil} />
            <Redirect from="*" to="/locales" />
        </>
    }
}