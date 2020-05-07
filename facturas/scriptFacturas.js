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
                    console.log(result)
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
                        let clase = i%2?"class='diferente'":"";
                        $('#facturas').append(`
                        <tr ${clase}>
                        <td>${nombre}</td>
                        <td>${cuentaTotal}</td>
                        </tr>`
                        );

                    }

                }
            }
        });
    }

    let resultantiguo;
    muestraFacturas();
    setInterval(muestraFacturas, 2000);

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