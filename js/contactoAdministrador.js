const btn = document.getElementById("btnCambiar");
const contenedor = document.getElementById("contenedorInput");
const guardar = document.getElementById("guardarMapa");
const input = document.getElementById("inputMapa");
const mapa = document.getElementById("mapaFrame");

// Mostrar input
btn.addEventListener("click", () => {
    contenedor.style.display = "block";
});

// Guardar nuevo link
guardar.addEventListener("click", () => {
    let nuevoLink = input.value.trim();

    if(nuevoLink !== "") {
        mapa.src = nuevoLink;
        input.value = "";
        contenedor.style.display = "none";
    }
});

/*
document.addEventListener("DOMContentLoaded", () => {

    const btnMostrar = document.getElementById("btnMostrar");
    const contenedorInput2 = document.getElementById("contenedorInput2");
    const guardar2 = document.getElementById("guardarMapa2");
    const input2 = document.getElementById("inputMapa2");
    const contenedorMapas = document.getElementById("contenedorMapas");

    // 1️⃣ Mostrar / ocultar input
    btnMostrar.addEventListener("click", () => {
        contenedorInput2.classList.toggle("oculto");
    });

    // 2️⃣ Crear nuevo mapa
    guardar2.addEventListener("click", () => {

        const link = input2.value.trim();

        if (link === "") return;

        // Crear iframe
        const iframe = document.createElement("iframe");
        iframe.src = link;
        iframe.classList.add("mapa");

        // Agregarlo al contenedor
        contenedorMapas.appendChild(iframe);

        // Limpiar input
        input2.value = "";

        // Ocultar input otra vez
        contenedorInput2.classList.add("oculto");
    });

});
*/