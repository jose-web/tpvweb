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

$app->post("/buscaLocales", function(){
  echo json_encode(buscaLocales($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->post("/muestraFacturasLocal", function(){
  echo json_encode(muestraFacturasLocal($_POST["email"],$_POST["pass"],$_POST["id"]),JSON_FORCE_OBJECT);
});

$app->post("/muestraProductosFactura", function(){
  echo json_encode(muestraProductosFactura($_POST["email"],$_POST["pass"],$_POST["codFactura"]),JSON_FORCE_OBJECT);
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

$app->post("/buscarEmpleadosLocal", function(){
  echo json_encode(buscarEmpleadosLocal($_POST["email"],$_POST["pass"],$_POST["codLocal"],$_POST["busqueda"]),JSON_FORCE_OBJECT);
});

$app->post("/contratarEmpleado", function(){
  echo json_encode(contratarEmpleado($_POST["email"],$_POST["pass"],$_POST["codLocal"],$_POST["codUsuarioEmpleado"],$_POST["tipo"]),JSON_FORCE_OBJECT);
});

$app->get("/muestraProductosLocal/:codLocal", function($codLocal){
  echo json_encode(muestraProductosLocal($codLocal),JSON_FORCE_OBJECT);
});

$app->post("/registro", function(){
  echo json_encode(registro($_POST["nombre"],$_POST["apellido1"],$_POST["apellido2"],$_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->post("/compruebaEmailRepetido", function(){
  echo json_encode(compruebaEmailRepetido($_POST["email"]),JSON_FORCE_OBJECT);
});

$app->post("/actualizaDatosUsuario", function(){
   echo json_encode(actualizaDatosUsuario($_POST["email"],$_POST["pass"],isset($_POST["nuevoNombre"])?$_POST["nuevoNombre"]:"",isset($_POST["nuevoApellido1"])?$_POST["nuevoApellido1"]:"",isset($_POST["nuevoApellido2"])?$_POST["nuevoApellido2"]:"",isset($_POST["nuevoEmail"])?$_POST["nuevoEmail"]:"",isset($_POST["nuevaPass"])?$_POST["nuevaPass"]:"",isset($_FILES["nuevaImagen"])?$_FILES["nuevaImagen"]:""),JSON_FORCE_OBJECT);
});

$app->post("/ObtenerDatosUsuario", function(){
  echo json_encode(ObtenerDatosUsuario($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->post("/habilitaTrabajador", function(){
  echo json_encode(habilitaTrabajador($_POST["email"],$_POST["pass"]),JSON_FORCE_OBJECT);
});

$app->post("/creaFactura", function(){
  echo json_encode(creaFactura($_POST["email"],$_POST["pass"],$_POST["idMesa"],$_POST["nombreCliente"]),JSON_FORCE_OBJECT);
});

$app->post("/creaFacturaBarra", function(){
  echo json_encode(creaFacturaBarra($_POST["email"],$_POST["pass"],$_POST["codLocal"]),JSON_FORCE_OBJECT);
});

$app->post("/actualizaFactura", function(){
  echo json_encode(actualizaFactura($_POST["email"],$_POST["pass"],$_POST["idFactura"],$_POST["nuevoNombreCliente"],$_POST["estadoPagado"]),JSON_FORCE_OBJECT);
});

$app->post("/crearCategoria", function(){
  echo json_encode(crearCategoria($_POST["email"],$_POST["pass"],$_POST["codLocal"],$_POST["nombre"],$_POST["padre"]),JSON_FORCE_OBJECT);
});

$app->notFound(function (){
  echo json_encode(array("error"=>"No deberías estar aquí"),JSON_FORCE_OBJECT);
});

$app->run();
?>
