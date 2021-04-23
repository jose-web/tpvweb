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
    nombreFactura varchar(20) default "Factura sin nombre",
    displonible bool default true
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

create procedure mostrarUsuarios()
begin
	select codUsuario, nombre
    from usuario;
end $$

create procedure editarUsuario(codigoUsuario int, nuevoNombre varchar(20))
begin
	update usuario
		set nombre = nuevoNombre
	where codUsuario = codigoUsuario;
end $$

create procedure mostrarFacturas()
begin
	select
		factura.codFactura as codFactura,
		nombreFactura as nombre,
        sum(precio * cantidad) as factura,
        min(fecha),now() as fecha
    from factura left join lineaDeFactura
		on factura.codFactura = lineaDeFactura.codFactura
	where displonible = true
	group by factura.codFactura
    order by min(fecha) desc;
end $$

create procedure mostrarTodasFacturas()
begin
	select
		factura.codFactura as codFactura,
		nombreFactura as nombre,
        sum(precio * cantidad) as factura,
        min(fecha),now() as fecha,
        displonible
    from factura left join lineaDeFactura
		on factura.codFactura = lineaDeFactura.codFactura
	group by factura.codFactura
    order by min(fecha) desc;
end $$

create procedure mostrarFactura(codFacturaMostrar int)
begin
	select nombreProducto, precio, cantidad, fecha
    from factura join lineaDeFactura
		on factura.codFactura = lineaDeFactura.codFactura
	where factura.codFactura = codFacturaMostrar
    order by fecha desc;
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

create procedure insertarProductoEnFactura(buscaCodFactura int, nombre varchar(20), precio double(6,2), cantidad int)
begin
	start transaction;

	select ISNULL(codFactura), codFactura into @existe, @codigoFactura
    from factura 
    where codFactura = buscaCodFactura;
    
    if @existe is null then
		insert into factura(nombreFactura) values('Factura sin nombre');

        select max(codFactura) into @codigoFactura 
		from factura;
	end if;

    insert into lineaDeFactura(codFactura,nombreProducto,precio,cantidad) 
    values(@codigoFactura,nombre,precio,cantidad);

	select @codigoFactura as codFactura;

    commit;
end $$

create procedure editarNombreFactura(factura int, nombre varchar(20))
begin
	update factura 
	set nombreFactura = nombre
	where codFactura = factura;
end $$

create procedure ocultarFactura(codFacturaMostrar int)
begin
    update factura 
    set displonible = false 
    where codFactura = codFacturaMostrar;
end $$

create procedure editarProducto(producto int, nombre varchar(20), precio double(6,2), grupo varchar(20))
begin
    update producto 
    set 
		nombre = nombre , 
		precio = precio,
        grupo = grupo
    where codProducto = producto;
end $$