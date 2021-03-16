use tpvweb;

insert into usuario(nombre,pass) values('jose',md5('jose'));

insert into factura(codFactura) values(1);

insert into lineaDeFactura(codFactura,nombreProducto,precio,cantidad) values(1,"cocacola",1.10,2),(1,"fanta",1.20,1);

call mostrarFactura(1)