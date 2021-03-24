drop database if exists tpvweb;

# CREACIÓN DE LA BASE DE DATOS
create database tpvweb;

# USAMOS LA BASE DE DATOS TPVWEB
use tpvweb;

create table usuario (
    codUsuario int primary key auto_increment,
    nombre varchar(20) unique not null,
    pass varchar(32) not null
);

create table factura (
    codFactura int primary key auto_increment,
    nombreFactura varchar(20) default "Factura sin nombre"
);

create table lineaDeFactura (
    codLineaDeFactura int primary key auto_increment,
    codFactura int,
	nombreProducto varchar(20) not null,
    precio double(6,2) not null,
    cantidad int not null,
    fecha datetime default now(),
    
	foreign key lineaDeFactura_factura(codFactura) 
		references factura(codFactura)
		on delete no action 
		on update cascade
);

create table producto (
    codProducto int primary key auto_increment,
	nombre varchar(20) not null,
    precio double(6,2) not null,
    grupo varchar(20) not null
);

delimiter $$

create procedure login(nombre varchar(20), pass varchar(32))
begin
	select * 
    from usuario 
    where usuario.nombre = nombre
		and usuario.pass = pass;
end $$

create procedure mostrarFacturas()
begin
	select 
		factura.codFactura as codFactura, 
		nombreFactura as nombre, 
        sum(precio * cantidad) as factura, 
        min(fecha) as fecha
    from factura join lineaDeFactura
		on factura.codFactura = lineaDeFactura.codFactura
	group by factura.codFactura;
end $$

create procedure mostrarFactura(codFacturaMostrar int)
begin
	select nombreProducto, precio, cantidad, fecha
    from factura join lineaDeFactura
		on factura.codFactura = lineaDeFactura.codFactura
	where factura.codFactura = codFacturaMostrar;
end $$

create procedure mostrarProductos()
begin
	select *
    from producto;
end $$

create procedure nuevoProducto(nombre varchar(20), precio double(6,2), grupo varchar(20))
begin
	insert into producto(nombre, precio, grupo) 
    values(nombre,precio,grupo);
end $$

create procedure insertarProductoEnFactura(codFactura int, nombre varchar(20), precio double(6,2), cantidad int)
begin
	insert into lineaDeFactura(codFactura,nombreProducto,precio,cantidad) 
    values(codFactura,nombre,precio,cantidad);
end $$
