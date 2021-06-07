use tpvweb;

call nuevoUsuario('jose',md5('jose'));

call nuevoProducto('cocacola',1.10,'bebidas');
call nuevoProducto('cocacola light',1.10,'bebidas');
call nuevoProducto('fanta de naranja',1.10,'bebidas');
call nuevoProducto('huevos rellenos',1.10,'tapas');

call editarProducto(1, 'coca-cola', 2,'1.png', 'bebidas');

call insertarProductoEnFactura(1,"cocacola",1.10,2);
call insertarProductoEnFactura(1,"fanta",1.20,1);

call mostrarFacturas();

call mostrarFactura(1);

call editarNombreFactura(1, 'paco');

call nuevaMesa('Mesa 1', 15, 15, 75, 10, 1);
call nuevaMesa('Mesa 2', 15, 15, 60, 10, null);
call nuevaMesa('Mesa 3', 15, 15, 45, 10, null);
call nuevaMesa('Mesa 4', 15, 15, 75, 75, null);
call nuevaMesa('Mesa 5', 15, 15, 60, 75, null);
call nuevaMesa('Mesa 6', 15, 15, 45, 75, null);