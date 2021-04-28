import React from 'react'
import './estilos.scss'

export default class Input extends React.Component {
    render() {
        let nombre = this.props.nombre
        let inputID = "input" + nombre
        let value = this.props.value
        let focus = this.props.focus

        let pass = this.props.pass
        let file = this.props.file

        let tipo = () => {
            if (pass)
                return "password"
            if (file)
                return "file"
            return "text"
        }

        return (
            <div className="input">
                <label htmlFor={inputID}>{nombre + ":"}</label>
                <input type={tipo()} id={inputID} name={inputID} defaultValue={value} autoFocus={focus} />
            </div>
        )
    }

}