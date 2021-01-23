import React from 'react'
import './estilos.scss'

export default class Button extends React.Component {
    render() {
        let nombre = this.props.nombre
        return (
            <input type="submit" className="botonFormulario" value={nombre} />
        )
    }

}