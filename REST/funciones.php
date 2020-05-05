<?php
function login($email,$pass){
  include "conexion.php";

  if(!$con){
    return array("mensaje_error" => "Error al conectar con la base de datos.");
  }

  mysqli_set_charset($con,"utf8");

  $consulta = "SELECT * FROM usuario WHERE email = '$email' AND pass = '$pass'";
  $resultado = mysqli_query($con,$consulta);
  mysqli_close($con);

  if(!$resultado){
    return array("mensaje_error" => "Error al realizar la consulta");
  }

  if($fila = mysqli_fetch_assoc($resultado)){
    return array("usuario" => $fila);
  }else {
    return array("mensaje" => "Usuario no se encuentra registrado en la BD.");
  }
}
?>
