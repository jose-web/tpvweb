import React from 'react'
import './estilos.scss'
import Menu from '../../componentes/menu'
import Button from "../../componentes/button"
import { Redirect } from "react-router-dom"

export default class Locales extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayLocales: [],
            redireccionar: false,
            color1: '#262626',
            color2: '#5E5E5E',
            color3: '#B5B5B5',
            color4: '#C4C4C4',
            color5: '#EEEEEE',
            color6: '#FFFFFF',
            color7: '#AA3838',
            color8: '#88BA69'
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

            case "personalizado":
                tema = "--color1:" + this.state.color1 + ";--color2:" + this.state.color2 + ";--color3:" + this.state.color3 + ";--color4:" + this.state.color4 + ";--color5:" + this.state.color5 + ";--color6:" + this.state.color6 + ";--color7:" + this.state.color7 + ";--color8:" + this.state.color8 + ";"
                break

            default:
                tema = "porDefecto"
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

    cambiaEstado($valor, $nombre) {
        let objaux = {}
        objaux[$nombre] = $valor
        this.setState(
            objaux
        )
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

                    <form id="personalizacionColores" onSubmit={(evento) => { evento.preventDefault(); this.cambiarTema("personalizado") }}>
                        <h3>COLORES PERSONALIZADOS</h3>
                        <label htmlFor="color1" id="contieneColor1" style={{ "--color1": this.state.color1 }} >Color1: {this.state.color1} <span /> </label>
                        <input type="color" id="color1" onChange={($valor) => this.cambiaEstado($valor.target.value, "color1")} />

                        <label htmlFor="color2" id="contieneColor2" style={{ "--color2": this.state.color2 }}>Color 2: {this.state.color2}<span /></label>
                        <input type="color" id="color2" onChange={($valor) => this.cambiaEstado($valor.target.value, "color2")} />

                        <label htmlFor="color3" id="contieneColor3" style={{ "--color3": this.state.color3 }}>Color 3: {this.state.color3}<span /></label>
                        <input type="color" id="color3" onChange={($valor) => this.cambiaEstado($valor.target.value, "color3")} />

                        <label htmlFor="color4" id="contieneColor4" style={{ "--color4": this.state.color4 }}>Color 4: {this.state.color4}<span /></label>
                        <input type="color" id="color4" onChange={($valor) => this.cambiaEstado($valor.target.value, "color4")} />

                        <label htmlFor="color5" id="contieneColor5" style={{ "--color5": this.state.color5 }}>Color 5: {this.state.color5}<span /></label>
                        <input type="color" id="color5" onChange={($valor) => this.cambiaEstado($valor.target.value, "color5")} />

                        <label htmlFor="color6" id="contieneColor6" style={{ "--color6": this.state.color6 }}>Color 6: {this.state.color6}<span /></label>
                        <input type="color" id="color6" onChange={($valor) => this.cambiaEstado($valor.target.value, "color6")} />

                        <label htmlFor="color7" id="contieneColor7" style={{ "--color7": this.state.color7 }}>Color 7: {this.state.color7}<span /></label>
                        <input type="color" id="color7" onChange={($valor) => this.cambiaEstado($valor.target.value, "color7")} />

                        <label htmlFor="color8" id="contieneColor8" style={{ "--color8": this.state.color8 }}>Color 8: {this.state.color8}<span /></label>
                        <input type="color" id="color8" onChange={($valor) => this.cambiaEstado($valor.target.value, "color8")} />
                        <Button value="UTILIZAR TEMA PERSONALIZADO" submit />
                    </form>
                </section>
            </>
        )
    }
}