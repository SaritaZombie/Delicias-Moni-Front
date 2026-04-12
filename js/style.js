const btn = document.getElementById("btnBuscar");
const buscador = document.getElementById("buscador");
const resultados = document.getElementById("resultados");

//Productos (simulación de base de datos)
const productos = [
    {
        nombre: "Palillos de Donas",
        img: "img/dona3.jpg",
        link: "#"
    },
    {
        nombre: "Deditos de Queso",
        img: "img/deditos.png",
        link: "#"
    },
    {
        nombre: "Manzanas Caramelizadas",
        img: "img/image.jpg",
        link: "#"
    },
    {
        nombre: "Gelatinas",
        img: "img/image (1).png",
        link: "#"
    }
    ,
    {
        nombre: "Postres 3 Leches",
        img: "img/postrefresas.jpg",
        link: "postre-3-leches.html"
    }
    ,
    {
        nombre: "Postre Napoleón",
        img: "img/napoleon4.jpg",
        link: "#"
    }
    ,
    {
        nombre: "Fresas con Crema",
        img: "img/fresas.jpg",
        link: "#"
    }
    ,
    {
        nombre: "Pudin de Frambuesa",
        img: "img/postre_fresa.jpeg",
        link: "#"
    }
    ,
    {
        nombre: "Pudin Personalizado",
        img: "img/torta3.jpeg",
        link: "#"
    }
];

//Mostrar input al hacer click
btn.addEventListener("click", (e) => {
    e.preventDefault();
    buscador.classList.toggle("oculto");
    buscador.focus();
});

//Filtrar mientras escribes
buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();

    resultados.innerHTML = "";

    if (texto === "") {
        resultados.classList.add("oculto");
        return;
    }

    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    filtrados.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("item");

        div.innerHTML = `
            <img src="${p.img}">
            <span>${p.nombre}</span>
        `;

        //Redirigir al hacer click
        div.addEventListener("click", () => {
            window.location.href = p.link;
        });

        resultados.appendChild(div);
    });

    resultados.classList.remove("oculto");
});

//Cerrar si haces click afuera
document.addEventListener("click", (e) => {
    if (!e.target.closest(".contenedor-busqueda")) {
        resultados.classList.add("oculto");
    }
});
