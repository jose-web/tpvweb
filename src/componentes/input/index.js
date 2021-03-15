import React from 'react'
import './estilos.scss'

export default class Input extends React.Component {
    render() {
        let nombre = this.props.nombre
        let inputID = "input" + nombre

        let pass = this.props.pass
        return (
            <div className="input">
                <label htmlFor={inputID}>{nombre+":"}</label>
                <input type={pass?"password":"text"} id={inputID} name={inputID} />
            </div>
        )
    }

}