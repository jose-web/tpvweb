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
    
    $arrayResultados = array();

    while($fila = mysqli_fetch_assoc($resultado)){
      $arrayResultados[] = $fila;
    }
    return array("locales" => $arrayResultados);
  }
  return array("locales" => false);
}

function muestraFacturasLocal(){
  if(compruebaSesion()["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $_SESSION["USUARIO"]["codUsuario"];
    $codLocal = $_SESSION["codLocal"];

    $consulta = "call muestraFacturasLocal($codUsuario,$codLocal)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    
    $arrayResultados = array();

    while($fila = mysqli_fetch_assoc($resultado)){
      $arrayResultados[] = $fila;
    }
    return array("facturas" => $arrayResultados);
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
    $codFactura = mysqli_real_escape_string($con,$codFactura);

    $consulta = "call muestraProductosFactura($codUsuario,$codFactura)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    
    $arrayResultados = array();

    while($fila = mysqli_fetch_assoc($resultado)){
      $arrayResultados[] = $fila;
    }
    return array("productos" => $arrayResultados);
  }
  return array("productos" => false);
}


function cambiaLocal($codLocal){
  include "conexion.php";
  $codLocal = mysqli_real_escape_string($con,$codLocal);
  $_SESSION["codLocal"] = $codLocal;
  return array("codLocal" =>  $_SESSION["codLocal"]);
}

function muestraLocalesEncargado(){
  if(compruebaSesion()["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $_SESSION["USUARIO"]["codUsuario"];

    $consulta = "call muestraLocalesEncargado($codUsuario)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    
    $arrayResultados = array();

    while($fila = mysqli_fetch_assoc($resultado)){
      $arrayResultados[] = $fila;
    }
    return array("locales" => $arrayResultados);
  }
  return array("locales" => false);
}

function muestraEmpleadosLocal(){
  if(compruebaSesion()["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $_SESSION["USUARIO"]["codUsuario"];
    $codLocal = $_SESSION["codLocal"];

    $consulta = "call muestraEmpleadosLocal($codUsuario,$codLocal)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    
    $arrayResultados = array();

    while($fila = mysqli_fetch_assoc($resultado)){
      $arrayResultados[] = $fila;
    }
    return array("empleados" => $arrayResultados);
  }
  return array("empleados" => false);
}

function cambiaTipoEmpleado($codigousuario,$tipo){
  if(compruebaSesion()["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $_SESSION["USUARIO"]["codUsuario"];
    $codLocal = $_SESSION["codLocal"];
    $codigousuario = mysqli_real_escape_string($con,$codigousuario);
    $tipo = mysqli_real_escape_string($con,$tipo);

    $consulta = "call cambiaTipoEmpleado($codUsuario,$codLocal,$codigousuario,'$tipo')";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    
    $arrayResultados = array();

    while($fila = mysqli_fetch_assoc($resultado)){
      $arrayResultados[] = $fila;
    }
    return array("empleados" => $arrayResultados);
  }
  return array("empleados" => false);
}

?>