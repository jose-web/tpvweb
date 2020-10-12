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
    img varchar(20) default 'defaultUser.png',
    tema varchar(200) default '',
    encargado boolean default false,
    camarero boolean default false,
    cocinero boolean default false
);

create table mapa (
    codMapa int primary key auto_increment,
    tamanioV int not null,
    tamanioH int not null,
    color varchar(6) not null
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
    barra boolean default false,
    
    constraint foreign key (codMapa)
        references mapa (codMapa)
        on delete no action 
        on update cascade
);

create table factura (
	codFactura int primary key auto_increment,
    codUsuario int not null,
    codMesa int null,
	nombreCliente varchar(50) not null default 'Cliente sin nombre',
    pagado boolean not null default false,
    fecha datetime not null default now(),
    
     constraint foreign key (codUsuario)
        references Usuario (codUsuario)
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
	precio double(6,2) not null,
    disponibilidad boolean default true,
    
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

create table linea_de_factura (
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


create procedure muestraFacturas()
begin
	select factura.fecha, factura.codFactura as id, factura.nombreCliente as nombre, ifnull(sum(linea_de_factura.precio * linea_de_factura.cantidad),0) as cuentaTotal
    from factura left join linea_de_factura
			on factura.codFactura = linea_de_factura.codFactura
	where pagado = 0
	group by factura.codFactura
    order by fecha desc;
end $$


create procedure muestraProductosFactura(codigoUsuario int,codigoFactura int)
begin
	select linea_de_factura.codLinea, producto.nombre, linea_de_factura.precio, linea_de_factura.cantidad, linea_de_factura.comentario
    from linea_de_factura join factura
		on linea_de_factura.codFactura = factura.codFactura
			join producto
				on linea_de_factura.codProducto = producto.codProducto
	where factura.codFactura = codigoFactura;
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


create procedure muestraProductosLocal(idCategoriaPadre int)
begin
	if idCategoriaPadre is null then
		select categoria.codCategoria, nombre
        from categoria 
		where codCategoriaPadre is null;
	else
		select categoria.codCategoria,null as codProducto, nombre, null as precio, null as disponibilidad
        from categoria
		where codCategoriaPadre = idCategoriaPadre
        union
        select null, producto.codProducto, nombre, precio, disponibilidad
        from categoria_producto join producto
			on categoria_producto.codProducto = producto.codProducto
		where codCategoria = idCategoriaPadre;
	end if;
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


create procedure actualizaDatosUsuario(idUsuario int,nuevoNombre varchar(20),nuevoApellido1 varchar(20),nuevoApellido2 varchar(20),nuevoEmail varchar(50),nuevaPass varchar(32),img varchar(20), tema varchar(200))
begin
	set @sentencia = concat('update usuario set codUsuario=codUsuario',
		if(nuevoNombre !='',concat(', nombre = \'',nuevoNombre,'\''),''),
        if(nuevoApellido1 !='',concat(', apellido1 = \'',nuevoApellido1,'\''),''),
        if(nuevoApellido2 !='',concat(', apellido2 = \'',nuevoApellido2,'\''),''),
        if(nuevoEmail !='',concat(', email = \'',nuevoEmail,'\''),''),
        if(nuevaPass !='',concat(', pass = \'',nuevaPass,'\''),''),
		if(img !='',concat(', img = \'',img,'\''),''),
		if(tema !='',concat(', tema = \'',tema,'\''),''),
		' where codUsuario = ',idUsuario);
    prepare ejecutar from @sentencia;
    execute ejecutar;
end $$


create procedure ObtenerDatosUsuario(idUsuario int)
begin
    select encargado, camarero, cocinero into @encargado ,@camarero ,@cocinero 
    from Usuario
    where codUsuario= idUsuario;
	
	select nombre, apellido1, apellido2, email, img, @camarero as camarero, @encargado as encargado, @cocinero as cocinero, tema
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


create procedure creaFactura(idUsuario int, idMesa int, nuevoNombreCliente varchar(50))
begin
    select trabajador.codTrabajador into @codTrabajador 
    from trabajador join trabajador_local
		on trabajador.codTrabajador = trabajador_local.codTrabajador
        join mapa
			on mapa.codLocal = trabajador_local.codLocal
            join mesa
				on mesa.codMapa = mapa.codMapa
    where codUsuario = 1 and mesa.codMapa=1
    group by trabajador.codTrabajador;
    
	insert into factura (codTrabajador,codMesa,nombreCliente) 
    values(@codTrabajador,idMesa,nuevoNombreCliente);
end $$


create procedure creaFacturaBarra(idUsuario int)
begin
	insert into factura (codUsuario) 
    values(idUsuario);
    
    select max(codFactura) as codFactura from factura;
end $$


create procedure actualizaFactura(idUsuario int, idFactura int, nuevoNombreCliente varchar(50), estadoPagado int)
begin
	select count(*) into @permisos
    from usuario join trabajador
		on usuario.codUsuario = trabajador.codUsuario
		join trabajador_local
			on trabajador_local.codTrabajador = trabajador.codTrabajador
			join mapa
				on mapa.codLocal = trabajador_local.codLocal
                join mesa
					on mesa.codMapa = mapa.codMapa
                    join factura
						on factura.codMesa = mesa.codMesa
		where trabajador_local.estado = 1 and usuario.codUsuario = idUsuario and codFactura= idFactura;

	if @permisos > 0 then
		update factura set nombreCliente=nuevoNombreCliente, pagado=estadoPagado
		where codFactura=idFactura;
    end if;
end $$


create procedure crearCategoria(nombreCategoria varchar(50), idCategoriaPadre int)
begin

    insert into categoria(nombre, codCategoriaPadre)
		value (nombreCategoria,idCategoriaPadre);

end $$


create procedure crearProducto(
	idUsuario int, 
	idCategoria int, 
	nombreProducto varchar(50), 
	descripcionProducto text, 
    imagen varchar(30),
    precioProducto double,
    disponibilidadProducto boolean
)
begin

    start transaction;
    
    insert into producto(nombre, descripcion, img)
		values(nombreProducto, descripcionProducto, imagen);

	select max(codProducto) into @producto from producto;
        
	insert into categoria_producto(codCategoria, codProducto, precio, disponibilidad)
	values(idCategoria, @producto, precioProducto, disponibilidadProducto);
        
	commit;

end $$


create procedure addProductoFactura(
	idFactura int, 
	idProducto int,
    precioProducto double,
    cantidadProducto int,
    comentarioProducto text
)
begin
	
    insert into linea_de_factura(codFactura,codProducto,precio, cantidad, comentario)
		values(idFactura,idProducto,precioProducto,cantidadProducto,comentarioProducto);
    
end $$


create procedure editaProducto(
	idCategoria int, 
    idProducto int,
    precioProducto double,
    disponibilidadProducto boolean
)
begin

	update categoria_producto 
	set precio = precioProducto, disponibilidad = disponibilidadProducto
	where codCategoria = idCategoria and codProducto = idProducto;
    
end $$


create procedure actualizaProductoFactura(idUsuario int, idLineaDeFactura int, nuevoPrecio double, nuevaCantidad int, nuevoComentario text)
begin

	select count(*) into @acceso
    from trabajador join trabajador_local
		on trabajador.codTrabajador = trabajador_local.codTrabajador
        join mapa
			on mapa.codLocal = trabajador_local.codLocal
            join mesa
				on mesa.codMapa = mapa.codMapa
                join factura
                on factura.codMesa = mesa.codMesa
					join linea_de_factura
						on linea_de_factura.codFactura = factura.codFactura
    where codUsuario = idUsuario
    and linea_de_factura.codLinea = idLineaDeFactura
    and trabajador_local.estado = 1;

	if @acceso = 1 then
		set @sentencia = concat('update linea_de_factura set codLinea=codLinea ',
			if(nuevoPrecio !='',concat(', precio = ',nuevoPrecio),''),
			if(nuevaCantidad !='',concat(', cantidad = ',nuevaCantidad),''),
            if(nuevoComentario !='',concat(', comentario = \'',nuevoComentario,'\''),''),
			' where codLinea = ',idLineaDeFactura);
		prepare ejecutar from @sentencia;
		execute ejecutar;
    end if;
end $$


create procedure borraProductoFactura(idUsuario int, idLineaDeFactura int)
begin

	select count(*) into @acceso
    from trabajador join trabajador_local
		on trabajador.codTrabajador = trabajador_local.codTrabajador
        join mapa
			on mapa.codLocal = trabajador_local.codLocal
            join mesa
				on mesa.codMapa = mapa.codMapa
                join factura
                on factura.codMesa = mesa.codMesa
					join linea_de_factura
						on linea_de_factura.codFactura = factura.codFactura
    where codUsuario = idUsuario
    and linea_de_factura.codLinea = idLineaDeFactura
    and trabajador_local.estado = 1
    and trabajador_local.tipo = 'encargado';

	if @acceso = 1 then
		delete from linea_de_factura  where codLinea = idLineaDeFactura;
    end if;
end $$

delimiter ;