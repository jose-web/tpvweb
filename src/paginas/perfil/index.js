import React from 'react'
import './estilos.scss'
import Menu from '../../componentes/menu'
import BotonAbajo from '../../componentes/botonAbajo'
import Input from "../../componentes/input"
import Button from "../../componentes/button"
import { Redirect } from "react-router-dom"

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            apellido1: "",
            apellido2: "",
            email: "",
            pass: "",
            antiguaPass: "",
            nuevaPass: "",
            rNuevaPass: "",
            datos:"",
            redireccionar: false,
            fallo: ""
        };
        
        this.atras = this.atras.bind(this)
    }

    cambiaEstado($valor, $nombre) {
        let objaux = {}
        objaux[$nombre] = $valor
        this.setState(
            objaux
        )
    }

    atras() {
        this.setState({
            redireccionar: true
        })
    }

    cambiaDatos() {


    }

    componentDidMount() {

        let usuario = JSON.parse(localStorage.getItem("usuario"))
        let url = global.url + 'ObtenerDatosUsuario'

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                if (res.datos)
                    this.setState({
                        datos: res.datos
                    })
            });

    }

    render() {
        let usuario = JSON.parse(localStorage.getItem("usuario"))

        if (this.state.redireccionar)
            return <Redirect to="/locales" />


        return (
            <>
                <Menu />
                <div id="miPerfil">
                    <h1>Mi perfil</h1>
                    <div id="imagen">
                        <img src={usuario.img} alt="Foto de perfil" />
                        <span>Cambiar foto de perfil</span>
                    </div>
                    <form>
                        <Input label="NOMBRE" value={this.state.datos.nombre} cambia={($valor) => this.cambiaEstado($valor, "nombre")} />
                        <Input label="PRIMER APELLIDO" value={this.state.datos.apellido1} cambia={($valor) => this.cambiaEstado($valor, "apellido1")} />
                        <Input label="SEGUNDO APELLIDO" value={this.state.datos.apellido2} cambia={($valor) => this.cambiaEstado($valor, "apellido2")} />
                        <Input email label="EMAIL" value={this.state.datos.email} cambia={($valor) => this.cambiaEstado($valor, "email")} />
                        <Input pass label="CONTRASEÑA" cambia={($valor) => this.cambiaEstado($valor, "pass")} />
                        <Button submit value="MODIFICAR DATOS" />
                    </form>
                    <hr />
                    <h2>Cambiar contraseña</h2>
                    <Input pass label="ANTIGUA CONTRASEÑA" cambia={($valor) => this.cambiaEstado($valor, "antiguaPass")} />
                    <Input pass label="NUEVA CONTRASEÑA" cambia={($valor) => this.cambiaEstado($valor, "nuevaPass")} />
                    <Input pass label="REPITE NUEVA CONTRASEÑA" cambia={($valor) => this.cambiaEstado($valor, "rNuevaPass")} />
                    <Button value="MODIFICAR CONTRASEÑA" />
                </div>
                <BotonAbajo onClick={this.atras} />
            </>
        )
    }

}