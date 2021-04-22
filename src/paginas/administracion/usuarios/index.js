import React from 'react'
import './estilos.scss'
import Menu from '../../../componentes/menu'

export default class AdministraUsuarios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
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


                        arrayUsuarios.push(<div key={id} className="usuario">
                            <p>{nombre}</p>

                        </div>)
                    }
                this.setState({
                    arrayUsuarios: arrayUsuarios.slice()
                })
            });
    }

    render() {
        return (
            <div id="todosUsuarios">
                <Menu pagina="administraUsuarios" />
                {this.state.arrayUsuarios}
                <div id="nuevoUsuario">+</div>
            </div>
        )
    }

}