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

$app->post("/compruebaSesion", function(){
  echo json_encode(compruebaSesion($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->get("/cerrarSesion", function(){
  echo json_encode(cerrarSesion(),JSON_FORCE_OBJECT);
});

$app->post("/buscaLocales", function(){
  echo json_encode(buscaLocales($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->post("/muestraFacturasLocal", function(){
  echo json_encode(muestraFacturasLocal($_POST["email"],$_POST["pass"],$_POST["id"]),JSON_FORCE_OBJECT);
});

$app->post("/muestraProductosFactura", function(){
  echo json_encode(muestraProductosFactura($_POST["email"],$_POST["pass"],$_POST["codFactura"]),JSON_FORCE_OBJECT);
});

$app->get("/cambiaLocal/:codLocal", function($codLocal){
  echo json_encode(cambiaLocal($codLocal),JSON_FORCE_OBJECT);
});

$app->post("/muestraLocalesEncargado", function(){
  echo json_encode(muestraLocalesEncargado($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->post("/muestraEmpleadosLocal", function(){
  echo json_encode(muestraEmpleadosLocal($_POST["email"],$_POST["pass"],$_POST["codLocal"]),JSON_FORCE_OBJECT);
});

$app->post("/cambiaTipoEmpleado", function(){
  echo json_encode(cambiaTipoEmpleado($_POST["email"],$_POST["pass"],$_POST["codUsuario"],$_POST["tipo"],$_POST["codLocal"]),JSON_FORCE_OBJECT);
});

$app->notFound(function (){
  echo json_encode(array("error"=>"No deberías estar aquí"),JSON_FORCE_OBJECT);
});

$app->run();
?>
