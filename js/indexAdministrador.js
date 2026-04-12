// Cambiar nombre en línea
document.querySelectorAll('.btn-cambiar-nombre').forEach(boton => {
    boton.addEventListener('click', () => {
        const nombre = boton.closest('.producto').querySelector('.producto-nombre');
        nombre.contentEditable = true;
        nombre.focus();

        const guardar = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                nombre.contentEditable = false;
                nombre.removeEventListener('keydown', guardar);
            }
        };
        nombre.addEventListener('keydown', guardar);
    });
});

// Cambiar imagen
document.querySelectorAll('.btn-cambiar-img').forEach(boton => {
    boton.addEventListener('click', () => {
        const producto = boton.closest('.producto');
        const img = producto.querySelector('img');
        const inputFile = producto.querySelector('.input-img');

        // Abrir el explorador de archivos
        inputFile.click();

        // Cuando seleccionen un archivo
        inputFile.onchange = () => {
            const file = inputFile.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    img.src = e.target.result; // Cambia la imagen en la página
                };
                reader.readAsDataURL(file);
            }
        };
    });
});