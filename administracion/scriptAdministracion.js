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
                cambiaBotonIzquierda = 0;
                break;

            case 2:
                $("#administraEmpleados").remove();
                $("#opcionesLocal").show();
                $("h1").html("Administración");
                cambiaBotonIzquierda = 1;
                break;
        }
    });

    let cambiaBotonIzquierda = 0;
    $(document).on("click", ".administraLocal", function () {

        let idLocal = $(this).attr("idLocal");

        cambiaLocal(idLocal);
        cambiaBotonIzquierda = 1;
    });

    $("#opcionEmpleados").on("click", function () {
        $.ajax({
            url: "../REST/muestraEmpleadosLocal",
            method: 'get',
            success: function (result) {
                if (result != false) {
                    $("h1").html("Administración de los empleados");
                    $("main").append("<section id='administraEmpleados'></section>")
                    for (let i = 0; i < Object.keys(result.empleados).length; i++) {
                        let codEmpleado = result.empleados[i].codUsuario;
                        let tipo = result.empleados[i].tipo;
                        let nombre = result.empleados[i].nombre;
                        let apellido1 = result.empleados[i].apellido1;
                        let apellido2 = result.empleados[i].apellido2;

                        $("#administraEmpleados").append(`<div>
                            <p>${nombre} ${apellido1} ${apellido2}</p>
                            <select class="tipoEmpleado" codEmpleado="${codEmpleado}">
                                <option value="encargado" ${tipo == "encargado" ? "selected" : ""}>encargado/a</option>
                                <option value="camarero" ${tipo == "camarero" ? "selected" : ""}>camarero/a</option>
                                <option value="cocinero" ${tipo == "cocinero" ? "selected" : ""}>cocinero/a</option>
                            </select>
                        </div>`);
                    }
                    $("#opcionesLocal").hide();
                    cambiaBotonIzquierda = 2;
                }
            }
        });
    });

    $(document).on("change", ".tipoEmpleado", function () {
        let codEmpleado = $(this).attr("codEmpleado");
        let tipo = $(this).val();
        $.ajax({
            url: `../REST/cambiaTipoEmpleado/${codEmpleado}/${tipo}`,
            method: 'get',
            success: function (result) {
            }
        });
    })

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

function cambiaLocal(idLocal) {
    $.ajax({
        url: "../REST/cambiaLocal/" + idLocal,
        method: 'get',
        success: function (result) {
            $("#opciones").hide();
            $("#opcionesLocal").show();
            $("h1").html("Administración");
        }
    });
}

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
                } else if (numeroDeLocales == 1) {
                    let id = result.locales[0].id;
                    cambiaLocal(id)
                }
            }
        }
    });
}
