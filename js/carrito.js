document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("btnAgregarCarrito");

    let idEliminar = null;

    const modal = document.getElementById("modalEliminar");
    const btnConfirmar = document.getElementById("confirmarEliminar");
    const btnCancelar = document.getElementById("cancelarEliminar");

    //  abrir modal
    document.querySelectorAll(".eliminarBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            idEliminar = btn.dataset.id;
            modal.style.display = "flex";
        });
    });

    //  cancelar
    btnCancelar.addEventListener("click", () => {
        modal.style.display = "none";
        idEliminar = null;
    });

    //  confirmar eliminar
    btnConfirmar.addEventListener("click", () => {

        fetch(`/Delicias-Moni/index.php?action=eliminarCarrito&id=${idEliminar}`)
            .then(() => {
                //  quitar visualmente sin recargar
                location.reload(); // si quieres luego lo quitamos
            });

    });

    if (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            const id = this.dataset.id;
            const precio = this.dataset.precio;
            let cantidad = document.getElementById("inputNumero").value;

            if (!cantidad || cantidad <= 0) {
                cantidad = 1;
            }

            window.location.href = `/Delicias-Moni/index.php?action=agregarCarrito&id=${id}&precio=${precio}&cantidad=${cantidad}`;


        });
    }

    let cantidad = document.getElementById("inputNumero").value;
    document.getElementById("cantidadInput").value = cantidad;
    function sumarCantidad() {
        let input = document.getElementById("cantidadInput");
        input.value = parseInt(input.value) + 1;
    }

    function restarCantidad() {
        let input = document.getElementById("cantidadInput");
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    }

});
