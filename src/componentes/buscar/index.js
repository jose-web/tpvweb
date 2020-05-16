import React from 'react'
import './estilos.css'
import lupa from "./search-solid.svg"

export default class Buscar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
        this.cambiaValor = this.cambiaValor.bind(this)
    }

    cambiaValor(event) {
        this.setState({
            value: event.target.value
        })
    }

    render() {
        return (
            <div id="botonBuscar">
                <input type="text" value={this.state.value} onChange={this.cambiaValor} />
                <div></div>
                <div className="busca" onClick={() => this.props.onClick(this.state.value)}><img src={lupa} alt="Buscar" /></div>
            </div>
        )
    }

}
