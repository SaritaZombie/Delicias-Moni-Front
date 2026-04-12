
// Cargar los codigos despues de cargar el DOM
document.addEventListener('DOMContentLoaded' , () =>{

// Leer el id de la URL
const params = new URLSearchParams(window.location.search);
const id = Number(params.get('id'));

// Buscar el producto en localStorage
const productos = JSON.parse(localStorage.getItem('productos')) || [];
const producto = productos.find(p => p.id === id);

// Si no hay producto se manda para atras 
if(!producto){
    alert('Producto no encontrado');
    window.location.href = 'productos.html';
    return;
}

// Rellenar los datos en la pagina
document.getElementById('productoNombre').textContent = producto.nombre;
document.getElementById('productoPrecio').textContent = '$' + Number(producto.precio).toLocaleString('es-CO')
document.getElementById('productoDescripcion').textContent = 'Descripción: ' + producto.descripcion;
document.getElementById('productoImagen').src = producto.imagen;

// Actualizar el key de comentarios 
const seccionComentarios = document.querySelector('.comentarios');
if (seccionComentarios){
    seccionComentarios.dataset.producto = 'producto-' + id;
}


document.title = producto.nombre + ' - Delicias Moni';

})