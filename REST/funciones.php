<?php

function login($email,$pass){
  include "conexion.php";

  if(!$con){
    return array("mensaje_error" => "Error al conectar con la base de datos.");
  }

  mysqli_set_charset($con,"utf8");

  $emailCodificado = mysqli_real_escape_string($con,$email);
  $passCodificado = mysqli_real_escape_string($con,$pass);

  $consulta = "call login('$emailCodificado', '$passCodificado')";
  $resultado = mysqli_query($con,$consulta);
  mysqli_close($con);

  if(!$resultado){
    return array("mensaje_error" => "Error al realizar la consulta");
  }

  if($fila = mysqli_fetch_assoc($resultado))
    return array("login" => true, "id"=>$fila["codUsuario"]);
  else
    return array("login" => false);
}

function compruebaSesion($email,$pass){
    $login = login($email,$pass);

    if($login["login"])
      return array("respuesta" =>true,"id"=>$login["id"]);
    else
      return array("respuesta" => false);
}

function cerrarSesion(){
  session_destroy();
}

function buscaLocales($email,$pass){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];

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

function muestraFacturasLocal($email,$pass,$id){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $codLocal = $id;

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

function muestraProductosFactura($email,$pass,$codFactura){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
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

function muestraLocalesEncargado($email,$pass){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];

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

function muestraEmpleadosLocal($email,$pass,$codLocal){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $codLocal = mysqli_real_escape_string($con,$codLocal);

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