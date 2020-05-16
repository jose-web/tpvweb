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
        this.onSubmit = this.onSubmit.bind(this)

    }

    cambiaValor(event) {
        this.setState({
            value: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault()
        this.props.onClick(this.state.value)
    }

    render() {
        return (
            <form id="botonBuscar" onSubmit={this.onSubmit}>
                <input type="text" value={this.state.value} onChange={this.cambiaValor} />
                <div></div>
                <button type="submit" className="busca"><img src={lupa} alt="Buscar" /></button>
            </form>
        )
    }

}
