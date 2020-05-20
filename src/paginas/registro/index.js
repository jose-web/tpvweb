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
            apellido1: "",
            apellido2: "",
            email: "",
            pass: "",
            rpass: "",
            redireccionar: false,
        };
    }

    cambiaEstado($valor, $nombre) {
        let objaux = {}
        objaux[$nombre] = $valor
        this.setState(
            objaux
        )
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
                        <Input label="NOMBRE" cambia={($valor) => this.cambiaEstado($valor, "nombre")} />
                        <Input label="APELLIDO 1" cambia={($valor) => this.cambiaEstado($valor, "apellido1")} />
                        <Input label="APELLIDO 2" cambia={($valor) => this.cambiaEstado($valor, "apellido2")} />
                        <Input label="EMAIL" email cambia={($valor) => this.cambiaEstado($valor, "email")} />
                        <Input label="CONTRASEÑA" pass cambia={($valor) => this.cambiaEstado($valor, "pass")} />
                        <Input label="REPITE CONTRASEÑA" pass cambia={($valor) => this.cambiaEstado($valor, "rpass")} />
                        <Button value="REGISTRARSE" submit />
                        <Link to="/login" className="linkCambio">Ir al Login</Link>
                    </form>
                </div>
            </div>
        )
    }

}