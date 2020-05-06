$(function () {

    $.ajax({
        url: "../REST/compruebaSesion",
        method: 'get',
        success: function (result) {
            if (!result.respuesta) {
                location.href = "..";
            }
        }
    });



    $.ajax({
        url: "../REST/buscaLocales",
        method: 'get',
        success: function (result) {
            if (result.locales != false) {
                for (let i = 0; i < Object.keys(result.locales).length; i++) {

                    let id = result.locales[i].id;
                    let nombreEmpresa = result.locales[i].nombreEmpresa;
                    let nombreLocal = result.locales[i].nombreLocal;
                    let direccion = result.locales[i].direccion;

                    $('#locales').append(`<a href="../local/${id}">
                    <strong>${nombreEmpresa}</strong>
                    <p>${nombreLocal}</p>
                    <p>${direccion}</p>
                    </a>`)

                }

            }
        }
    });

});