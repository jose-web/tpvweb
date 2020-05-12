import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import './comunes/estilosComunes.css'
import Login from "./login"
import Locales from "./locales"

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

      let url = 'http://localhost/tpvweb/REST/compruebaSesion';

      let usuario = JSON.parse(localStorage.getItem("usuario"))

      let data = new FormData()
      data.append('email', usuario.email)
      data.append('pass', usuario.pass)


      fetch(url, {
        method: 'POST',
        body: data,

      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(res => {
          this.setState({
            sesion: res.respuesta
          })
        });
    }
  }

  render() {
    if (!this.state.sesion)
      return <BrowserRouter>
        <Switch>
          <Route path="/login" component={() => {
            return <Login sesion={this.componentDidMount} />
          }} />
          <Redirect from="*" to="/login" />
        </Switch>
      </BrowserRouter>
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