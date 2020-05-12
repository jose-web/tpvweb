import React from 'react'

export default class Locales extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayLocales: []
        };
    }

    componentWillMount() {

        let url = 'http://localhost/tpvweb/REST/buscaLocales';
        let arrayLocales = []

        let usuario = JSON.parse(localStorage.getItem("usuario"))

        let data = new FormData()
        data.append('email', usuario.email)
        data.append('pass', usuario.pass)

        fetch(url, {
            method: 'POST',
            body: data,

        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {

                for (let i = 0; i < Object.keys(res.locales).length; i++) {

                    let id = res.locales[i].id;
                    let nombreEmpresa = res.locales[i].nombreEmpresa;
                    let nombreLocal = res.locales[i].nombreLocal;
                    let direccion = res.locales[i].direccion;

                    arrayLocales.push(<div key={id}>
                        <strong>{nombreEmpresa}</strong>
                        <p>{nombreLocal}</p>
                        <p>{direccion}</p>
                    </div>)

                }
                this.setState({
                    arrayLocales: arrayLocales
                })

            });
    }


    render() {
        return (
            <>
                {this.state.arrayLocales}
            </>
        )
    }

}