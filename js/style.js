const btn = document.getElementById("btnBuscar");
const buscador = document.getElementById("buscador");
const resultados = document.getElementById("resultados");



//Mostrar input al hacer click
btn.addEventListener("click", (e) => {
    e.preventDefault();
    buscador.classList.toggle("oculto");
    buscador.focus();
});

let timeoutBusqueda = null;

// Filtrar con debounce
buscador.addEventListener("input", () => {
    const texto = buscador.value.trim();

    clearTimeout(timeoutBusqueda);

    if (texto === "") {
        resultados.innerHTML = "";
        resultados.classList.add("oculto");
        return;
    }

    timeoutBusqueda = setTimeout(() => buscarProductos(texto), 300);
});

async function buscarProductos(texto) {
    try {
        const res = await fetch(`/Delicias-Moni/index.php?action=buscarProductos&q=${encodeURIComponent(texto)}`);
        const data = await res.json();

        const rol = data.rol;
        const productos = data.productos;

        resultados.innerHTML = "";

        if (productos.length === 0) {
            resultados.innerHTML = `<div class="item sin-resultados">Sin resultados para "${texto}"</div>`;
            resultados.classList.remove("oculto");
            return;
        }

        productos.forEach(p => {
            const img  = `/Delicias-Moni/${p.url}`;
            //Productos
            let link;
            if (rol === "admin") {
                link = `/Delicias-Moni/index.php?action=editarProducto&id=${p.id_producto}`;
            } else if (rol === "cliente") {
                link = `/Delicias-Moni/index.php?action=verProductoUsuario&id=${p.id_producto}`;
            } else {
                link = `/Delicias-Moni/index.php?action=verProducto&id=${p.id_producto}`;
            }
            const precio = Number(p.precio).toLocaleString("es-CO");

            const div = document.createElement("div");
            div.classList.add("item");
            div.innerHTML = `
                <img src="${img}" alt="${p.nombre}">
                <div class="item-info">
                    <span class="item-nombre">${p.nombre}</span>
                </div>
            `;

            div.addEventListener("click", () => {
                window.location.href = link;
            });

            resultados.appendChild(div);
        });

        resultados.classList.remove("oculto");

    } catch (err) {
        console.error("Error al buscar:", err);
        resultados.innerHTML = `<div class="item sin-resultados">Error al buscar productos</div>`;
        resultados.classList.remove("oculto");
    }
}


//Cerrar si haces click afuera
document.addEventListener("click", (e) => {
    if (!e.target.closest(".contenedor-busqueda")) {
        resultados.classList.add("oculto");
    }
});
