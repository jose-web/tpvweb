$(function() {
    $.ajax({
        url: "../REST/cerrarSesion",
        method: 'get',
        success: function (result) {
            location.href = "..";
        }
    });
});