import React from 'react'
import './estilos.css'

export default class Button extends React.Component {

    render() {
        return (
            <input className="boton" type={this.props.submit?"submit":"button"} value={this.props.value} />
        )
    }

}
