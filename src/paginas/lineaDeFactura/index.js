import React from 'react'
import './estilos.scss'
import { Link, Redirect } from "react-router-dom"
import Menu from '../../componentes/menu'

export default class LineaDeFactura extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            codFactura: props.match.params.codFactura
        };
    }

    componentDidMount() {
        let usuario = JSON.parse(localStorage.getItem("usuario"))

        if (!Number(this.state.codFactura)) {
            this.setState({ redireccionar: true })
            return 0;
        }

        let url = global.url + 'mostrarFactura';

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);
        data.append('codFactura', this.state.codFactura);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                let arrayLineaDeFactura = [<div className="producto titulo" key="-1"><p>NOMBRE</p><p title="PRECIO UNITARIO">PRECIO UNITARIO</p><p>CANTIDAD</p><p>PRECIO</p></div>]

                if (typeof res !== "undefined")
                    for (let i = 0; i < Object.keys(res.factura).length; i++) {

                        let nombreProducto = res.factura[i].nombreProducto
                        let fecha = new Date(res.factura[i].fecha)
                        let precio = res.factura[i].precio
                        let cantidad = res.factura[i].cantidad

                        arrayLineaDeFactura.push(<Link to={"/"} key={i} className="producto" title={fecha.toLocaleString()}>
                            <p>{nombreProducto}</p>
                            <p>{precio + " €"}</p>
                            <p>{cantidad}</p>
                            <p>{precio * cantidad + " €"}</p>
                        </Link>)
                    }
                this.setState({
                    arrayLineaDeFactura: arrayLineaDeFactura.slice()
                })
            });
        // **********************************************

        url = global.url + 'mostrarProductos';

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                let arrayProductos = []
                if (typeof res !== "undefined")
                    for (const grupo in res.productos) {
                        arrayProductos.push(<><input type="radio" name="productos" id={"opcion" + grupo} defaultChecked={arrayProductos.length === 0} /> <label for={"opcion" + grupo}>{grupo}</label></>)
                        let opcionesproductos = []
                        for (const producto in res.productos[grupo]) {
                            let nombre = res.productos[grupo][producto].nombre
                            let precio = res.productos[grupo][producto].precio

                            opcionesproductos.push(<div className="producto">
                                <p>{nombre}</p>
                                <p>{precio + " €"}</p>
                            </div>)
                        }
                        arrayProductos.push(<div className="contenedorProductos">
                            {opcionesproductos}
                        </div>)

                    }

                this.setState({
                    productos: arrayProductos.slice()
                })
            });
    }

    render() {
        if (this.state.redireccionar)
            return <Redirect to="/facturas" />
        return (
            <div id="lineaDeFactura" >
                <Menu />
                <div id="factura">{this.state.arrayLineaDeFactura}</div>
                <div id="productos">{this.state.productos}</div>
            </div>
        )
    }
}