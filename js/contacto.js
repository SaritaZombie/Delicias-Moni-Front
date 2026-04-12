const form = document.getElementById("miFormulario");
const mensaje = document.getElementById("mensajeExito");

form.addEventListener("submit", function(e) {
    e.preventDefault(); // 🚫 evita ir a otra página

    const data = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            mensaje.style.display = "block";
            form.reset();
        } else {
            alert("Error al enviar 😢");
        }
    })
    .catch(() => {
        alert("Error de conexión");
    });
});
