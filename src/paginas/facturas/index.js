import React from 'react'
import './estilos.scss'
import Menu from '../../componentes/menu'

export default class Facturas extends React.Component {

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

        let url = global.url + 'mostrarFacturas';

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                console.log(res.facturas)
                let arrayFacturas = []

                if (typeof res !== "undefined")
                    for (let i = 0; i < Object.keys(res.facturas).length; i++) {

                        let id = res.facturas[i].codFctura
                        let fecha = new Date(res.facturas[i].fecha)
                        let nombre = res.facturas[i].nombre
                        let cuentaTotal = res.facturas[i].factura

                        arrayFacturas.push(<div className="factura" title={fecha.toLocaleString()}>
                            <p>{nombre}</p>
                            <p>{cuentaTotal + " €"}</p>
                        </div>)
                    }
                this.setState({
                    arrayFacturas: arrayFacturas.slice()
                })
            });
    }

    render() {
        return (
            <div id="facturas" >
                <Menu />
                {this.state.arrayFacturas}
            </div>
        )
    }

}