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

function mostrarFacturas($email,$pass){
  $login = login($email,$pass);
  if($login["login"]){

    $consulta = "call mostrarFacturas()";

    $resultado = consulta($consulta);

    $array = [];

    while($fila = mysqli_fetch_assoc($resultado)){
      $array[] = $fila;
    }
    return array("facturas" => $array);

  }else{
    return $login;
  }
}

function mostrarFactura($email,$pass,$codFactura){
  $login = login($email,$pass);
  if($login["login"]){
    $codFacturaCodificar = codificar($codFactura);

    $consulta = "call mostrarFactura($codFacturaCodificar)";

    $resultado = consulta($consulta);

    $array = [];

    while($fila = mysqli_fetch_assoc($resultado)){
      $array[] = $fila;
    }
    return array("factura" => $array);

  }else{
    return $login;
  }
}

function mostrarProductos($email,$pass){
  $login = login($email,$pass);
  if($login["login"]){

    $consulta = "call mostrarProductos()";

    $resultado = consulta($consulta);

    $array = [];

    while($fila = mysqli_fetch_assoc($resultado)){
      $array[$fila["grupo"]][] = $fila;
    }
    return array("productos" => $array);

  }else{
    return $login;
  }
}

?>