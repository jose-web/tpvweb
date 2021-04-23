import React from 'react'
import './estilos.scss'
import Menu from '../../../componentes/menu'
import Popup from '../../../componentes/popup'
import Input from '../../../componentes/input'
import Button from '../../../componentes/button'
import md5 from 'md5'

export default class AdministraUsuarios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        this.mostrarPopupEditarUsuario = this.mostrarPopupEditarUsuario.bind(this)
        this.mostrarPopupNuevoUsuario = this.mostrarPopupNuevoUsuario.bind(this)
        this.cerrarPopup = this.cerrarPopup.bind(this)
    }

    componentDidMount() {
        this.mostrarUsuarios()
    }

    mostrarUsuarios() {
        let usuario

        try {
            usuario = JSON.parse(localStorage.getItem("usuario"))
        } catch (e) {
            localStorage.removeItem("usuario")
            this.setState({ redireccionar: true })
            return 0;
        }

        let url = global.url + 'mostrarUsuarios';

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                let arrayUsuarios = []

                if (typeof res !== "undefined")
                    for (let i = 0; i < Object.keys(res.usuarios).length; i++) {

                        let id = res.usuarios[i].codUsuario
                        let nombre = res.usuarios[i].nombre


                        arrayUsuarios.push(<div key={id} className="usuario" onClick={() => this.mostrarPopupEditarUsuario(id, nombre)}>
                            <p>{nombre}</p>
                        </div>)
                    }
                this.setState({
                    arrayUsuarios: arrayUsuarios.slice()
                })
            });
    }

    mostrarPopupEditarUsuario(codUsuario, nombre) {
        let contenido = <form onSubmit={(event) => this.editarUsuario(event, codUsuario)}>
            <p className="titulo">EDITAR USUARIO</p>
            <Input nombre="NOMBRE" value={nombre} focus={true} />
            <Button nombre="EDITAR" submit />
        </form>

        this.setState({
            popup: <Popup contenido={contenido} cerrar={this.cerrarPopup} />
        })
    }

    editarUsuario(event, codUsuario) {
        event.preventDefault()

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let url = global.url + 'editarUsuario';

        let nombre = event.target.inputNOMBRE.value

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);
        data.append('codUsuario', codUsuario);
        data.append('nombre', nombre);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                this.mostrarUsuarios()
                this.cerrarPopup()
            });
    }

    mostrarPopupNuevoUsuario() {
        let contenido = <form onSubmit={(event) => this.nuevoUsuario(event)}>
            <p className="titulo">NUEVO USUARIO</p>
            <Input nombre="NOMBRE" focus={true} />
            <Input nombre="CONTRASEÑA" pass />
            <Input nombre="REPITA LA CONTRASEÑA" pass />
            <Button nombre="AÑADIR" submit />
        </form>

        this.setState({
            popup: <Popup contenido={contenido} cerrar={this.cerrarPopup} />
        })
    }

    nuevoUsuario(event) {
        event.preventDefault()

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let url = global.url + 'nuevoUsuario';

        let nombre = event.target.inputNOMBRE.value
        let pass = event.target.inputCONTRASEÑA.value
        let pass2 = event.target["inputREPITA LA CONTRASEÑA"].value

        if (pass !== pass2) return false

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);
        data.append('nuevoEmail', nombre);
        data.append('nuevaPass', md5(pass));

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                this.mostrarUsuarios()
                this.cerrarPopup()
            })
    }

    cerrarPopup() {
        this.setState({
            popup: ""
        })
    }

    render() {
        return (
            <div id="todosUsuarios">
                <Menu pagina="administraUsuarios" />
                {this.state.arrayUsuarios}
                <div id="nuevoUsuario" onClick={this.mostrarPopupNuevoUsuario}>+</div>
                {this.state.popup}
            </div>
        )
    }

}