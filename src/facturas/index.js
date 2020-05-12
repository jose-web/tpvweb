import React from 'react'
import './estilos.css'
import Menu from './../menu'

export default class Facturas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayFacturas: []
        };
    }

    componentDidMount() {

        let url = global.url + 'muestraFacturasLocal'
        const { id } = this.props.match.params
        let arrayFacturas = []

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('id', id)

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {

                arrayFacturas.push(<tr>
                    <th>Cliente</th>
                    <th>Cuenta total</th>
                </tr>)

                for (let i = 0; i < Object.keys(res.facturas).length; i++) {

                    let id = res.facturas[i].id
                    let nombre = res.facturas[i].nombre
                    let cuentaTotal = res.facturas[i].cuentaTotal
                    let clase = i % 2 ? "diferente" : ""

                    arrayFacturas.push(<tr className={clase} idFactura={id} nombreFactura={nombre}>
                        <td>{nombre}</td>
                        <td>{cuentaTotal} €</td>
                    </tr>)

                }
                this.setState({
                    arrayFacturas: arrayFacturas
                })

            })
    }

    render() {
        return (
            <>
                <Menu />
                <section id="seccionFacturas">
                    <h1>Facturas</h1>
                    <table id="facturas">
                        {this.state.arrayFacturas}
                    </table>
                </section>
            </>
        )
    }

}
