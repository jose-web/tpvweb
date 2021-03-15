import React from 'react'
import './estilos.scss'

import { Redirect } from "react-router-dom"
import md5 from 'md5'
import Input from "../../componentes/input"
import Button from "../../componentes/button"

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redireccionar: false
        };

        this.compruebaLogin = this.compruebaLogin.bind(this);
    }

    compruebaLogin(event) {
        event.preventDefault()

        let url = global.url + 'login';

        let data = new FormData();

        let nombre = event.target.inputNOMBRE.value
        let pass = event.target.inputCONTRASEÑA.value

        data.append('email', nombre);
        data.append('pass', md5(pass));

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                if (res.login) {

                    localStorage.setItem("usuario", JSON.stringify({
                        "email": nombre,
                        "pass": md5(pass),
                    }))

                    sessionStorage.setItem("img", global.url + "img/usuarios/" + res.img)

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

    render() {
        if (this.state.redireccionar)
            return <Redirect to="/facturas" />

        return (
            <div id="login" >
                <h1>TPVWEB</h1>
                <form onSubmit={this.compruebaLogin}>
                    <Input nombre="NOMBRE" />
                    <Input nombre="CONTRASEÑA" pass />
                    <Button nombre="ENTRAR" />
                </form>
            </div>
        )
    }

}