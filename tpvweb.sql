drop database if exists tpvweb;


# CREACIÓN DE LA BASE DE DATOS
create database tpvweb;


# USAMOS LA BASE DE DATOS TPVWEB
use tpvweb;


create table usuario (
    codUsuario int primary key auto_increment,
    nombre varchar(20) not null,
    apellido1 varchar(20) not null,
    apellido2 varchar(20),
    email varchar(50) not null,
    pass varchar(32) not null,
    img varchar(20) default 'defaultUser.png'
);


create table admin (
	codAdmin int primary key auto_increment,
    codUsuario int not null,
        
    constraint foreign key (codUsuario)
        references usuario (codUsuario)
        on delete no action 
        on update cascade
);


create table empresa (
    codEmpresa int primary key auto_increment,
    nombre varchar(20) not null,
    nif varchar(20) not null
);


create table empresario (
	codEmpresario int primary key auto_increment,
    codUsuario int not null,
        
    constraint foreign key (codUsuario)
        references usuario (codUsuario)
        on delete no action 
        on update cascade
);


create table empresario_empresa (
    codEmpresario int,
    codEmpresa int,
    
    constraint primary key (codEmpresario , codEmpresa),
    
    constraint foreign key (codEmpresario)
        references empresario (codEmpresario)
        on delete no action 
        on update cascade,
        
    constraint foreign key (codEmpresa)
        references empresa (codEmpresa)
        on delete no action 
        on update cascade
);


create table suscripcion (
    codSuscripcion int primary key auto_increment,
    codEmpresa int not null,
    plan varchar(50) not null,
    fechaInicioSuscripcion date not null,
    fechaFinSuscripcion date not null,
    estado boolean not null,
    
    constraint foreign key (codEmpresa)
        references empresa (codEmpresa)
        on delete no action 
        on update cascade
);


create table local (
    codLocal int primary key auto_increment,
    codEmpresa int not null,
    nombre varchar(20) not null,
    direccion varchar(100) not null,
    telefono int(9) not null,
    
    constraint foreign key (codEmpresa)
        references empresa (codEmpresa)
        on delete no action 
        on update cascade
);


create table trabajador (
	codTrabajador int primary key auto_increment,
    codUsuario int not null,
        
    constraint foreign key (codUsuario)
        references usuario (codUsuario)
        on delete no action 
        on update cascade
);


create table trabajador_local (
    codTrabajador int,
    codLocal int,
    tipo enum('encargado', 'camarero','cocinero')  not null,
    estado boolean not null default 1,
    fechaDespido date,
    
    constraint primary key (codTrabajador , codLocal),
    
    constraint foreign key (codTrabajador)
        references trabajador (codTrabajador)
        on delete no action 
        on update cascade,
        
    constraint foreign key (codLocal)
        references local (codLocal)
        on delete no action 
        on update cascade
);


create table mapa (
    codMapa int primary key auto_increment,
    codLocal int not null,
    tamanioV int not null,
    tamanioH int not null,
    color varchar(6) not null,
    
    constraint foreign key (codLocal)
        references local (codLocal)
        on delete no action 
        on update cascade
);

create table objeto (
    codObjeto int primary key auto_increment,
    codMapa int not null,
    tamanioV int not null,
    tamanioH int not null,
    color varchar(6) not null,
    posicion int not null,
    nombre varchar(20) not null,
    capa int not null,
    
    constraint foreign key (codMapa)
        references mapa (codMapa)
        on delete no action 
        on update cascade
);

create table mesa (
    codMesa int primary key auto_increment,
    codMapa int not null,
    tamanioV int not null,
    tamanioH int not null,
    color varchar(6) not null,
    posicion int not null,
    nombre varchar(20) not null,
    capa int not null,
    
    constraint foreign key (codMapa)
        references mapa (codMapa)
        on delete no action 
        on update cascade
);

create table factura (
	codFactura int primary key auto_increment,
    codTrabajador int not null,
    codMesa int not null,
	nombreCliente varchar(50) not null,
    pagado boolean not null default false,
    fecha datetime not null default now(),
    
     constraint foreign key (codTrabajador)
        references trabajador (codTrabajador)
        on delete no action 
        on update cascade,
        
    constraint foreign key (codMesa)
        references mesa (codMesa)
        on delete no action 
        on update cascade
);


create table alergeno (
	codAlergeno int primary key auto_increment,
    nombre varchar(20) not null,
    img varchar(20)
);


create table ingrediente (
	codIngrediente int primary key auto_increment,
    nombre varchar(20) not null,
    img varchar(20)
);


