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
    img int not null
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
    estado boolean not null,
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
    precio double(6,2) not null,
    disponibilidad boolean default true,
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