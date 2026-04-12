document.addEventListener("DOMContentLoaded", () => {
    const range = document.getElementById("range4");
    const output = document.getElementById("rangeValue");
    const productos = document.querySelectorAll(".card");

    //Mostrar el valor del rango
    output.textContent = "$" + Number(range.value).toLocaleString("es-CO");

    range.addEventListener("input", () => {
        const valor = parseInt(range.value);
        output.textContent = "$" + valor.toLocaleString("es-CO");

        //Revisar cada producto
        productos.forEach((producto) => {
            const precio = parseInt(producto.dataset.precio);
            const contenedor = producto.closest("article");

            //Verificar si el precio es menor que el valor mostrado
            contenedor.style.display = (precio <= valor) ? "" : "none";
        });
    });
});