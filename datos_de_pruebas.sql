use tpvweb;

insert into usuario(nombre,pass) values('jose',md5('jose'));

insert into factura(codFactura) values(1);

call nuevoProducto('cocacola',1.10,'bebidas');
call nuevoProducto('cocacola light',1.10,'bebidas');
call nuevoProducto('fanta de naranja',1.10,'bebidas');
call nuevoProducto('huevos rellenos',1.10,'tapas');

insert into lineaDeFactura(codFactura,nombreProducto,precio,cantidad) values(1,"cocacola",1.10,2),(1,"fanta",1.20,1);

call mostrarFacturas();

call mostrarFactura(1);