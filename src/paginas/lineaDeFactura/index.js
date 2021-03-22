import React from 'react'
import './estilos.scss'
import Menu from '../../componentes/menu'

export default class LineaDeFactura extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            codFactura: props.match.params.codFactura
        };
    }

    render() {
        return (
            <div id="lineaDeFactura" >
                <Menu />
                {this.state.codFactura}
            </div>
        )
    }
}