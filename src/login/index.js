import React from 'react'
import './estilos.css'
import Input from "../input"
import Button from "../button"

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: ""
    };

    this.compruebaLogin = this.compruebaLogin.bind(this)
    this.cambiaEmail = this.cambiaEmail.bind(this)
    this.cambiaPass = this.cambiaPass.bind(this)

  }

  compruebaLogin(event) {
    event.preventDefault()

    var url = 'http://localhost/tpvweb/REST/login';

    var data = new FormData();
    data.append('email', this.state.email);
    data.append('pass', this.state.pass);

    fetch(url, {
      method: 'POST',
      body: data,

    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

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