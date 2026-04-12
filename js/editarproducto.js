document.addEventListener("DOMContentLoaded", () => {

    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    let producto = productos.find(p => p.id == id);

    if (!producto) {
        alert("Producto no encontrado");
        return;
    }

    // LLENAR FORM
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("descripcion").value = producto.descripcion;

    let preview = document.getElementById("preview");
    preview.style.backgroundImage = `url(${producto.imagen})`;
    preview.style.backgroundSize = "cover";

    // GUARDAR CAMBIOS
    document.getElementById("formProducto").addEventListener("submit", (e) => {

        e.preventDefault();

        producto.nombre = document.getElementById("nombre").value;
        producto.precio = document.getElementById("precio").value;
        producto.descripcion = document.getElementById("descripcion").value;

        localStorage.setItem("productos", JSON.stringify(productos));

        alert("Producto actualizado 💕");

        window.location.href = "productosadmin.html";
    });

    // ELIMINAR PRODUCTO (AQUÍ VA)
    document.getElementById("btnEliminarProducto").addEventListener("click", () => {

        let confirmar = confirm("¿Seguro que quieres eliminar este producto?");
        if (!confirmar) return;

        let nuevosProductos = productos.filter(p => p.id != id);

        localStorage.setItem("productos", JSON.stringify(nuevosProductos));

        alert("Producto eliminado ❌");

        window.location.href = "productosadmin.html";
    });

});