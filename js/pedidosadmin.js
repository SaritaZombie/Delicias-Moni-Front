const lista = document.getElementById("listaPedidos");

// CREAR DATOS SI NO EXISTEN
if (!localStorage.getItem("pedidos")) {
    localStorage.setItem("pedidos", JSON.stringify([
        { id: 1, cliente: "Ana López", total: 25000, estado: "pendiente" },
        { id: 2, cliente: "Juan Pérez", total: 40000, estado: "proceso" }
    ]));
}

// TRAER PEDIDOS
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

// MOSTRAR PEDIDOS
function mostrarPedidos() {

    lista.innerHTML = "";

    if (pedidos.length === 0) {
        lista.innerHTML = `
            <p style="text-align:center; color:#888; margin:30px;">
                No hay pedidos aún
            </p>
        `;
        return;
    }

    pedidos.forEach(p => {
        lista.innerHTML += `
            <div class="fila">
                <div>${p.cliente}</div>
                <div>#${p.id}</div>
                <div>$${p.total}</div>
                <div class="estado-col">
                    <span class="estado ${p.estado}">
                        ${formatearEstado(p.estado)}
                    </span>
                    <a href="detallepedido.html?id=${p.id}" class="btn-ver">Ver más</a>
                </div>
            </div>
        `;
    });
}

function formatearEstado(estado) {
    if (estado === "pendiente") return "Pendiente";
    if (estado === "entregado") return "Entregado";
    if (estado === "proceso") return "En proceso";
    return estado;
}

mostrarPedidos();