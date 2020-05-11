import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import './estilosComunes.css'
import Login from "./login"

class Inicia extends React.Component {

  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
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