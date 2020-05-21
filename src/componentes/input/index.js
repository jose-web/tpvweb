import React from 'react'
import './estilos.scss'

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
        this.cambia = this.cambia.bind(this)
    }

    cambia(event) {
        this.props.cambia(event.target.value)
        this.setState({
            value: event.target.value
        })
    }


    render() {
        let unionClave = this.state.value !== "" ? "activo" : ""
        return (
            <div className="input">
                <input type={this.props.pass ? "password" : this.props.email ? "email" : "text"} id={this.props.label} onChange={this.cambia} required />
                <label htmlFor={this.props.label} className={unionClave}>{this.props.label}</label>
            </div>
        )
    }

}
