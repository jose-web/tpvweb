import React from 'react'
import './estilos.scss'

export default class Button extends React.Component {
    render() {
        let nombre = this.props.nombre
        let submit = this.props.submit
        return (
            <input type={submit?"submit":"button"} className="botonFormulario" value={nombre} />
        )
    }

}