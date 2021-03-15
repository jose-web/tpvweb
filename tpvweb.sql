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

delimiter $$

create procedure login(nombre varchar(20), pass varchar(32))
begin
	select * 
    from usuario 
    where usuario.nombre = nombre
		and usuario.pass = pass;
end $$
