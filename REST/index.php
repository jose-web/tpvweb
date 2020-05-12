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

$app->post("/login", function(){
  echo json_encode(login($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->get("/compruebaSesion", function(){
  echo json_encode(compruebaSesion(),JSON_FORCE_OBJECT);
});

$app->get("/cerrarSesion", function(){
  echo json_encode(cerrarSesion(),JSON_FORCE_OBJECT);
});

$app->post("/buscaLocales", function(){
  echo json_encode(buscaLocales($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->get("/muestraFacturasLocal", function(){
  echo json_encode(muestraFacturasLocal(),JSON_FORCE_OBJECT);
});

$app->get("/muestraProductosFactura/:codFactura", function($codFactura){
  echo json_encode(muestraProductosFactura($codFactura),JSON_FORCE_OBJECT);
});

$app->get("/cambiaLocal/:codLocal", function($codLocal){
  echo json_encode(cambiaLocal($codLocal),JSON_FORCE_OBJECT);
});

$app->get("/muestraLocalesEncargado", function(){
  echo json_encode(muestraLocalesEncargado(),JSON_FORCE_OBJECT);
});

$app->get("/muestraEmpleadosLocal", function(){
  echo json_encode(muestraEmpleadosLocal(),JSON_FORCE_OBJECT);
});

$app->get("/cambiaTipoEmpleado/:codigousuario/:tipo", function($codigousuario,$tipo){
  echo json_encode(cambiaTipoEmpleado($codigousuario,$tipo),JSON_FORCE_OBJECT);
});

$app->notFound(function (){
  echo json_encode(array("error"=>"No deberías estar aquí"),JSON_FORCE_OBJECT);
});

$app->run();
?>
