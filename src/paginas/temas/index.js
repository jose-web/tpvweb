import React from 'react'
import './estilos.scss'
import Menu from '../../componentes/menu'
import { Redirect } from "react-router-dom"

export default class Locales extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayLocales: [],
            redireccionar: false
        };
    }

    cambiarTema($tema) {
        let tema = ""
        switch ($tema) {
            case "azul":
                tema = `--color1: #18116f;--color2: #2B3777;--color3: #4C56EA;--color4: #4E76F0;--color5: #C1C7FB;`
                break

            case "rojo":
                tema = `--color1: #b31414;--color2: #BD4545;--color3: #E85555;--color4: #F56969;--color5: #FBD3D3;`
                break

            case "rosa":
                tema = `--color1: #b30097;--color2: #D63CB7;--color3: #F255E8;--color4: #F5AEED;--color5: #FDE5FF;`
                break

            case "verde":
                tema = `--color1: #177a03;--color2: #369B1A;--color3: #58AA3A;--color4: #8FEB65;--color5: #DEF9D4;`
                break

            default:
                tema = ""
        }

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let url = global.url + 'actualizaDatosUsuario';

        let data = new FormData();
        data.append("email", usuario.email);
        data.append("pass", usuario.pass);
        data.append("tema", tema);

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                if (res.usuario) {
                    document.body.style = tema
                }
            });
    }

    render() {
        if (this.state.redireccionar)
            return <Redirect to="/facturas" />
        return (
            <>
                <Menu estoyEn="temas" />
                <section id="locales">
                    <h1>Temas</h1>
                    <article onClick={() => this.cambiarTema("azul")} tabIndex="0">
                        Azul
                    </article>
                    <article onClick={() => this.cambiarTema("rojo")} tabIndex="0">
                        Rojo
                    </article>
                    <article onClick={() => this.cambiarTema("rosa")} tabIndex="0">
                        Rosa
                    </article>
                    <article onClick={() => this.cambiarTema("verde")} tabIndex="0">
                        Verde
                    </article>
                    <article onClick={() => this.cambiarTema("")} tabIndex="0">
                        Blanco y negro (Por defecto)
                    </article>
                </section>
            </>
        )
    }
}