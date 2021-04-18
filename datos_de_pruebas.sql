use tpvweb;

insert into usuario(nombre,pass) values('jose',md5('jose'));

call nuevoProducto('cocacola',1.10,'bebidas');
call nuevoProducto('cocacola light',1.10,'bebidas');
call nuevoProducto('fanta de naranja',1.10,'bebidas');
call nuevoProducto('huevos rellenos',1.10,'tapas');

call editarProducto(1, 'coca-cola', 2, 'bebidas');

call insertarProductoEnFactura(1,"cocacola",1.10,2);
call insertarProductoEnFactura(1,"fanta",1.20,1);

call mostrarFacturas();

call mostrarFactura(1);

call editarNombreFactura(1, 'paco')