create table ingrediente_alergeno (
    codIngrediente int,
    codAlergeno int,
    
    constraint primary key (codIngrediente , codAlergeno),
    
    constraint foreign key (codIngrediente)
        references ingrediente (codIngrediente)
        on delete no action 
        on update cascade,
        
    constraint foreign key (codAlergeno)
        references alergeno (codAlergeno)
        on delete no action 
        on update cascade
);


create table producto (
    codProducto int primary key auto_increment,
	nombre varchar(20)  not null,
    img varchar(20),
    descripcion text not null
);


create table producto_ingrediente (
    codProducto int,
    codIngrediente int,
    cantidad int not null,
    
    constraint primary key (codProducto , codIngrediente),
    
    constraint foreign key (codProducto)
        references producto (codProducto)
        on delete no action 
        on update cascade,
        
    constraint foreign key (codIngrediente)
        references ingrediente (codIngrediente)
        on delete no action 
        on update cascade
);

create table local_tiene_producto(
	codLocal int not null,
	codProducto int not null,
    precio double(6,2) not null,
    disponibilidad boolean default true,
    
    constraint primary key (codLocal , codProducto),
    
	constraint foreign key (codLocal)
        references local (codLocal)
        on delete no action 
        on update cascade,
        
    constraint foreign key (codProducto)
        references producto (codProducto)
        on delete no action 
        on update cascade
    );

create table categoria (
    codCategoria int primary key auto_increment,
    nombre varchar(20) not null,
    codCategoriaPadre int,
        
    constraint foreign key (codCategoriaPadre)
        references categoria (codCategoria)
        on delete no action 
        on update cascade
);

create table categoria_producto (
    codCategoria int,
    codProducto int,
    
    constraint primary key (codCategoria , codProducto),
    
    constraint foreign key (codCategoria)
        references categoria (codCategoria)
        on delete no action 
        on update cascade,
        
    constraint foreign key (codProducto)
        references producto (codProducto)
        on delete no action 
        on update cascade
);

create table lineaDeFactura (
    codLinea int primary key auto_increment,
    codFactura int not null,
    codProducto int not null,
	precio double(6,2) not null,
    cantidad int not null,
    comentario text,
 
    constraint foreign key (codFactura)
        references factura (codFactura)
        on delete no action 
        on update cascade,
        
    constraint foreign key (codProducto)
        references producto (codProducto)
        on delete no action 
        on update cascade
);


delimiter $$

create procedure login(email varchar(50), pass varchar(32))
begin
	select * 
    from usuario 
    where usuario.email = email
		and usuario.pass = pass;
end $$


create procedure muestraLocales(codigoUsuario int)
begin
	select local.codLocal as id, empresa.nombre as nombreEmpresa, local.nombre as nombreLocal, direccion, telefono 
	from local join trabajador_local 
		on local.codLocal = trabajador_local.codLocal 
			join empresa
			on local.codEmpresa = empresa.codEmpresa
				join trabajador
			on trabajador_local.codTrabajador = trabajador.codTrabajador
	where trabajador.codUsuario = codigoUsuario and estado = 1;
end $$


create procedure muestraFacturasLocal(codigoUsuario int,codigoLocal int)
begin
	select factura.codFactura as id, factura.nombreCliente as nombre, ifnull(sum(lineadefactura.precio * lineadefactura.cantidad),0) as cuentaTotal
    from factura join mesa
		on factura.codMesa = mesa.codMesa
			join mapa
				on mapa.codMapa = mesa.codMapa
				join trabajador_local
					on trabajador_local.codLocal = mapa.codLocal
					join trabajador
						on trabajador_local.codTrabajador = trabajador.codTrabajador
                        left join lineadefactura
							on lineadefactura.codFactura = factura.codFactura
	where mapa.codLocal = codigoLocal
		and trabajador.codUsuario = codigoUsuario
		and factura.pagado = 0
	group by factura.codFactura
    order by nombre;
end $$


create procedure muestraProductosFactura(codigoUsuario int,codigoFactura int)
begin
	select lineadefactura.codLinea, producto.nombre, lineadefactura.precio, lineadefactura.cantidad, lineadefactura.comentario
    from lineadefactura join factura
		on lineadefactura.codFactura = factura.codFactura
		join mesa
			on factura.codMesa = mesa.codMesa
			join mapa
				on mapa.codMapa = mesa.codMapa
				join trabajador_local
					on trabajador_local.codLocal = mapa.codLocal
					join trabajador
						on trabajador_local.codTrabajador = trabajador.codTrabajador
                        join producto
							on lineadefactura.codProducto = producto.codProducto
	where trabajador.codUsuario = codigoUsuario 
    and trabajador_local.estado = 1 
    and factura.codFactura = codigoFactura;
end $$


