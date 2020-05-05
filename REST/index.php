<?php
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

$app->notFound(function (){
  echo json_encode(array("error"=>"No deberías estar aquí"),JSON_FORCE_OBJECT);
});

$app->run();
?>
