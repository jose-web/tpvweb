import React from 'react'
import './estilos.scss'
import { ReactComponent as Izquierda } from "./chevron-left-solid.svg"
import { ReactComponent as Derecha } from "./plus-solid.svg"


export default class BotonAbajo extends React.Component {

    render() {
        return (
            <div className={this.props.derecha ? "botonAbajo botonAbajoDerecha" : "botonAbajo"} onClick={this.props.onClick}>
                {this.props.derecha ? <Derecha /> : <Izquierda />}
            </div>
        )
    }

}
