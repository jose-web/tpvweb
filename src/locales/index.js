import React from 'react'
import './estilos.css'
import Menu from './../menu'
import { Redirect } from "react-router-dom"

export default class Locales extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayLocales: [],
            redireccionar: false
        };
    }

    guardaSesionYRedirije(id) {
        sessionStorage.setItem("idFactura", id)
        this.setState({
            redireccionar: true
        })
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

                for (let i = 0; i < Object.keys(res.locales).length; i++) {

                    let id = res.locales[i].id;
                    let nombreEmpresa = res.locales[i].nombreEmpresa;
                    let nombreLocal = res.locales[i].nombreLocal;
                    let direccion = res.locales[i].direccion;

                    arrayLocales.push(<article onClick={() => this.guardaSesionYRedirije(id)} key={id}>
                        <strong>{nombreEmpresa}</strong>
                        <p>{nombreLocal}</p>
                        <p>{direccion}</p>
                    </article>)

                }
                this.setState({
                    arrayLocales: arrayLocales
                })

            });
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