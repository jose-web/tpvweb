<?php

session_name("TPVWEB");
session_start();

function login($email,$pass){
  include "conexion.php";

  if(!$con){
    return array("mensaje_error" => "Error al conectar con la base de datos.");
  }

  mysqli_set_charset($con,"utf8");

  $emailCodificado = mysqli_real_escape_string($con,$email);
  $passCodificado = md5($pass);

  $consulta = "SELECT * FROM usuario WHERE email = '$emailCodificado' AND pass = '$passCodificado'";
  $resultado = mysqli_query($con,$consulta);
  mysqli_close($con);

  if(!$resultado){
    return array("mensaje_error" => "Error al realizar la consulta");
  }

  if($fila = mysqli_fetch_assoc($resultado)){
    $_SESSION["USUARIO"] = array("email"=>$email,"pass"=>$pass);
    return array("login" => true);
  } 
    return array("login" => false);
}

function compruebaSesion(){
  if(isset($_SESSION["USUARIO"])){

    $email = $_SESSION["USUARIO"]["email"];
    $pass = $_SESSION["USUARIO"]["pass"];
    $login = login($email,$pass);

    if($login["login"])
      return array("respuesta" =>true);
  }
    return array("respuesta" => false);
}

function cerrarSesion(){
  session_destroy();
}

?>