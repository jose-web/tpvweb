import React from 'react'
import './estilos.css'
import Input from "../input"
import Button from "../button"
import { Redirect } from "react-router-dom"
import md5 from 'md5'


export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      redireccionar: false
    };

    this.compruebaLogin = this.compruebaLogin.bind(this)
    this.cambiaEmail = this.cambiaEmail.bind(this)
    this.cambiaPass = this.cambiaPass.bind(this)

  }

  compruebaLogin(event) {
    event.preventDefault()

    let url = 'http://localhost/tpvweb/REST/login';

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
            "email":this.state.email,
            "pass":md5(this.state.pass)
          }))
          this.setState({
            redireccionar: true
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
      <>
        <div id="login">
          <h1>TPVWEB</h1>
          <form method="post" action="/locales" onSubmit={this.compruebaLogin}>
            <Input label="USUARIO" cambia={this.cambiaEmail} />
            <Input label="CONTRASEÑA" pass cambia={this.cambiaPass} />
            <Button value="INICIAR SESIÓN" submit />
          </form>
        </div>
      </>
    )
  }

}