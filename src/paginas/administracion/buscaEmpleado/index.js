import React from 'react'
import Menu from '../../../componentes/menu'
import BotonAbajo from '../../../componentes/botonAbajo'
import Buscar from '../../../componentes/buscar'
import { Redirect } from "react-router-dom"

export default class BuscaEmpleado extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayEmpleados: [],
            redireccionar: ""
        };
        this.irA = this.irA.bind(this)
        this.BuscaEmpleado = this.BuscaEmpleado.bind(this)
    }

    componentDidMount() {
        this.BuscaEmpleado("")
    }

    irA($sitio) {
        this.setState({
            redireccionar: $sitio
        })
    }

    BuscaEmpleado($valor) {
        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('codLocal', sessionStorage.getItem("idLocal"))
        data.append('busqueda', $valor)

        let url = global.url + 'buscarEmpleadosLocal'

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => { if (res.ok) return res.json() })
            .catch(error => console.error('Error:', error))
            .then(res => {
                let arrayEmpleados = []
                if (typeof res !== "undefined")
                    for (let i = 0; i < Object.keys(res.empleados).length; i++) {

                        let id = res.empleados[i].codUsuario
                        let img = res.empleados[i].img
                        let nombre = res.empleados[i].nombre
                        let apellido1 = res.empleados[i].apellido1
                        let apellido2 = res.empleados[i].apellido2
                        let tipo = res.empleados[i].tipo

                        arrayEmpleados.push(<article key={id} tabIndex="0">
                            <img src={img} alt="Perfil" />
                            <br />
                            <strong>{nombre}  {apellido1} {apellido2}</strong>
                            <br />
                            <p>{tipo !== "" ? `Ya es ${tipo}/a` : <>
                                <button onClick={() => this.contratar(id, "encargado")}>Contratar Encargado/a</button>
                                <button onClick={() => this.contratar(id, "camarero")}>Contratar Camarero/a</button>
                                <button onClick={() => this.contratar(id, "cocinero")}>Contratar Cocinero/a</button>
                            </>}</p>
                        </article>)
                    }
                this.setState({
                    arrayEmpleados: arrayEmpleados.slice()
                })

            })
    }

    contratar($id, $tipo) {

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)
        data.append('codLocal', sessionStorage.getItem("idLocal"))
        data.append('codUsuarioEmpleado', $id)
        data.append('tipo', $tipo)


        let url = global.url + 'contratarEmpleado'

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => { if (res.ok) return res.json() })
            .catch(error => console.error('Error:', error))

        this.irA("/administracion/empleados")
    }

    render() {
        if (this.state.redireccionar !== "") {
            clearInterval(this.state.intervalo)
            return <Redirect to={this.state.redireccionar} />
        }

        return (
            <>
                <Menu estoyEn="administracion" />
                <section id="seccionLocalAdministracion">
                    <h1>Búsqueda de empleados</h1>
                    <Buscar onClick={this.BuscaEmpleado} />
                    {this.state.arrayEmpleados}
                </section>
                <BotonAbajo onClick={() => this.irA("/administracion/empleados")} />
            </>
        )
    }
}
