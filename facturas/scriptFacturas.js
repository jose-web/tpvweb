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

    function muestraFacturas() {

        $.ajax({
            url: "../REST/muestraFacturasLocal",
            method: 'get',
            success: function (result) {
                if (result.facturas != false && resultantiguo != JSON.stringify(result)) {
                    resultantiguo = JSON.stringify(result);
                    $('#facturas').html("");
                    $('#facturas').append(`
                    <tr>
                    <th>Cliente</th>
                    <th>Cuenta total</th>
                    </tr>`
                    );
                    for (let i = 0; i < Object.keys(result.facturas).length; i++) {

                        let id = result.facturas[i].id;
                        let nombre = result.facturas[i].nombre;
                        let cuentaTotal = result.facturas[i].cuentaTotal;
                        let clase = i % 2 ? "class='diferente'" : "";
                        $('#facturas').append(`
                        <tr ${clase} idFactura="${id}" nombreFactura="${nombre}">
                        <td>${nombre}</td>
                        <td>${cuentaTotal} €</td>
                        </tr>`
                        );
                    }
                }
            }
        });
    }


    function muestraLineaDeFactura(idFactura) {

        $.ajax({
            url: "../REST/muestraProductosFactura/" + idFactura,
            method: 'get',
            success: function (result) {
                if (result.productos != false && resultantiguo != JSON.stringify(result)) {
                    let cuentaTotal = 0;
                    resultantiguo = JSON.stringify(result);
                    $('#LineaDeFactura').html("");
                    $('#LineaDeFactura').append(`
                    <tr>
                    <th>Cliente</th>
                    <th>Cantidad</th>
                    <th>Precio unitario</th>
                    <th>Precio total</th>
                    <th>Comentario</th>
                    </tr>`
                    );
                    for (let i = 0; i < Object.keys(result.productos).length; i++) {

                        let id = result.productos[i].codLinea;
                        let nombre = result.productos[i].nombre;
                        let cantidad = result.productos[i].cantidad;
                        let precio = result.productos[i].precio;
                        let comentario = result.productos[i].comentario;
                        let clase = i % 2 ? "class='diferente'" : "";
                        cuentaTotal += precio * cantidad;
                        $('#LineaDeFactura').append(`
                        <tr ${clase} idFactura="${id}">
                        <td>${nombre}</td>
                        <td>${cantidad}</td>
                        <td>${precio} €</td>
                        <td>${(precio * cantidad).toFixed(2)} €</td>
                        <td>${comentario == null ? "" : comentario}</td>
                        </tr>`
                        );
                    }
                    $("#cuentaTotal").html(cuentaTotal.toFixed(2) + " €")
                }
            }
        });
    }

    let resultantiguo;
    muestraFacturas();
    let facturas = setInterval(muestraFacturas, 2000);
    let lineaDeFactura;

    $("#facturas").on('click', 'tr', function () {
        let idFactura = $(this).attr("idFactura");
        let nombreFactura = $(this).attr("nombreFactura");
        if (typeof idFactura != "undefined") {
            $("#seccionFacturas").hide();
            $('#seccionLineaDeFactura').css('display', 'flex');
            clearInterval(facturas);

            muestraLineaDeFactura(idFactura);
            lineaDeFactura = setInterval(function () { muestraLineaDeFactura(idFactura) }, 2000);

            $("#nombreFactura").html(nombreFactura);
        }
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