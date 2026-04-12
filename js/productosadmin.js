document.addEventListener("DOMContentLoaded", () => {

    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

    let listaPostres = document.getElementById("listaPostres");
    let listaTortas = document.getElementById("listaTortas");
    let listaOtros = document.getElementById("listaOtros");

    listaPostres.innerHTML = "";
    listaTortas.innerHTML = "";
    listaOtros.innerHTML = "";

    // 🔹 NAV DINÁMICO
    let menu = document.getElementById("menuCategorias");

    if(menu){
        // separador opcional
        menu.innerHTML += `<li><hr class="dropdown-divider"></li>`;

        categorias.forEach(cat => {
            let li = document.createElement("li");

            li.innerHTML = `
                <a class="dropdown-item" href="productosadmin.html#${cat.id}">
                    ${cat.nombre}
                </a>
            `;

            menu.appendChild(li);
        });
    }

    let contenedorPrincipal = document.querySelector("main");

    // 🔹 CREAR CATEGORÍAS DINÁMICAS
    categorias.forEach(cat => {

        let seccion = document.createElement("section");
        seccion.className = "container zona-productos";
        seccion.id = cat.id;

        seccion.innerHTML = `
        <h1>
            <span class="tituloSeccion">${cat.nombre}</span>

            <button class="btnLapiz">
                <i class="bi bi-pencil-fill"></i>
            </button>

            <button class="btnEliminarCat" data-id="${cat.id}">
                <i class="bi bi-trash-fill"></i>
            </button>
        </h1>
        <hr>
        <div class="row" id="lista-${cat.id}"></div>
        `;

        contenedorPrincipal.appendChild(seccion);
    });

    // 🔹 MOSTRAR PRODUCTOS
    productos.forEach(p => {

        let card = `
        <div class="col-md-3">
            <div class="card" data-precio="${p.precio}">
                <img src="${p.imagen}" class="card-img-top">
                <div class="card-body">
                    <h5>${p.nombre}</h5>
                    <h5>$${p.precio}</h5>
                    <button class="btn btnComprar btnEditar" onclick="editarProducto(${p.id})">Editar</button>
                    <button class="btn btnComprar" onclick="verProducto(${p.id})">Ver</button>
                </div>
            </div>
        </div>
        `;

        if (p.categoria === "tortas") {
            listaTortas.innerHTML += card;

        } else if (p.categoria === "postres") {
            listaPostres.innerHTML += card;

        } else if (p.categoria === "otros") {
            listaOtros.innerHTML += card;

        } else {

            let listaDinamica = document.getElementById("lista-" + p.categoria);

            if (listaDinamica) {
                listaDinamica.innerHTML += card;
            } else {
                listaOtros.innerHTML += card;
            }
        }

    });

    activarEdicionTitulos();
});


// 🔹 REDIRECCIONES
function editarProducto(id){
    window.location.href = `editarproducto.html?id=${id}`;
}

function verProducto(id){
    window.location.href = `producto-detalle.html?id=${id}`;
}


// 🔹 FILTRO PRECIO
document.addEventListener("DOMContentLoaded", () => {

    const range = document.getElementById("range4");
    const output = document.getElementById("rangeValue");

    output.textContent = "$" + Number(range.value).toLocaleString("es-CO");

    range.addEventListener("input", () => {

        const valor = parseInt(range.value);
        output.textContent = "$" + valor.toLocaleString("es-CO");

        document.querySelectorAll(".card").forEach(card => {

            const precio = parseInt(card.dataset.precio);
            const contenedor = card.closest(".col-md-3");

            contenedor.style.display = (precio <= valor) ? "" : "none";
        });
    });
});


// 🔹 CREAR CATEGORÍA
document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btnNuevaCategoria");

    if(btn){
        btn.addEventListener("click", () => {

            let nombre = prompt("Nombre de la nueva categoría:");

            if(nombre){

                let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

                let nueva = {
                    id: "cat_" + Date.now() + "_" + Math.floor(Math.random()*1000),
                    nombre: nombre
                };

                categorias.push(nueva);
                localStorage.setItem("categorias", JSON.stringify(categorias));

                location.reload();
            }

        });
    }

});


// 🔹 EDITAR TÍTULOS
function activarEdicionTitulos(){

    document.querySelectorAll(".btnLapiz").forEach((btn, index) => {

        let contenedor = btn.parentElement;
        let titulo = contenedor.querySelector(".tituloSeccion");

        let guardado = localStorage.getItem("titulo" + index);
        if(guardado){
            titulo.textContent = guardado;
        }

        btn.onclick = () => {

            let nuevoNombre = prompt("Nuevo nombre:");

            if(nuevoNombre){

                titulo.textContent = nuevoNombre;

                let categorias = JSON.parse(localStorage.getItem("categorias")) || [];

                if(categorias[index - 3]){
                    categorias[index - 3].nombre = nuevoNombre;
                    localStorage.setItem("categorias", JSON.stringify(categorias));
                }

                localStorage.setItem("titulo" + index, nuevoNombre);
            }
        };
    });
}


// 🔹 ELIMINAR CATEGORÍA
document.addEventListener("click", (e) => {

    if(e.target.closest(".btnEliminarCat")){

        let btn = e.target.closest(".btnEliminarCat");
        let id = btn.dataset.id;

        if(!confirm("¿Eliminar categoría y sus productos?")) return;

        let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
        categorias = categorias.filter(cat => cat.id !== id);
        localStorage.setItem("categorias", JSON.stringify(categorias));

        let productos = JSON.parse(localStorage.getItem("productos")) || [];

        productos = productos.filter(p => {
            return p.categoria && p.categoria !== id;
        });

        localStorage.setItem("productos", JSON.stringify(productos));

        // limpiar títulos bug
        Object.keys(localStorage).forEach(key => {
            if(key.startsWith("titulo")){
                localStorage.removeItem(key);
            }
        });

        location.reload();
    }
});