create procedure muestraLocalesEncargado(codigoUsuario int)
begin
	select local.codLocal as id, empresa.nombre as nombreEmpresa, local.nombre as nombreLocal, direccion, telefono 
    from trabajador join trabajador_local
		on trabajador.codTrabajador = trabajador_local.codTrabajador
        join local
			on local.codLocal = trabajador_local.codLocal
            join empresa
				on local.codEmpresa = empresa.codEmpresa
	where trabajador.codUsuario = codigoUsuario
    and estado = 1
    and tipo = "encargado";
end $$


create procedure muestraEmpleadosLocal(codigoUsuario int, codLocal int)
begin
	select usuario.codUsuario, usuario.nombre, usuario.apellido1, usuario.apellido2, usuario.img, empleados.tipo
    from trabajador join trabajador_local
		on trabajador.codTrabajador = trabajador_local.codTrabajador
        join local
			on local.codLocal = trabajador_local.codLocal
            join trabajador_local as empleados
				on empleados.codLocal = local.codLocal
                join trabajador as trabajador2
					on trabajador2.codTrabajador = empleados.codTrabajador
                    join usuario
						on usuario.codUsuario = trabajador2.codUsuario
	where trabajador.codUsuario = codigoUsuario
    and trabajador_local.estado = 1
    and trabajador_local.tipo = "encargado"
    and local.codLocal = codLocal
    and empleados.estado = 1;
end $$


create procedure cambiaTipoEmpleado(codigoUsuario int, codLocal int, codUsuario int, tipo varchar(20))
begin
	select count(*) into @empresario
    from trabajador join trabajador_local
		on trabajador.codTrabajador = trabajador_local.codTrabajador
	where trabajador.codUsuario = codigoUsuario
		and trabajador_local.codLocal = codLocal
        and trabajador_local.tipo = "encargado";
        
	if @empresario = 1 then
		update trabajador_local 
        set trabajador_local.tipo = tipo
        where codTrabajador = (
				select codTrabajador
                from trabajador
                where trabajador.codUsuario = codUsuario
			)
            and trabajador_local.codLocal = codLocal;
	end if;
end $$


create procedure buscarEmpleadosLocal(codigoUsuario int, codLocal int, busqueda varchar(50))
begin
	select usuario.codUsuario, usuario.nombre, usuario.apellido1, usuario.apellido2, usuario.img, empleados.tipo
    from trabajador join trabajador_local
		on trabajador.codTrabajador = trabajador_local.codTrabajador
        join local
			on local.codLocal = trabajador_local.codLocal
            join trabajador_local as empleados
				on empleados.codLocal = local.codLocal
                join trabajador as trabajador2
					on trabajador2.codTrabajador = empleados.codTrabajador
                     join usuario
						on usuario.codUsuario = trabajador2.codUsuario
	where trabajador.codUsuario = codigoUsuario
		and trabajador_local.estado = 1
		and trabajador_local.tipo = "encargado"
		and local.codLocal = codLocal
		and empleados.estado = 1
        and (
				usuario.nombre like concat('%',busqueda,'%')
				or usuario.apellido1 like concat('%',busqueda,'%')
				or usuario.apellido2 like concat('%',busqueda,'%')
			)
	union
    select usuario.codUsuario, usuario.nombre, usuario.apellido1, usuario.apellido2, usuario.img,"" 
    from usuario join trabajador
		on usuario.codUsuario = trabajador.codUsuario
        where usuario.codUsuario not in (
			select usuario.codUsuario
			from trabajador join trabajador_local
				on trabajador.codTrabajador = trabajador_local.codTrabajador
				join local
					on local.codLocal = trabajador_local.codLocal
					join trabajador_local as empleados
						on empleados.codLocal = local.codLocal
						join trabajador as trabajador2
							on trabajador2.codTrabajador = empleados.codTrabajador
							 join usuario
								on usuario.codUsuario = trabajador2.codUsuario
			where trabajador.codUsuario = codigoUsuario
				and trabajador_local.estado = 1
				and trabajador_local.tipo = "encargado"
				and local.codLocal = codLocal
				and empleados.estado = 1
                and (
						usuario.nombre like concat('%',busqueda,'%')
						or usuario.apellido1 like concat('%',busqueda,'%')
						or usuario.apellido2 like concat('%',busqueda,'%')
					)
        ) and (
				usuario.nombre like concat('%',busqueda,'%')
				or usuario.apellido1 like concat('%',busqueda,'%')
				or usuario.apellido2 like concat('%',busqueda,'%')
			  );
end $$


