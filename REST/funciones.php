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


function muestraFacturas($email,$pass){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];

    $consulta = "call muestraFacturas()";
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

function muestraProductosLocal(){
   
  $arrayResultados= creaArrayProductos();

  return array("categorias" => $arrayResultados);

}

function creaArrayProductos($padre = "null"){
  include "conexion.php";

  if(!$con){
    return array("mensaje_error" => "Error al conectar con la base de datos.");
  }

  mysqli_set_charset($con,"utf8");

  $consulta = "call muestraProductosLocal($padre)";
  $resultado = mysqli_query($con,$consulta);
  mysqli_close($con);

  if(!$resultado){
    return array("mensaje_error" => "Error al realizar la consulta");
  }
  $arrayResultados = [];
  while($fila = mysqli_fetch_assoc($resultado)){
    $nuevoArray=[];
    $nuevoArray["nombre"] = $fila["nombre"];

    if(isset($fila["codCategoria"])){
      $nuevoArray["codCategoria"] = $fila["codCategoria"];
      $nuevoArray["dentroCategoria"]=creaArrayProductos($fila["codCategoria"]);
    }

    if(isset($fila["codProducto"])){
      $nuevoArray["codProducto"] = $fila["codProducto"];
      $nuevoArray["precio"] = $fila["precio"];
      $nuevoArray["disponibilidad"] = $fila["disponibilidad"];
    }

    
    $arrayResultados[] = $nuevoArray;
  }

  return $arrayResultados;
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

function actualizaDatosUsuario($email,$pass,$nuevoNombre,$nuevoApellido1,$nuevoApellido2,$nuevoEmail,$nuevaPass,$nuevaImagen,$tema){
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
    $tema = mysqli_real_escape_string($con,$tema);

    $nuevoNombreImagen='';
    if($nuevaImagen!= "" && $nuevaImagen["error"] == 0 && strrpos($nuevaImagen["type"],"image").""=="0"){

      $consulta = "call muestraImagenPerfil($codUsuario)";
      $resultado = mysqli_query($con,$consulta);
      $fila = mysqli_fetch_assoc($resultado);

      $nombreAntiguaFoto = $fila["img"];
      $antiguaFoto = "img/usuarios/".$nombreAntiguaFoto;
      if($fila["img"] != "defaultUser.png" && file_exists($antiguaFoto))
         unlink($antiguaFoto);

      mysqli_next_result($con);

      $arrayNombre = explode(".",$nuevaImagen['name']);
      
      $nuevoNombreImagen = $codUsuario.".".$arrayNombre[count($arrayNombre)-1];
      if($nuevoNombreImagen == $nombreAntiguaFoto) $nuevoNombreImagen="nueva".$nuevoNombreImagen;
      $origen = $nuevaImagen['tmp_name'];
      move_uploaded_file( $origen, "img/usuarios/$nuevoNombreImagen" );
    }

    $consulta = "call actualizaDatosUsuario($codUsuario,'$nuevoNombre','$nuevoApellido1','$nuevoApellido2','$nuevoEmail','$nuevaPass','$nuevoNombreImagen','$tema')";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }

    return array("usuario" => true,"nuevaImagen"=>$nuevoNombreImagen);
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

function habilitaTrabajador($email,$pass){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];

    $consulta = "call habilitaTrabajador($codUsuario)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    return array("trabajador" => true);
  }
  return array("trabajador" => false);
}

function creaFactura($email,$pass,$idMesa,$nombreCliente){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $idMesa = mysqli_real_escape_string($con,$idMesa);
    $nombreCliente = mysqli_real_escape_string($con,$nombreCliente);

    $consulta = "call creaFactura($codUsuario,$idMesa,'$nombreCliente')";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    return array("creaFactura" => true);
  }
  return array("creaFactura" => false);
}

function creaFacturaBarra($email,$pass){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];

    $consulta = "call creaFacturaBarra($codUsuario)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    $fila = mysqli_fetch_assoc($resultado);
    return array("creaFacturaBarra" => true,"codFactura" =>$fila["codFactura"]);
  }
  return array("creaFacturaBarra" => false);
}

function actualizaFactura($email,$pass,$idFactura,$nuevoNombreCliente,$estadoPagado){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $idFactura = mysqli_real_escape_string($con,$idFactura);
    $nuevoNombreCliente = mysqli_real_escape_string($con,$nuevoNombreCliente);
    $estadoPagado = mysqli_real_escape_string($con,$estadoPagado);

    $consulta = "call actualizaFactura($codUsuario,$idFactura,'$nuevoNombreCliente',$estadoPagado)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    return array("actualizaFactura" => true);
  }
  return array("actualizaFactura" => false);
}

