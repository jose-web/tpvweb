$(function () {

    $.ajax({
        url: "../REST/compruebaSesion",
        method: 'get',
        success: function (result) {
            if (result.respuesta) {
                location.href = "../locales";
            }
            $("body").fadeIn();
        }
    });

    $('#formularioLogin').submit(function () {
        $.ajax({
            url: "../REST/login",
            method: 'post',
            data: {
                email: $('#usuario').val(),
                pass: $('#clave').val()
            },
            success: function (result) {
                if (result.login) {
                    location.href = "../locales";
                } else {
                    $('#mensaje').html("Usuario y contraseña incorrectos")
                }
            }
        });
        $('#clave').val("")
        return false;
    });
});