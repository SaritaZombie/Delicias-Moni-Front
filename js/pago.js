document.addEventListener("DOMContentLoaded", function () {

    let lista = document.getElementById("listaPedido");
    let totalTxt = document.getElementById("totalPedido");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;

    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML = "<p>Tu carrito está vacío</p>";
    } else {

        carrito.forEach(p => {

            let subtotal = p.precio * p.cantidad;
            total += subtotal;

            lista.innerHTML += `
                <div class="filaPedidoProducto">
                    <span>${p.nombre} x${p.cantidad}</span>
                    <span>$${subtotal}</span>
                </div>
            `;
        });
    }

    totalTxt.textContent = "$" + total;

    // ===== BOTON PAGAR =====
    let btn = document.querySelector(".btnRealizar");

    btn.addEventListener("click", function () {

        let metodo = document.querySelector('input[name="pago"]:checked');

        if (!metodo) {
            let msg = document.getElementById("mensajeErrorPago");
            msg.style.display = "block";
            msg.textContent = "Debes elegir un medio de pago 💕";
            return;
        }

        document.getElementById("mensajeErrorPago").style.display = "none";

        // OBTENER PEDIDOS EXISTENTES
        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

        // CREAR NUEVO PEDIDO
        let nuevoPedido = {
            id: pedidos.length + 1,

            cliente: document.getElementById("nombre").value + " " + document.getElementById("apellido").value,
            contacto: document.getElementById("whatsapp").value,
            email: document.getElementById("email").value,
            direccion: document.getElementById("direccion").value,
            notas: document.getElementById("notas").value,

            metodo: metodo.parentElement.textContent.trim(),

            productos: carrito,
            total: total,

            estado: "pendiente",
            fecha: new Date().toLocaleDateString()
        };

        // AGREGAR A LISTA DE PEDIDOS
        pedidos.push(nuevoPedido);

        // GUARDAR
        localStorage.setItem("pedidos", JSON.stringify(pedidos));

        // LIMPIAR CARRITO
        localStorage.removeItem("carrito");

        // REDIRIGIR
        window.location.href = "final.html";

    });

});