$(function () {

    $.ajax({
        url: "../REST/compruebaSesion",
        method: 'get',
        success: function (result) {
            if (!result.respuesta) {
                location.href = "..";
            } else {
                $("#pantallaDeCarga").remove();
            }
        }
    });
});