<?php
header('Access-Control-Allow-Origin: http://localhost:3000');

include "funciones.php";
require 'Slim/Slim.php';
// El framework Slim tiene definido un namespace llamado Slim
// Por eso aparece \Slim\ antes del nombre de la clase.
\Slim\Slim::registerAutoloader();
// Creamos la aplicación
$app = new \Slim\Slim();
// Indicamos el tipo de contenido y condificación que devolveremos desde el framework Slim
$app->contentType('application/json; charset=utf-8');

//////////////////////////// LOGIN ////////////////////////////

$app->post("/login", function(){
  echo json_encode(login($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->post("/compruebaSesion", function(){
  echo json_encode(compruebaSesion($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

//////////////////////////// USUARIOS ////////////////////////////

$app->post("/mostrarUsuarios", function(){
  echo json_encode(mostrarUsuarios($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->post("/nuevoUsuario", function(){
  echo json_encode(nuevoUsuario($_POST["email"],$_POST["pass"],$_POST["nuevoEmail"],$_POST["nuevaPass"]),JSON_FORCE_OBJECT);
});

$app->post("/editarUsuario", function(){
  echo json_encode(editarUsuario($_POST["email"],$_POST["pass"],$_POST["codUsuario"],$_POST["nombre"]),JSON_FORCE_OBJECT);
});

$app->post("/eliminarUsuario", function(){
  echo json_encode(eliminarUsuario($_POST["email"],$_POST["pass"],$_POST["codUsuario"]),JSON_FORCE_OBJECT);
});

//////////////////////////// FACTURAS ////////////////////////////

$app->post("/mostrarFacturas", function(){
  echo json_encode(mostrarFacturas($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->post("/mostrarTodasFacturas", function(){
  echo json_encode(mostrarTodasFacturas($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->post("/mostrarFactura", function(){
  echo json_encode(mostrarFactura($_POST["email"],$_POST["pass"],$_POST["codFactura"]),JSON_FORCE_OBJECT);
});

$app->post("/editarNombreFactura", function(){
  echo json_encode(editarNombreFactura($_POST["email"],$_POST["pass"],$_POST["codFactura"],$_POST["nombre"]),JSON_FORCE_OBJECT);
});

$app->post("/ocultarFactura", function(){
  echo json_encode(ocultarFactura($_POST["email"],$_POST["pass"],$_POST["codFactura"]),JSON_FORCE_OBJECT);
});

//////////////////////////// PRODUCTOS ////////////////////////////

$app->post("/mostrarProductos", function(){
  echo json_encode(mostrarProductos($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->post("/nuevoProducto", function(){
  echo json_encode(nuevoProducto($_POST["email"],$_POST["pass"],$_POST["nombre"],$_POST["precio"],isset($_FILES["img"])?$_FILES["img"]:"",$_POST["grupo"]),JSON_FORCE_OBJECT);
});

$app->post("/insertarProductoEnFactura", function(){
  echo json_encode(insertarProductoEnFactura($_POST["email"],$_POST["pass"],$_POST["codFactura"],$_POST["nombre"],$_POST["precio"],$_POST["cantidad"]),JSON_FORCE_OBJECT);
});

$app->post("/editarProducto", function(){
  echo json_encode(editarProducto($_POST["email"],$_POST["pass"],$_POST["codProducto"],$_POST["nombre"],$_POST["precio"],isset($_FILES["img"])?$_FILES["img"]:"",$_POST["grupo"]),JSON_FORCE_OBJECT);
});

//////////////////////////// ERROR ////////////////////////////

$app->notFound(function (){
  echo json_encode(array("error"=>"No deberías estar aquí"),JSON_FORCE_OBJECT);
});

$app->run();
?>
