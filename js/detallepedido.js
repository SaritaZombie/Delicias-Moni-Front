// OBTENER ID
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// TRAER PEDIDOS
const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

// BUSCAR PEDIDO
const pedido = pedidos.find(p => p.id == id);

// SI NO EXISTE
if (!pedido) {
    alert("Pedido no encontrado");
    window.location.href = "pedidosadmin.html";
}

// LLENAR DATOS
document.getElementById("pedidoId").textContent = "#" + pedido.id;
document.getElementById("clienteNombre").textContent = pedido.cliente;
document.getElementById("fechaPedido").textContent = pedido.fecha || "Sin fecha";
document.getElementById("clienteContacto").textContent = pedido.contacto || "No registrado";
document.getElementById("totalPedido").textContent = "$" + pedido.total;

// ESTADO
document.getElementById("estadoPedido").value = pedido.estado;

// COMENTARIOS
document.getElementById("comentariosPedido").textContent = pedido.comentarios || "Sin comentarios";

// PRODUCTOS
const listaProductos = document.getElementById("listaProductos");

if (pedido.productos && pedido.productos.length > 0) {

    listaProductos.innerHTML = "";

    pedido.productos.forEach(prod => {
        listaProductos.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <div>
                    <strong>${prod.nombre}</strong><br>
                    Cantidad: ${prod.cantidad}
                </div>
                <div>
                    $${prod.precio}
                </div>
            </div>
        `;
    });

} else {
    listaProductos.innerHTML = "<p>No hay productos en este pedido</p>";
}

// ACTUALIZAR ESTADO
const btnActualizar = document.querySelector(".btn-actualizar");

btnActualizar.addEventListener("click", () => {

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // BUSCAR PEDIDO
    const index = pedidos.findIndex(p => p.id == id);

    if(index === -1){
        alert("Pedido no encontrado");
        return;
    }

    // NUEVO ESTADO
    const nuevoEstado = document.getElementById("estadoPedido").value;

    pedidos[index].estado = nuevoEstado;

    // GUARDAR CAMBIOS
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    alert("Estado actualizado correctamente 💕");
});

// VOLVER
const btnVolver = document.querySelector(".btn-volver");

btnVolver.addEventListener("click", () => {
    window.location.href = "pedidosadmin.html";
});