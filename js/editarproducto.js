function eliminarImagen() {

    // borrar preview
    document.getElementById("preview").innerHTML = "";

    // avisar a PHP que elimine la imagen
    document.getElementById("eliminar_imagen").value = "1";
}
