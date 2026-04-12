const lista = document.getElementById("listaPedidos");
const saludo = document.getElementById("saludoUsuario");

let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

if (usuario) {
    saludo.textContent = `Hola, ${usuario.nombre}  aquí están tus pedidos`;
}

let misPedidos = pedidos.filter(p => p.cliente === usuario?.nombre);

localStorage.setItem("usuarioActivo", JSON.stringify({
    nombre: "Ana López"
}));

localStorage.setItem("pedidos", JSON.stringify([
    {
        id: 1,
        cliente: "Ana López",
        total: 25000,
        estado: "pendiente"
    },
    {
        id: 2,
        cliente: "Ana López",
        total: 48000,
        estado: "proceso"
    },
    {
        id: 3,
        cliente: "Ana López",
        total: 32000,
        estado: "entregado"
    },
    {
        id: 4,
        cliente: "Juan Pérez",
        total: 15000,
        estado: "pendiente"
    }
]));

function mostrarPedidos() {

    lista.innerHTML = "";

    if (misPedidos.length === 0) {
        lista.innerHTML = `<p style="text-align:center; color:#888; margin:30px;">No tienes pedidos aún</p>`;
        return;
    }

    misPedidos.forEach(p => {
        lista.innerHTML += `
            <div class="fila">
                <div>#${p.id}</div>
                <div>$${p.total}</div>
                <div>
                    <span class="estado ${p.estado}">
                        ${formatearEstado(p.estado)}
                    </span>
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