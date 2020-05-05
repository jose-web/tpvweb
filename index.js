$(function() {
    $.ajax({
        url: "REST/compruebaSesion",
        method: 'get',
        success: function (result) {
            if (result.respuesta) {
                location.href = "locales";
            } else {
                location.href = "login";
            }
        }
    });
});