create procedure contratarEmpleado(codigoUsuario int, codLocal int, codUsuarioTrabajador int, tipoEmpleado varchar(20))
begin
	select count(*) into @empresario
    from trabajador join trabajador_local
		on trabajador.codTrabajador = trabajador_local.codTrabajador
	where trabajador.codUsuario = codigoUsuario
		and trabajador_local.codLocal = codLocal
        and trabajador_local.tipo = "encargado";
        
	select codTrabajador into @codTrabajador
    from trabajador
    where codUsuario = codUsuarioTrabajador;
    
	if @empresario = 1 then
		insert into trabajador_local(codTrabajador,codLocal,tipo,estado)
        values (@codTrabajador,codLocal,tipoEmpleado,1);
	end if;
end $$


create procedure muestraProductosLocal(codigoUsuario int, codLocal int)
begin
	select producto.*, local_tiene_producto.precio, local_tiene_producto.disponibilidad
    from producto join local_tiene_producto
		on producto.codProducto = local_tiene_producto.codProducto
		join trabajador_local
			on trabajador_local.codLocal = local_tiene_producto.codLocal
            join trabajador
				on trabajador.codTrabajador = trabajador_local.codTrabajador
	where local_tiene_producto.codLocal = codLocal
		and trabajador.codUsuario = codigoUsuario
        and trabajador_local.estado = 1;
end $$


create procedure registraUsuario(nuevoNombre varchar(20),nuevoApellido1 varchar(20),nuevoApellido2 varchar(20),nuevoEmail varchar(50),nuevaPass varchar(32))
begin
	insert into usuario (nombre, apellido1, apellido2, email, pass) 
	values (nuevoNombre, nuevoApellido1, nuevoApellido2, nuevoEmail, nuevaPass);
end $$


create procedure compruebaEmailRepetido(emailAComprobar varchar(50))
begin
	select count(email) as 'cuentaEmail'
    from usuario
    where email = emailAComprobar;
end $$


create procedure actualizaDatosUsuario(idUsuario int,nuevoNombre varchar(20),nuevoApellido1 varchar(20),nuevoApellido2 varchar(20),nuevoEmail varchar(50),nuevaPass varchar(32),img varchar(20))
begin
	set @sentencia = concat('update usuario set',
		if(nuevoNombre !='',concat(' nombre = \'',nuevoNombre,'\''),''),
		if(nuevoNombre !='' && nuevoApellido1!='',' , ',''),
        if(nuevoApellido1 !='',concat(' apellido1 = \'',nuevoApellido1,'\''),''),
		if(nuevoApellido1 !='' && nuevoApellido2!='',' , ',''),
        if(nuevoApellido2 !='',concat(' apellido2 = \'',nuevoApellido2,'\''),''),
		if(nuevoApellido2 !='' && nuevoEmail!='',' , ',''),
        if(nuevoEmail !='',concat(' email = \'',nuevoEmail,'\''),''),
		if(nuevoEmail !='' && nuevaPass!='',' , ',''),
        if(nuevaPass !='',concat(' pass = \'',nuevaPass,'\''),''),
		if(nuevaPass !='' && img!='',' , ',''),
		if(img !='',concat(' img = \'',img,'\''),''),
		' where codUsuario = ',idUsuario);
    prepare ejecutar from @sentencia;
    execute ejecutar;
end $$


create procedure ObtenerDatosUsuario(idUsuario int)
begin
	select count(*) into @camarero
    from usuario join trabajador
		on usuario.codUsuario = trabajador.codUsuario
        join trabajador_local
			on trabajador_local.codTrabajador = trabajador.codTrabajador
    where usuario.codUsuario = idUsuario and tipo = "camarero" and estado = 1;
    
    select count(*) into @encargado
    from usuario join trabajador
		on usuario.codUsuario = trabajador.codUsuario
        join trabajador_local
			on trabajador_local.codTrabajador = trabajador.codTrabajador
    where usuario.codUsuario = idUsuario and tipo = "encargado" and estado = 1;
    
    select count(*) into @cocinero
    from usuario join trabajador
		on usuario.codUsuario = trabajador.codUsuario
        join trabajador_local
			on trabajador_local.codTrabajador = trabajador.codTrabajador
    where usuario.codUsuario = idUsuario and tipo = "cocinero" and estado = 1;
	
	select nombre, apellido1, apellido2, email, img, @camarero as camarero, @encargado as encargado, @cocinero as cocinero
    from usuario 
    where codUsuario = idUsuario;
end $$


create procedure muestraImagenPerfil(idUsuario int)
begin
	 select img 
     from usuario 
     where codUsuario = idUsuario;
end $$


create procedure habilitaTrabajador(idUsuario int)
begin
	insert into trabajador(codUsuario)
    values (idUsuario);
end $$

delimiter ;