import React from 'react'
import './estilos.css'
import Input from "../../componentes/input"
import Button from "../../componentes/button"
import { Redirect } from "react-router-dom"
import md5 from 'md5'


export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      redireccionar: false,
      fallo: ""
    };

    this.compruebaLogin = this.compruebaLogin.bind(this)
    this.cambiaEmail = this.cambiaEmail.bind(this)
    this.cambiaPass = this.cambiaPass.bind(this)

  }

  compruebaLogin(event) {
    event.preventDefault()

    let url = global.url+'login';

    let data = new FormData();
    data.append('email', this.state.email);
    data.append('pass', md5(this.state.pass));

    fetch(url, {
      method: 'POST',
      body: data,

    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(res => {
        if (res.login) {

          localStorage.setItem("usuario", JSON.stringify({
            "email": this.state.email,
            "pass": md5(this.state.pass)
          }))
          this.props.sesion()
          this.setState({
            redireccionar: true
          })
        } else {
          this.setState({
            fallo: <p>Fallo al iniciar sesión</p>
          })
        }
      });

  }

  cambiaEmail($email) {
    this.setState({
      email: $email
    })
  }

  cambiaPass($pass) {
    this.setState({
      pass: $pass
    })
  }

  render() {
    if (this.state.redireccionar)
      return <Redirect to="/locales" />

    return (
      <div id="contieneLogin">
        <div id="login">
          <h1>TPVWEB</h1>
          {this.state.fallo}
          <form method="post" action="/locales" onSubmit={this.compruebaLogin}>
            <Input label="USUARIO" cambia={this.cambiaEmail} />
            <Input label="CONTRASEÑA" pass cambia={this.cambiaPass} />
            <Button value="INICIAR SESIÓN" submit />
          </form>
        </div>
      </div>
    )
  }

}