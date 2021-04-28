import React from 'react'
import './estilos.scss'

export default class Productos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let url = global.url + 'mostrarProductos';

        let data = new FormData();
        data.append('email', usuario.email);
        data.append('pass', usuario.pass);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                let arrayProductos = []
                if (typeof res !== "undefined")
                    for (const grupo in res.productos) {
                        arrayProductos.push(<React.Fragment key={"opcion" + grupo}><input type="radio" name="productos" id={"opcion" + grupo} defaultChecked={arrayProductos.length === 0} /> <label htmlFor={"opcion" + grupo}>{grupo}</label></React.Fragment>)
                        let opcionesproductos = this.props.nuevo ? [<div key="-1" className="producto" onClick={() => this.props.nuevo(grupo)}>+</div>] : []

                        for (const producto in res.productos[grupo]) {
                            let codProducto = res.productos[grupo][producto].codProducto
                            let nombre = res.productos[grupo][producto].nombre
                            let precio = res.productos[grupo][producto].precio
                            let imagen = global.url + "img/productos/" + res.productos[grupo][producto].img

                            opcionesproductos.push(<div
                                key={producto}
                                className="producto" onClick={() => this.props.izquierdo(nombre, precio, 1, codProducto, grupo)}
                                onContextMenu={(event) => {
                                    event.preventDefault();
                                    this.props.derecho(nombre, precio, 1)
                                }}
                            >
                                <img src={imagen} alt={nombre} loading="lazy" />
                                <p>{nombre}</p>
                                <p>{precio + " €"}</p>
                            </div>)
                        }
                        arrayProductos.push(<div key={grupo + "pie"} className="opcionElegida">
                            <div className="contenedorProductos">
                                {opcionesproductos}
                            </div>
                        </div>)

                    }

                this.setState({
                    productos: arrayProductos.slice()
                })
            });
    }

    render() {
        return (
            <div id="productos">
                {this.state.productos}
            </div>
        )
    }
}