import React from 'react'
import './estilos.scss'

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value ? this.props.value : ""
        }
        this.cambia = this.cambia.bind(this)
    }

    cambia(event) {
        this.props.cambia(this.props.file ? event.target.files[0] : event.target.value)
        this.setState({
            value: event.target.value
        })
    }

    componentDidUpdate() {
        if (typeof this.props.value !== "undefined" && this.state.value !== this.props.value)
            this.setState({ value: this.props.value })
    }

    render() {
        let unionClave = this.state.value !== "" ? "activo" : ""
        return (
            <div className="input">
                {this.props.file ?
                    <>
                        <input type="file" id={this.props.label} onChange={this.cambia} accept="image/*" />
                        <label htmlFor={this.props.label} className="labelImagen">{this.state.value.split("\\")[this.state.value.split("\\").length - 1]}</label>
                    </>
                    :
                    <input type={this.props.pass ? "password" : this.props.email ? "email" : "text"} id={this.props.label} onChange={this.cambia} defaultValue={this.state.value} required />
                }
                <label htmlFor={this.props.label} className={"animaLabel " + unionClave}>{this.props.label}</label>
            </div>
        )
    }
}
