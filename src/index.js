import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import './comunes/estilosComunes.css'
import './comunes/global.js'
import Login from "./paginas/login"
import Locales from "./paginas/locales"
import Facturas from "./paginas/facturas"
import LineaDeFactura from "./paginas/lineaDeFactura"


class Inicia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sesion: false
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {

    if (localStorage.getItem("usuario") === null) {
      this.setState({
        sesion: false
      })
    } else {

      let url = global.url + "compruebaSesion"

      let usuario = JSON.parse(localStorage.getItem("usuario"))

      let data = new FormData()
      data.append('email', usuario.email)
      data.append('pass', usuario.pass)

      let sesion = async () => {

        await fetch(url, {
          method: 'POST',
          body: data,

        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(res => {
            this.setState(res.respuesta)
          })

      }

      this.setState({ sesion })
    }
  }

  render() {
    if (!this.state.sesion)
      return <Login sesion={this.componentDidMount} />
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={() => {
              if (this.state.sesion)
                return <Redirect to="/locales" />
              return <Login />
            }} />
            <Route exact path="/locales" component={Locales} />
            <Route exact path="/facturas" component={Facturas} />
            <Route exact path="/lineaDeFactura" component={LineaDeFactura} />
            <Redirect from="*" to="/login" />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

ReactDOM.render(
  <Inicia />, document.getElementById('main')
)