import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import './comunes/estilosComunes.scss'
import './comunes/global.js'
import Login from "./paginas/login"
import Registro from "./paginas/registro"
import Locales from "./paginas/locales"
import Facturas from "./paginas/facturas"
import LineaDeFactura from "./paginas/lineaDeFactura"
import EligeLocalAdministracion from "./paginas/administracion/eligeLocalAdministracion"
import AdministracionLocal from "./paginas/administracion/administraLocal"
import AdministracionEmpleados from "./paginas/administracion/administraEmpleados"
import BuscaEmpleado from "./paginas/administracion/buscaEmpleado"
import Productos from "./paginas/administracion/administraProductos"

class Inicia extends React.Component {
  render() {
    if (localStorage.getItem("usuario") === null)
      return <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/registro" component={Registro} />
          <Redirect from="*" to="/login" />
        </Switch>
      </BrowserRouter>

    return <BrowserRouter>
      <Switch>
        <Route exact path="/locales" component={Locales} />
        <Route exact path="/facturas" component={Facturas} />
        <Route exact path="/lineaDeFactura" from="/facturas" component={LineaDeFactura} />
        <Route exact path="/administracion/seleccionLocal" component={EligeLocalAdministracion} />
        <Route exact path="/administracion" component={AdministracionLocal} />
        <Route exact path="/administracion/empleados" component={AdministracionEmpleados} />
        <Route exact path="/administracion/empleados/buscar" component={BuscaEmpleado} />
        <Route exact path="/administracion/productos" component={Productos} />
        <Redirect from="*" to="/locales" />
      </Switch>
    </BrowserRouter>

  }
}

ReactDOM.render(
  <Inicia />, document.getElementById('main')
)