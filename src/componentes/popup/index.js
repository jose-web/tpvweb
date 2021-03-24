import React from 'react'
import './estilos.scss'

export default class Popup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div id="contenedorPopup" >
                <div id="popup" >
                    {this.props.contenido}
                </div>
                <div id="fondoPopup" onClick={this.props.cerrar}></div>
            </div>
        )
    }
}