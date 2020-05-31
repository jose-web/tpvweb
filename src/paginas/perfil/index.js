import React from 'react'
import './estilos.scss'
import Menu from '../../componentes/menu'
import BotonAbajo from '../../componentes/botonAbajo'
import Input from "../../componentes/input"
import Button from "../../componentes/button"
import { Redirect } from "react-router-dom"
import md5 from 'md5'

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nuevoNombre: "",
            nuevoApellido1: "",
            nuevoApellido2: "",
            nuevoEmail: "",
            pass: "",
            antiguaPass: "",
            nuevaPass: "",
            rNuevaPass: "",
            nuevaImagen: "",
            datos: "",
            redireccionar: false,
            fallo: ""
        };

        this.atras = this.atras.bind(this)
        this.cambiaDatos = this.cambiaDatos.bind(this)
        this.cambiaPass = this.cambiaPass.bind(this)
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

    cambiaDatos(event) {
        event.preventDefault()

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let url = global.url + 'actualizaDatosUsuario';

        let data = new FormData();
        data.append("email", usuario.email);
        data.append("pass", md5(this.state.pass));
        data.append("nuevoNombre", this.state.nuevoNombre);
        data.append("nuevoApellido1", this.state.nuevoApellido1);
        data.append("nuevoApellido2", this.state.nuevoApellido2);
        data.append("nuevoEmail", this.state.nuevoEmail);
        data.append("nuevaImagen", this.state.nuevaImagen);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                if (res.usuario) {
                    if (this.state.nuevaImagen !== "")
                        localStorage.setItem("usuario", JSON.stringify({
                            "email": usuario.email,
                            "pass": usuario.pass
                        }))
                    if (res.nuevaImagen !== "")
                        sessionStorage.setItem("img", global.url + "img/usuarios/" + res.nuevaImagen)

                    this.atras()
                }


            });
    }

    cambiaPass(event) {
        event.preventDefault()

        if (this.state.nuevaPass === this.state.rNuevaPass) {

            let usuario = JSON.parse(localStorage.getItem("usuario"))

            let url = global.url + 'actualizaDatosUsuario';

            let data = new FormData();
            data.append("email", usuario.email);
            data.append("pass", md5(this.state.antiguaPass));
            data.append("nuevaPass", md5(this.state.nuevaPass));

            fetch(url, {
                method: 'POST',
                body: data,

            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(res => {
                    if (res.usuario) {
                        localStorage.setItem("usuario", JSON.stringify({
                            "email": usuario.email,
                            "pass": md5(this.state.nuevaPass)
                        }))
                        this.atras()
                    }
                });
        }
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
        let fotoUsuario = sessionStorage.getItem("img")

        if (this.state.redireccionar)
            return <Redirect to="/locales" />

        return (
            <>
                <Menu />
                <div id="miPerfil">
                    <h1>Mi perfil</h1>
                    <form onSubmit={this.cambiaDatos}>
                        <label id="imagen" htmlFor="FOTO DE PERFIL">
                            <img src={fotoUsuario} alt="Foto de perfil" />
                            <span>Cambiar foto de perfil</span>
                        </label>
                        <Input label="FOTO DE PERFIL" file cambia={($valor) => this.cambiaEstado($valor, "nuevaImagen")} />
                        <Input label="NOMBRE" value={this.state.datos.nombre} cambia={($valor) => this.cambiaEstado($valor, "nuevoNombre")} />
                        <Input label="PRIMER APELLIDO" value={this.state.datos.apellido1} cambia={($valor) => this.cambiaEstado($valor, "nuevoApellido1")} />
                        <Input label="SEGUNDO APELLIDO" value={this.state.datos.apellido2} cambia={($valor) => this.cambiaEstado($valor, "nuevoApellido2")} />
                        <Input email label="EMAIL" value={this.state.datos.email} cambia={($valor) => this.cambiaEstado($valor, "nuevoEmail")} />
                        <Input pass label="CONTRASEÑA" cambia={($valor) => this.cambiaEstado($valor, "pass")} />
                        <Button submit value="MODIFICAR DATOS" />
                    </form>
                    <hr />
                    <form onSubmit={this.cambiaPass}>
                        <h2>Cambiar contraseña</h2>
                        <Input pass label="ANTIGUA CONTRASEÑA" cambia={($valor) => this.cambiaEstado($valor, "antiguaPass")} />
                        <Input pass label="NUEVA CONTRASEÑA" cambia={($valor) => this.cambiaEstado($valor, "nuevaPass")} />
                        <Input pass label="REPITE NUEVA CONTRASEÑA" cambia={($valor) => this.cambiaEstado($valor, "rNuevaPass")} />
                        <Button submit value="MODIFICAR CONTRASEÑA" />
                    </form>
                </div>
                <BotonAbajo onClick={this.atras} />
            </>
        )
    }
}