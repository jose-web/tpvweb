<?php

//////////////////////////// OTROS ////////////////////////////

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

//////////////////////////// LOGIN ////////////////////////////

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

//////////////////////////// FACTURAS ////////////////////////////

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

    $consulta = "select nombreFactura from factura where codFactura = $codFacturaCodificar";

    $resultado = consulta($consulta);

    $nombreFactura = "Factura sin nombre";

    if($fila = mysqli_fetch_assoc($resultado)){
      $nombreFactura = $fila["nombreFactura"];
    }

    $consulta = "call mostrarFactura($codFacturaCodificar)";

    $resultado = consulta($consulta);

    $array = [];

    while($fila = mysqli_fetch_assoc($resultado)){
      $array[] = $fila;
    }
    return array("nombreFactura" => $nombreFactura, "factura" => $array);

  }else{
    return $login;
  }
}

function editarNombreFactura($email,$pass,$codFactura,$nombre){
  $login = login($email,$pass);
  if($login["login"]){
    $codFacturaCodificar = codificar($codFactura);
    $nombreCodificar = codificar($nombre);

    $consulta = "call editarNombreFactura($codFacturaCodificar,'$nombreCodificar')";

    $resultado = consulta($consulta);

    return array("facturas" => true);

  }else{
    return $login;
  }
}

function ocultarFactura($email,$pass,$codFactura){
  $login = login($email,$pass);
  if($login["login"]){
    $codFacturaCodificar = codificar($codFactura);

    $consulta = "call ocultarFactura($codFacturaCodificar)";

    $resultado = consulta($consulta);

    return array("factura" => true);

  }else{
    return $login;
  }
}

//////////////////////////// PRODUCTOS ////////////////////////////

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

function nuevoProducto($email,$pass,$nombre,$precio,$grupo){
  $login = login($email,$pass);
  if($login["login"]){

    $nombreCodificar = codificar($nombre);
    $precioCodificar = codificar($precio);
    $grupoCodificar = codificar($grupo);

    $consulta = "call nuevoProducto('$nombreCodificar',$precioCodificar,'$grupoCodificar')";

    $resultado = consulta($consulta);

    return array("respuesta" => true);

  }else{
    return $login;
  }
}

function insertarProductoEnFactura($email,$pass,$codFactura,$nombre,$precio,$cantidad){
  $login = login($email,$pass);
  if($login["login"]){

    $codFacturaCodificar = codificar($codFactura);
    $nombreCodificar = codificar($nombre);
    $precioCodificar = codificar($precio);
    $cantidadCodificar = codificar($cantidad);

    $consulta = "call insertarProductoEnFactura($codFacturaCodificar,'$nombreCodificar',$precioCodificar,$cantidadCodificar)";

    $resultado = consulta($consulta);

    $respuesta = true;
    
    if($fila = mysqli_fetch_assoc($resultado)){
      $respuesta = $fila["codFactura"];
    }
    
    return array("respuesta" => $respuesta);

  }else{
    return $login;
  }
}

function editarProducto($email,$pass,$codProducto,$nombre,$precio,$grupo){
  $login = login($email,$pass);
  if($login["login"]){

    $codProductoCodificar = codificar($codProducto);
    $nombreCodificar = codificar($nombre);
    $precioCodificar = codificar($precio);
    $grupoCodificar = codificar($grupo);

    $consulta = "call editarProducto($codProductoCodificar,'$nombreCodificar',$precioCodificar,'$grupoCodificar')";

    $resultado = consulta($consulta);
    
    return array("respuesta" => true);

  }else{
    return $login;
  }
}


?>