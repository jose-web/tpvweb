import React from 'react'
import './estilos.scss'

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.cambia = this.cambia.bind(this)
    }

    cambia(event) {
        this.props.cambia(event.target.value)
    }

    render() {
        let unionClave = this.props.pass ? "PASS" : this.props.label
        return (
            <div className="input">
                <input type={this.props.pass ? "password" : "text"} className={unionClave} id={unionClave} onChange={this.cambia} required />
                <label htmlFor={unionClave}>{this.props.label}</label>
            </div>
        )
    }

}
