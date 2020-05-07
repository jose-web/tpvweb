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
                    <th>
                    <td>Cliente</td>
                    </th>`
                    );
                    for (let i = 0; i < Object.keys(result.facturas).length; i++) {

                        let nombreCliente = result.facturas[i].nombreCliente;

                        $('#facturas').append(`
                        <tr>
                        <td>${nombreCliente}</td>
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