import React from 'react'
import './estilos.css'
import izquierda from "./chevron-left-solid.svg"
import derecha from "./plus-solid.svg"

export default class BotonAbajo extends React.Component {

    render() {
        return (
            <div className={this.props.derecha ? "botonAbajo botonAbajoDerecha" : "botonAbajo"} onClick={this.props.onClick}>
                <img src={this.props.derecha ? derecha : izquierda} alt={this.props.derecha ? "Añadir" : "Atrás"} />
            </div>
        )
    }

}
