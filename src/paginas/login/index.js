import React from 'react'
import './estilos.scss'

import { Redirect } from "react-router-dom"
import md5 from 'md5'
import Input from "../../componentes/input"
import Button from "../../componentes/button"

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redireccionar: false
        };
    }

    render() {
        if (this.state.redireccionar)
            return <Redirect to="/locales" />

        return (
            <div id="login" >
                <h1>TPVWEB</h1>
                <from>
                    <Input nombre="NOMBRE" />
                    <Input nombre="CONTRASEÑA" pass />
                    <Button nombre="ENTRAR" />
                </from>
            </div>
        )
    }

}