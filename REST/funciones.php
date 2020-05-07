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
    $_SESSION["USUARIO"] = array("email"=>$email,"pass"=>$pass, "codUsuario"=>$fila["codUsuario"]);
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

function buscaLocales(){
  if(compruebaSesion()["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $_SESSION["USUARIO"]["codUsuario"];

    $consulta = "call muestraLocales($codUsuario)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    
    $arrayLocales = array();

    while($fila = mysqli_fetch_assoc($resultado)){
      $arrayLocales[] = $fila;
    }
    return array("locales" => $arrayLocales);
  }
  return array("locales" => false);
}

function muestraFacturasLocal($codLocal){
  if(compruebaSesion()["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $_SESSION["USUARIO"]["codUsuario"];

    $consulta = "call muestraFacturasLocal($codUsuario,$codLocal)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    
    $arrayProductos = array();

    while($fila = mysqli_fetch_assoc($resultado)){
      $arrayProductos[] = $fila;
    }
    return array("facturas" => $arrayProductos);
  }
  return array("facturas" => false);
}

function muestraProductosFactura($codFactura){
  if(compruebaSesion()["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $_SESSION["USUARIO"]["codUsuario"];

    $consulta = "call muestraProductosFactura($codUsuario,$codFactura)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    
    $arrayProductos = array();

    while($fila = mysqli_fetch_assoc($resultado)){
      $arrayProductos[] = $fila;
    }
    return array("productos" => $arrayProductos);
  }
  return array("productos" => false);
}

?>