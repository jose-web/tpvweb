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
    return array("login" => true, "id"=>$fila["codUsuario"], "img"=>$fila["img"]);
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

function muestraFacturasLocal($email,$pass,$codLocal){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $codLocal = mysqli_real_escape_string($con,$codLocal);

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

function buscarEmpleadosLocal($email,$pass,$codLocal,$busqueda){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $codLocal = mysqli_real_escape_string($con,$codLocal);
    $busqueda = mysqli_real_escape_string($con,$busqueda);

    $consulta = "call buscarEmpleadosLocal($codUsuario,$codLocal,'$busqueda')";
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

function cambiaTipoEmpleado($email,$pass,$codigousuario,$tipo,$codLocal){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $codLocal = mysqli_real_escape_string($con,$codLocal);
    $codigousuario = mysqli_real_escape_string($con,$codigousuario);
    $tipo = mysqli_real_escape_string($con,$tipo);

    $consulta = "call cambiaTipoEmpleado($codUsuario,$codLocal,$codigousuario,'$tipo')";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }

    return array("empleados" => $resultado);
  }
  return array("empleados" => false);
}

function contratarEmpleado($email,$pass,$codLocal,$codUsuarioEmpleado,$tipo){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $codLocal = mysqli_real_escape_string($con,$codLocal);
    $codUsuarioEmpleado = mysqli_real_escape_string($con,$codUsuarioEmpleado);
    $tipo = mysqli_real_escape_string($con,$tipo);

    $consulta = "call contratarEmpleado($codUsuario,$codLocal,$codUsuarioEmpleado,'$tipo')";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }

    return array("empleados" => $resultado);
  }
  return array("empleados" => false);
}

function muestraProductosLocal($email,$pass,$codLocal){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $codLocal = mysqli_real_escape_string($con,$codLocal);

    $consulta = "call muestraProductosLocal($codUsuario,$codLocal)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }

    while($fila = mysqli_fetch_assoc($resultado)){
      $arrayResultados[] = $fila;
    }
    return array("productos" => $arrayResultados);
  }
  return array("productos" => false);
}

function registro($nombre,$apellido1,$apellido2,$email,$pass){

  $compruebaEmail = compruebaEmailRepetido($email)["cuentaEmail"];

  if($compruebaEmail == -1 || $compruebaEmail > 0)
      return array("usuario"=>false);

    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $nombre = mysqli_real_escape_string($con,$nombre);
    $apellido1 = mysqli_real_escape_string($con,$apellido1);
    $apellido2 = mysqli_real_escape_string($con,$apellido2);
    $email = mysqli_real_escape_string($con,$email);
    $pass = mysqli_real_escape_string($con,$pass);

    $consulta = "call registraUsuario('$nombre','$apellido1','$apellido2','$email','$pass')";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("usuario" => false);
    }
    return array("usuario" => true);
}

function compruebaEmailRepetido($email){

    if(!filter_var($email, FILTER_VALIDATE_EMAIL))
      return array("cuentaEmail"=>-1);

    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $email = mysqli_real_escape_string($con,$email);

    $consulta = "call compruebaEmailRepetido('$email')";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }

    $fila = mysqli_fetch_assoc($resultado);
    return $fila;
  
}

function actualizaDatosUsuario($email,$pass,$nuevoNombre,$nuevoApellido1,$nuevoApellido2,$nuevoEmail,$nuevaPass,$nuevaImagen){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $nuevoNombre = mysqli_real_escape_string($con,$nuevoNombre);
    $nuevoApellido1 = mysqli_real_escape_string($con,$nuevoApellido1);
    $nuevoApellido2 = mysqli_real_escape_string($con,$nuevoApellido2);
    $nuevoEmail = mysqli_real_escape_string($con,$nuevoEmail);
    $nuevaPass = mysqli_real_escape_string($con,$nuevaPass);

    $nuevoNombreImagen='';
    if($nuevaImagen!= "" && $nuevaImagen["error"] == 0 && strrpos($nuevaImagen["type"],"image").""=="0"){
      $arrayNombre = explode(".",$nuevaImagen['name']);
      
      $nuevoNombreImagen = $codUsuario.".".$arrayNombre[count($arrayNombre)-1];
      $origen = $nuevaImagen['tmp_name'];
      move_uploaded_file( $origen, "img/usuarios/$nuevoNombreImagen" );
    }

    $consulta = "call actualizaDatosUsuario($codUsuario,'$nuevoNombre','$nuevoApellido1','$nuevoApellido2','$nuevoEmail','$nuevaPass','$nuevoNombreImagen')";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }

    return array("usuario" => true);
  }
  return array("usuario" => false);
}

function ObtenerDatosUsuario($email,$pass){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];

    $consulta = "call ObtenerDatosUsuario($codUsuario)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    $fila = mysqli_fetch_assoc($resultado);
    return array("datos" => $fila);
  }
  return array("datos" => false);
}



?>