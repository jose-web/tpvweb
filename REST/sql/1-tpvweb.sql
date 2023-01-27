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

create table mesa (
    codMesa int primary key auto_increment,
    nombreMesa varchar(20) default "Mesa -1",
    alto int not null,
    ancho int not null,
    posArriba int not null,
    posIzquierda int not null,
    codFactura int null,
    
    foreign key mesa_factura(codFactura) 
		references factura(codFactura)
		on delete no action 
		on update cascade
);

create table producto (
    codProducto int primary key auto_increment,
	nombre varchar(20) not null,
    precio double(6,2) not null,
    img varchar(20) not null default 'sin_imagen.jpg',
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

create procedure nuevoUsuario(nuevoNombre varchar(20),nuevaPass varchar(50))
begin
	insert into usuario(nombre,pass) 
    values(nuevoNombre,nuevaPass);
end $$

create procedure editarUsuario(codigoUsuario int, nuevoNombre varchar(20))
begin
	update usuario
		set nombre = nuevoNombre
	where codUsuario = codigoUsuario;
end $$

create procedure eliminarUsuario(codigoUsuario int)
begin
	delete from usuario
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

create procedure mostrarFacturaSimplificada(codFacturaMostrar int)
begin
	select nombreProducto, precio, sum(cantidad) as cantidad, max(fecha) as fecha
    from factura join lineaDeFactura
		on factura.codFactura = lineaDeFactura.codFactura
	where factura.codFactura = codFacturaMostrar
    group by nombreProducto, precio
		having sum(cantidad) > 0
    order by nombreProducto asc;
end $$

create procedure mostrarProductos()
begin
	select *
    from producto;
end $$

create procedure nuevoProducto(nombre varchar(20), precio double(6,2), grupo varchar(20))
begin
	start transaction;
    
	insert into producto(nombre, precio, grupo) 
    values(nombre,precio,grupo);
    
    select max(codProducto) codProducto
    from producto;
    
	commit;
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

create procedure editarProducto(producto int, nombre varchar(20), precio double(6,2), img varchar(20), grupo varchar(20))
begin
    update producto 
    set 
		nombre = nombre , 
		precio = precio,
        grupo = grupo,
        img = img
    where codProducto = producto;
end $$

create procedure mostrarImagenProducto(producto int)
begin
    select img
    from producto
    where codProducto = producto;
end $$

create procedure nuevaMesa(nombreMesa varchar(20), alto int, ancho int, posArriba int, posIzquierda int, codFactura int)
begin
	insert into mesa(nombreMesa,alto,ancho,posArriba,posIzquierda,codFactura) 
    values(nombreMesa,alto,ancho,posArriba,posIzquierda,codFactura);
end $$

create procedure mostrarMesas()
begin
	select *
    from mesa;
end $$