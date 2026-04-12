document.querySelectorAll('.btn-cambiar-nombre').forEach(boton => {
    boton.addEventListener('click', () => {
        // Buscar <p> dentro del mismo .producto
        const nombre = boton.closest('.producto').querySelector('.Nosostros-nombre');

        // Hacer editable
        nombre.contentEditable = true;
        nombre.focus();

        // Guardar al presionar Enter
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