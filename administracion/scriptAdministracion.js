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

    $("#botonIzquierda").on("click", function () {
        location.href = "..";
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

});

