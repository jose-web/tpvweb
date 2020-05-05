$('#formularioLogin').submit(function () {
    $.ajax({
        url: "REST/login",
        method: 'post',
        data: {
            email: $('#usuario').val(),
            pass: $('#clave').val()
        },
        success: function (result) {
            if (result.usuario) {
                console.log("bien")
            } else {
                console.log("mal")
            }
        }
    });
    $('#clave').val("")
    return false;
});