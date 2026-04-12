let carrito = JSON.parse(localStorage.getItem("carrito")) || []
let contenedor = document.getElementById("listaCarrito")

function dinero(n) {
    return "$" + n.toLocaleString("es-CO")
}

function cargar() {

    contenedor.innerHTML = ""
    let total = 0

    if (carrito.length == 0) {

        contenedor.innerHTML = `
<div class="text-center mt-5">
<i class="bi bi-cart-x" style="font-size:60px;color:#ff008c"></i>
<h4 class="mt-3">Tu carrito está vacío</h4>
<p>Agrega productos para continuar comprando</p>
</div>
`

        document.getElementById("total").textContent = "$0"

        let btn = document.getElementById("btnPagar")
        if (btn) btn.classList.add("disabled")

        actualizarContador()
        return
    }

    carrito.forEach((p, i) => {

        let sub = p.precio * p.cantidad
        total += sub

        contenedor.innerHTML += `
<div class="row producto">

<div class="col-5 d-flex align-items-center gap-3">
<i class="bi bi-x-lg eliminar" data-i="${i}"></i>
<img src="${p.img}" class="imgCarrito">
<p>${p.nombre}</p>
</div>

<div class="col-2">${dinero(p.precio)}</div>

<div class="col-3 contador">
<button class="menos btn btn-light" data-i="${i}">-</button>
<span>${p.cantidad}</span>
<button class="mas btn btn-light" data-i="${i}">+</button>
</div>

<div class="col-2">${dinero(sub)}</div>

</div>
`
    })

    document.getElementById("total").textContent = dinero(total)

    actualizarContador()
    eventos()
}

function eventos() {

    document.querySelectorAll(".mas").forEach(b => {
        b.onclick = () => {
            carrito[b.dataset.i].cantidad++
            guardar()
        }
    })

    document.querySelectorAll(".menos").forEach(b => {
        b.onclick = () => {
            let p = carrito[b.dataset.i]
            if (p.cantidad > 1) {
                p.cantidad--
                guardar()
            }
        }
    })

    document.querySelectorAll(".eliminar").forEach(b => {
        b.onclick = () => {
            carrito.splice(b.dataset.i, 1)
            guardar()
        }
    })

}

function guardar() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
    cargar()
}

cargar()