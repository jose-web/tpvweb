import React from 'react'
import './estilos.scss'
import { ReactComponent as Lupa } from "./search-solid.svg"

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
                <input type="text" value={this.state.value} onChange={this.cambiaValor} placeholder="Buscar"/>
                <div></div>
                <button type="submit" className="busca"><Lupa /></button>
            </form>
        )
    }

}
