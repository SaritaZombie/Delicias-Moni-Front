let inputImagen = document.getElementById("inputImagen");
let preview = document.getElementById("preview");
let imagenBase64 = "";

inputImagen.addEventListener("change", function () {
    let file = inputImagen.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        imagenBase64 = e.target.result;
        preview.style.backgroundImage = `url(${imagenBase64})`;
        preview.style.backgroundSize = "cover";
    };

    reader.readAsDataURL(file);
});

document.getElementById("btnEliminarImg").addEventListener("click", function () {
    preview.style.backgroundImage = "";
    imagenBase64 = "";
    inputImagen.value = "";
});

let selectCategoria = document.getElementById("categoria");

// CARGAR CATEGORÍAS
let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

// categorías fijas (las que ya tienes)
let categoriasFijas = [
    { id: "postres", nombre: "Postres" },
    { id: "tortas", nombre: "Tortas" },
    { id: "otros", nombre: "Otros" }
];

// unir todas
let todas = [...categoriasFijas, ...categorias];

// pintar opciones
todas.forEach(cat => {
    let option = document.createElement("option");
    option.value = cat.id;
    option.textContent = cat.nombre;
    selectCategoria.appendChild(option);
});

document.getElementById("formProducto").addEventListener("submit", function (e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let categoria = document.getElementById("categoria").value;
    let descripcion = document.getElementById("descripcion").value;

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    if (!categoria) {
        alert("Selecciona una categoría");
        return;
    }
    
    productos.push({
        id: Date.now(),
        nombre,
        precio,
        descripcion,
        imagen: imagenBase64,
        categoria
    });

    localStorage.setItem("productos", JSON.stringify(productos));

    alert("Producto agregado");

    window.location.href = "productosadmin.html";

    
});

