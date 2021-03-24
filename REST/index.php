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

//////////////////////////// FACTURAS ////////////////////////////

$app->post("/mostrarFacturas", function(){
  echo json_encode(mostrarFacturas($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->post("/mostrarFactura", function(){
  echo json_encode(mostrarFactura($_POST["email"],$_POST["pass"],$_POST["codFactura"]),JSON_FORCE_OBJECT);
});

//////////////////////////// PRODUCTOS ////////////////////////////

$app->post("/mostrarProductos", function(){
  echo json_encode(mostrarProductos($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->post("/nuevoProducto", function(){
  echo json_encode(nuevoProducto($_POST["email"],$_POST["pass"],$_POST["nombre"],$_POST["precio"],$_POST["grupo"]),JSON_FORCE_OBJECT);
});

//////////////////////////// ERROR ////////////////////////////

$app->notFound(function (){
  echo json_encode(array("error"=>"No deberías estar aquí"),JSON_FORCE_OBJECT);
});

$app->run();
?>
