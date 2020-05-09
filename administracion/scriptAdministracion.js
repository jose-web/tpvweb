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

    muestraLocalesEncargado();

    $("#botonIzquierda").on("click", function () {
        switch (cambiaBotonIzquierda) {
            case 0:
                location.href = "..";
                break;
            case 1:
                muestraLocalesEncargado();

                $("h1").html("Locales que puedes administrar");
                $("#opcionesLocal").hide();
                $("#opciones").show();
                break;

        }

    });

    let cambiaBotonIzquierda = 0;
    $(document).on("click", ".administraLocal", function () {
        $("#opciones").hide();
        $("#opcionesLocal").show();
        $("h1").html("Administración");
        cambiaBotonIzquierda = 1;
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


function muestraLocalesEncargado() {
    $.ajax({
        url: "../REST/muestraLocalesEncargado",
        method: 'get',
        success: function (result) {
            if (!result.locales)
                location.href = "..";
            else {
                let numeroDeLocales = Object.keys(result.locales).length;
                if (numeroDeLocales != 1) {
                    $('#opciones').html("");
                    for (let i = 0; i < numeroDeLocales; i++) {

                        let id = result.locales[i].id;
                        let nombreEmpresa = result.locales[i].nombreEmpresa;
                        let nombreLocal = result.locales[i].nombreLocal;
                        let direccion = result.locales[i].direccion;

                        $('#opciones').append(`<div class="administraLocal" idLocal="${id}">
                        <strong>${nombreEmpresa}</strong>
                        <p>${nombreLocal}</p>
                        <p>${direccion}</p>
                        </div>`)
                    }
                }
            }
        }
    });
}
