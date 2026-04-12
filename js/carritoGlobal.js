let carrito = JSON.parse(localStorage.getItem("carrito")) || []

function actualizarContador() {

    let total = 0

    carrito.forEach(p => total += p.cantidad)

    let c = document.getElementById("contadorCarrito")

    if (c) c.textContent = total

}

function agregar(b) {

    let id = b.dataset.id
    let nombre = b.dataset.nombre
    let precio = parseInt(b.dataset.precio)
    let img = b.dataset.img

    let prod = carrito.find(p => p.id == id)

    if (prod) {
        prod.cantidad++
    } else {
        carrito.push({
            id: id,
            nombre: nombre,
            precio: precio,
            img: img,
            cantidad: 1
        })
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))

    actualizarContador()

}

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".btnAgregar").forEach(b => {
        b.addEventListener("click", () => agregar(b))
    })

    actualizarContador()

})