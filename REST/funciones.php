<?php

function consulta($consulta){
  include "conexion.php";
  if(!$con){
    return array("mensaje_error" => "Error al conectar con la base de datos.");
  }

  mysqli_set_charset($con,"utf8");

  $resultado = mysqli_query($con,$consulta);
  mysqli_close($con);

  if(!$resultado){
    return array("mensaje_error" => "Error al realizar la consulta");
  }
  return $resultado;
}

function codificar($valor){
  include "conexion.php";
  return mysqli_real_escape_string($con,$valor);
}

function login($email,$pass){

  $emailCodificado = codificar($email);
  $passCodificado = codificar($pass);

  $consulta = "call login('$emailCodificado', '$passCodificado')";

  $resultado = consulta($consulta);

  if($fila = mysqli_fetch_assoc($resultado))
    return array("login" => true, "id"=>$fila["codUsuario"]);
  else 
    return array("login" => false);
}

function compruebaSesion($email,$pass){
    $login = login($email,$pass);

    return array("respuesta" => $login["login"]);
}

?>