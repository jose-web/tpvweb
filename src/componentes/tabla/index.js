import React from 'react'
import './estilos.css'

export default class Tabla extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayTitulo: [],
            arrayFilas: []
        };
    }

    componentDidUpdate(propsAntiguas) {
        if (this.props.datos !== propsAntiguas.datos) {
            let arrayTitulo = []
            let arrayFilas = []
            let datos = this.props.datos

            let fila = []
            for (let i = 0; i < datos[0].length; i++) {
                fila.push(<th key={i}>{datos[0][i]}</th>)
            }
            arrayTitulo.push(<tr key="0">{fila}</tr>)


            for (let i = 1; i < datos.length; i++) {
                fila = []
                for (let o = 1; o < datos[i].length; o++) {
                    fila.push(<td key={i + o}>{datos[i][o]}</td>)
                }

                arrayFilas.push(
                    <tr tabIndex="0" key={datos[i][0]} className={i % 2 ? "" : "diferente"} onClick={() => this.props.onClick(datos[i][0])}>{fila}</tr>
                )

            }

            this.setState({
                arrayTitulo: arrayTitulo.slice(),
                arrayFilas: arrayFilas.slice()
            })
        }
    }

    render() {
        return (
            <article class="contieneTabla">
                <table className="tabla">
                    <thead>
                        {this.state.arrayTitulo}
                    </thead>
                    <tbody>
                        {this.state.arrayFilas}
                    </tbody>
                </table>
            </article>
        )
    }

}
