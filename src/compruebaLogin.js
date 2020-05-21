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

export default class CompruebaLogin extends React.Component {

    render() {
        if (localStorage.getItem("usuario") === null) {
            return <Redirect to="/login" />
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
            <Redirect from="*" to="/locales" />
        </>
    }
}