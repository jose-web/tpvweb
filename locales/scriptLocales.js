$(function () {

    $.ajax({
        url: "../REST/compruebaSesion",
        method: 'get',
        success: function (result) {
            if (!result.respuesta)
                location.href = "..";
            else
                $("body").fadeIn();
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

                    $('#locales').append(`<div class="irFacura" idLocal="${id}">
                    <strong>${nombreEmpresa}</strong>
                    <p>${nombreLocal}</p>
                    <p>${direccion}</p>
                    </div>`)

                }

            }
        }
    });

});

$("#cerrarSesion").on("click", function () {
    $.ajax({
        url: "../REST/cerrarSesion",
        method: 'get',
        success: function (result) {
            location.href = "..";
        }
    });
});



$(document).on('click', '.irFacura', function () {
    let idLocal = $(this).attr("idLocal");

    $.ajax({
        url: "../REST/cambiaLocal/" + idLocal,
        method: 'get',
        success: function (result) {
            console.log(result);
            location.href = "../facturas";
        }
    });
});