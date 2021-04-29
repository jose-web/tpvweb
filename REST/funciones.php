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

function imagen($tipo, $codigo, $nuevaImagen, $nombreAntiguaFoto=""){
  if($nuevaImagen!= "" && $nuevaImagen["error"] == 0 && strrpos($nuevaImagen["type"],"image").""=="0"){

    if($nombreAntiguaFoto != ""){
      $antiguaFoto = "img/$tipo/".$nombreAntiguaFoto;
      if($nombreAntiguaFoto != "sin_imagen.jpg" && file_exists($antiguaFoto))
        unlink($antiguaFoto);
    }

    $arrayNombre = explode(".",$nuevaImagen['name']);
    
    $nuevoNombreImagen = $codigo.".".$arrayNombre[count($arrayNombre)-1];
    if($nuevoNombreImagen == $nombreAntiguaFoto) $nuevoNombreImagen="nueva".$nuevoNombreImagen;
    $origen = $nuevaImagen['tmp_name'];
    move_uploaded_file( $origen, "img/$tipo/$nuevoNombreImagen" );

    return codificar($nuevoNombreImagen);
  }
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

//////////////////////////// USUARIOS ////////////////////////////

function mostrarUsuarios($email,$pass){
  $login = login($email,$pass);
  if($login["login"]){

    $consulta = "call mostrarUsuarios()";

    $resultado = consulta($consulta);

    $array = [];

    while($fila = mysqli_fetch_assoc($resultado)){
      $array[] = $fila;
    }
    return array("usuarios" => $array);

  }else{
    return $login;
  }
}

function nuevoUsuario($email,$pass,$nuevoEmail,$nuevaPass){
  $login = login($email,$pass);
  if($login["login"]){

    $nuevoEmailCodificar = codificar($nuevoEmail);
    $nuevaPassCodificar = codificar($nuevaPass);

    $consulta = "call nuevoUsuario('$nuevoEmailCodificar','$nuevaPassCodificar')";

    $resultado = consulta($consulta);

    return array("respuesta" => true);

  }else{
    return $login;
  }
}

function editarUsuario($email,$pass,$codUsuario,$nombre){
  $login = login($email,$pass);
  if($login["login"]){

    $codUsuarioCodificar = codificar($codUsuario);
    $nombreCodificar = codificar($nombre);

    $consulta = "call editarUsuario($codUsuarioCodificar,'$nombreCodificar')";

    $resultado = consulta($consulta);

    return array("respuesta" => true);

  }else{
    return $login;
  }
}

function eliminarUsuario($email,$pass,$codUsuario){
  $login = login($email,$pass);
  if($login["login"]){

    $codUsuarioCodificar = codificar($codUsuario);

    $consulta = "call eliminarUsuario($codUsuarioCodificar)";

    $resultado = consulta($consulta);

    return array("respuesta" => true);

  }else{
    return $login;
  }
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

function mostrarTodasFacturas($email,$pass){
  $login = login($email,$pass);
  if($login["login"]){

    $consulta = "call mostrarTodasFacturas()";

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

function mostrarFacturaSimplificada($email,$pass,$codFactura){
  $login = login($email,$pass);
  if($login["login"]){
    $codFacturaCodificar = codificar($codFactura);

    $consulta = "select nombreFactura from factura where codFactura = $codFacturaCodificar";

    $resultado = consulta($consulta);

    $nombreFactura = "Factura sin nombre";

    if($fila = mysqli_fetch_assoc($resultado)){
      $nombreFactura = $fila["nombreFactura"];
    }

    $consulta = "call mostrarFacturaSimplificada($codFacturaCodificar)";

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

function nuevoProducto($email,$pass,$nombre,$precio,$img,$grupo){
  $login = login($email,$pass);
  if($login["login"]){

    $nombreCodificar = codificar($nombre);
    $precioCodificar = codificar($precio);
    $grupoCodificar = codificar($grupo);

    $consulta = "call nuevoProducto('$nombreCodificar',$precioCodificar,'$grupoCodificar')";

    $resultado = consulta($consulta);

    if($img != ""){
      if($fila = mysqli_fetch_assoc($resultado)){
        $codProducto = $fila["codProducto"];
        $nuevaImagen = imagen("productos", $codProducto ,$img);
      }

      $consulta = "call editarProducto($codProducto,'$nombreCodificar',$precioCodificar,'$nuevaImagen','$grupoCodificar')";

      $resultado = consulta($consulta);
    }

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

function editarProducto($email,$pass,$codProducto,$nombre,$precio,$img,$grupo){
  $login = login($email,$pass);
  if($login["login"]){

    $codProductoCodificar = codificar($codProducto);
    $nombreCodificar = codificar($nombre);
    $precioCodificar = codificar($precio);
    $grupoCodificar = codificar($grupo);

    

    $consulta = "call mostrarImagenProducto($codProductoCodificar)";

    $resultado = consulta($consulta);

    if($fila = mysqli_fetch_assoc($resultado))
      if($img == "")
        $nuevaImagen = $fila["img"];
      else 
        $nuevaImagen = imagen("productos", $codProducto ,$img, $fila["img"]);

    $consulta = "call editarProducto($codProductoCodificar,'$nombreCodificar',$precioCodificar,'$nuevaImagen','$grupoCodificar')";

    $resultado = consulta($consulta);
    
    return array("respuesta" => true);

  }else{
    return $login;
  }
}


?>