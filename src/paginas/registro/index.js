import React from 'react'
import Input from "../../componentes/input"
import Button from "../../componentes/button"
import { Redirect, Link } from "react-router-dom"
import md5 from 'md5'

export default class Registro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            nombreError: "",
            apellido1: "",
            apellido1Error: "",
            apellido2: "",
            apellido2Error: "",
            email: "",
            emailError: "",
            pass: "",
            passError: "",
            rpass: "",
            redireccionar: false,
        };

        this.compruebaRegistro = this.compruebaRegistro.bind(this)
    }

    cambiaEstado($valor, $nombre) {
        let objaux = {}
        objaux[$nombre] = $valor
        this.setState(
            objaux
        )
    }

    compruebaRegistro(event) {
        event.preventDefault()

        let nombreError = this.state.nombre.trim() === "" ? "El nombre está vacío" : ""
        let apellido1Error = this.state.apellido1.trim() === "" ? "El apellido1 está vacío" : ""
        let apellido2Error = this.state.apellido2.trim() === "" ? "El apellido2 está vacío" : ""
        let emailError = this.state.email.trim() === "" ? "El email está vacío" : ""
        let passError = this.state.pass.trim() === "" ? "La contraseña está vacía" : this.state.pass.trim() !== this.state.rpass.trim() ? "La contraseña no es la misma" : ""

        this.setState(
            {
                nombreError,
                apellido1Error,
                apellido2Error,
                emailError,
                passError
            }
        )

        this.compruebaEmail(this.state.email)

        if (
            nombreError === ""
            && apellido1Error === ""
            && apellido2Error === ""
            && emailError === ""
            && passError === ""
        ) {
            let url = global.url + 'registro';

            let data = new FormData();
            data.append('nombre', this.state.nombre);
            data.append('apellido1', this.state.apellido1);
            data.append('apellido2', this.state.apellido2);
            data.append('email', this.state.email);
            data.append('pass', md5(this.state.pass));

            fetch(url, {
                method: 'POST',
                body: data,

            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(res => {
                    if (res.usuario) {
                        localStorage.setItem("usuario", JSON.stringify({
                            "email": this.state.email,
                            "pass": md5(this.state.pass),
                            "img": global.url + "img/usuarios/defaultUser.png"
                        }))
                        this.setState({
                            redireccionar: true
                        })
                    }
                });
        }

    }

    compruebaEmail(event) {

        this.cambiaEstado(event, "email")

        let url = global.url + 'compruebaEmailRepetido';

        let data = new FormData();
        data.append('email', event);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                if (res.cuentaEmail) {
                    this.setState({
                        emailError: res.cuentaEmail === -1 ? "No es un email correcto" : res.cuentaEmail > 0 ? "Este email ya está registrado" : ""
                    })
                }
            });

    }

    render() {
        if (this.state.redireccionar)
            return <Redirect to="/locales" />
        return (
            <div id="contieneLogin">
                <div id="login">
                    <h1>TPVWEB - REGISTRO</h1>
                    <br />
                    <form method="post" action="/locales" onSubmit={this.compruebaRegistro}>
                        <Input label="NOMBRE" cambia={($valor) => this.cambiaEstado($valor, "nombre")} /><p>{this.state.nombreError}</p>
                        <Input label="PRIMER APELLIDO" cambia={($valor) => this.cambiaEstado($valor, "apellido1")} /><p>{this.state.apellido1Error}</p>
                        <Input label="SEGUNDO APELLIDO" cambia={($valor) => this.cambiaEstado($valor, "apellido2")} /><p>{this.state.apellido2Error}</p>
                        <Input label="EMAIL" email cambia={($valor) => this.compruebaEmail($valor)} /><p>{this.state.emailError}</p>
                        <Input label="CONTRASEÑA" pass cambia={($valor) => this.cambiaEstado($valor, "pass")} /><p>{this.state.passError}</p>
                        <Input label="REPITE CONTRASEÑA" pass cambia={($valor) => this.cambiaEstado($valor, "rpass")} />
                        <Button value="REGISTRARSE" submit />
                        <Link to="/login" className="linkCambio">Ir al Login</Link>
                    </form>
                </div>
            </div>
        )
    }
}