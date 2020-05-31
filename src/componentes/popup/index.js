import React from 'react'
import './estilos.scss'
import { ReactComponent as Cerrar } from './times-circle-solid.svg'

export default class Popup extends React.Component {
    render() {
        return (
            <>
                <input type="checkbox" id="activaPopup" checked={this.props.estado} readOnly/>
                <div id="fondoPopup">
                    <div id="popup">
                        <div id="arribaPopup"><label id="cierraPopup" onClick={this.props.cambiaEstadoPopup} ><Cerrar /></label></div>
                        {this.props.contenido}
                    </div>
                    <label id="fondoLabelPopup" onClick={this.props.cambiaEstadoPopup}></label>
                </div>
            </>
        )
    }
}
