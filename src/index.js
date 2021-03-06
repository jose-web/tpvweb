import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import './comunes/estilosComunes.scss'
import './comunes/global.js'
import Login from "./paginas/login"
import CompruebaLogin from "./compruebaLogin"
import * as serviceWorker from './serviceWorker';

export default class Inicia extends React.Component {

  render() {
    return <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={() => {
          if (localStorage.getItem("usuario") !== null)
            return <Redirect to="/facturas" />
          return <Login />
        }} />
        <Route path="/" component={CompruebaLogin} />
      </Switch>
    </BrowserRouter>
  }
}

ReactDOM.render(
  <Inicia />, document.getElementById('main')
)
serviceWorker.register()