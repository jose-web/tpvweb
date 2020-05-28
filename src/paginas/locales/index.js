import React from 'react'
import './estilos.scss'
import Menu from '../../componentes/menu'
import { Redirect } from "react-router-dom"

export default class Locales extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayLocales: [],
            redireccionar: false
        };
        this.habilitaTrabajador = this.habilitaTrabajador.bind(this)
    }

    guardaSesionYRedirije(id) {
        sessionStorage.setItem("idLocal", id)
        this.setState({
            redireccionar: true
        })
    }

    habilitaTrabajador() {
        let url = global.url + 'habilitaTrabajador';

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                this.setState({
                    arrayLocales: [<article key="1" tabIndex="0">
                        <p>No estás contratado/a en ninguna empresa</p>
                    </article>]
                })
            });
    }

    componentDidMount() {

        let url = global.url + 'buscaLocales';
        let arrayLocales = []

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                let camarero = sessionStorage.getItem("camarero")
                let encargado = sessionStorage.getItem("encargado")
                let cocinero = sessionStorage.getItem("cocinero")

                if (camarero === "0" && encargado === "0" && cocinero === "0")
                    arrayLocales.push(<article onClick={this.habilitaTrabajador} key="1" tabIndex="0">
                        <p>Habilitar la contratación en empresas</p>
                    </article>)
                else {
                    let redirijeId = -1
                    for (let i = 0; i < Object.keys(res.locales).length; i++) {
                        let id = res.locales[i].id;
                        redirijeId = id;
                        let nombreEmpresa = res.locales[i].nombreEmpresa;
                        let nombreLocal = res.locales[i].nombreLocal;
                        let direccion = res.locales[i].direccion;

                        arrayLocales.push(<article onClick={() => this.guardaSesionYRedirije(id)} key={id} tabIndex="0">
                            <strong>{nombreEmpresa}</strong>
                            <p>{nombreLocal}</p>
                            <p>{direccion}</p>
                        </article>)
                    }

                    if (arrayLocales.length === 1) {
                        this.guardaSesionYRedirije(redirijeId)
                    } else if (arrayLocales.length === 0)
                        arrayLocales.push(<article key="1" tabIndex="0">
                            <p>No estás contratado/a en ninguna empresa</p>
                        </article>)
                }
                this.setState({
                    arrayLocales: arrayLocales
                })
            });
        sessionStorage.removeItem("irAtras")
    }

    render() {
        if (this.state.redireccionar)
            return <Redirect to="/facturas" />
        return (
            <>
                <Menu />
                <section id="locales">
                    <h1>Locales</h1>
                    {this.state.arrayLocales}
                </section>
            </>
        )
    }
}