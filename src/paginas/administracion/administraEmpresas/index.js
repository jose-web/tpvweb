import React from 'react'
import Menu from '../../../componentes/menu'

export default class Empresas extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        let url = global.url + 'muestraMisEmpresas'

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
                let arrayEmpresas = []
                console.log(res.empresas);
                for (let i = 0; i < Object.keys(res.empresas).length; i++) {
                    let empresa = res.empresas[i]
                    arrayEmpresas.push(
                        <article key={empresa.codEmpresa}>
                            <p>{empresa.nombre}</p>
                            <p>{empresa.nif}</p>
                        </article>
                    )
                }
                this.setState({ arrayEmpresas })
            })
    }

    render() {
        return (
            <>
                <Menu />
                <section id="locales">
                    <h1>Empresas</h1>
                    <article>
                        <p>Crear una empresa</p>
                    </article>
                    {this.state.arrayEmpresas}
                </section>
            </>
        )
    }
}