function crearCategoria($email,$pass,$codLocal,$nombre,$padre){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $codLocal = mysqli_real_escape_string($con,$codLocal);
    $nombre = mysqli_real_escape_string($con,$nombre);
    $padre = mysqli_real_escape_string($con,$padre);

    $consulta = "call crearCategoria($codUsuario,$codLocal,'$nombre',$padre)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    return array("crearCategoria" => true);
  }
  return array("crearCategoria" => false);
}

function crearProducto($email, $pass, $codLocal, $codCategoria, $nombreProducto, $descripcionProducto, $imagen, $precioProducto, $disponibilidadProducto){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $codLocal = mysqli_real_escape_string($con,$codLocal);
    $codCategoria = mysqli_real_escape_string($con,$codCategoria);
    $nombreProducto = mysqli_real_escape_string($con,$nombreProducto);
    $descripcionProducto = mysqli_real_escape_string($con,$descripcionProducto);
    $precioProducto = mysqli_real_escape_string($con,$precioProducto);
    $disponibilidadProducto = mysqli_real_escape_string($con,$disponibilidadProducto);

    $consulta = "call crearProducto($codUsuario, $codLocal, $codCategoria, '$nombreProducto', '$descripcionProducto', $imagen, $precioProducto, $disponibilidadProducto)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    return array("crearProducto" => true);
  }
  return array("crearProducto" => false);
}

function addProductoFactura($email, $pass, $idFactura, $idProducto, $precio, $cantidad, $comentario){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $idFactura = mysqli_real_escape_string($con,$idFactura);
    $idProducto = mysqli_real_escape_string($con,$idProducto);
    $precio = mysqli_real_escape_string($con,$precio);
    $cantidad = mysqli_real_escape_string($con,$cantidad);
    $comentario = mysqli_real_escape_string($con,$comentario);

    $consulta = "call addProductoFactura($codUsuario,$idFactura,$idProducto,$precio,$cantidad,'$comentario')";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    return array("addProductoFactura" => true);
  }
  return array("addProductoFactura" => false);
}

function editaProducto($email, $pass, $idLocal, $idCategoria, $idProducto, $precio, $disponibilidad){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $idLocal = mysqli_real_escape_string($con,$idLocal);
    $idCategoria = mysqli_real_escape_string($con,$idCategoria);
    $idProducto = mysqli_real_escape_string($con,$idProducto);
    $precio = mysqli_real_escape_string($con,$precio);
    $disponibilidad = mysqli_real_escape_string($con,$disponibilidad);

    $consulta = "call editaProducto($codUsuario,$idLocal,$idCategoria,$idProducto,$precio,$disponibilidad)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    return array("editaProducto" => true);
  }
  return array("editaProducto" => false);
}

function actualizaProductoFactura($email, $pass, $idLineaDeFactura, $nuevoPrecio, $nuevaCantidad,$nuevoComentario){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $idLineaDeFactura = mysqli_real_escape_string($con,$idLineaDeFactura);
    $nuevoPrecio = mysqli_real_escape_string($con,$nuevoPrecio);
    $nuevaCantidad = mysqli_real_escape_string($con,$nuevaCantidad);
    $nuevoComentario = mysqli_real_escape_string($con,$nuevoComentario);

    $nuevaCantidad = $nuevaCantidad >0?$nuevaCantidad:"";

    $consulta = "call actualizaProductoFactura($codUsuario,$idLineaDeFactura,'$nuevoPrecio','$nuevaCantidad','$nuevoComentario')";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    return array("actualizaProductoFactura" => true);
  }
  return array("actualizaProductoFactura" => false);
}

function borraProductoFactura($email, $pass, $idLineaDeFactura){
  $sesion = compruebaSesion($email,$pass);
  if($sesion["respuesta"]){
    include "conexion.php";

    if(!$con){
      return array("mensaje_error" => "Error al conectar con la base de datos.");
    }
  
    mysqli_set_charset($con,"utf8");
  
    $codUsuario = $sesion["id"];
    $idLineaDeFactura = mysqli_real_escape_string($con,$idLineaDeFactura);

    $consulta = "call borraProductoFactura($codUsuario,$idLineaDeFactura)";
    $resultado = mysqli_query($con,$consulta);
    mysqli_close($con);
  
    if(!$resultado){
      return array("mensaje_error" => "Error al realizar la consulta");
    }
    return array("borraProductoFactura" => true);
  }
  return array("borraProductoFactura" => false);
}

?>