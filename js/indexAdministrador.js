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
        const producto = boton.closest('form');
        const inputFile = producto.querySelector('.input-img');

        inputFile.click();
    });
});

document.querySelectorAll('.input-img').forEach(inputFile => {
    inputFile.addEventListener('change', function () {

        if (this.files.length === 0) return;

        const form = this.closest('form');
        const img = form.parentElement.querySelector('img');

        const file = this.files[0];

        // preview
        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // 🔥 ENVÍA EL FORM
        form.submit();
    });
});
