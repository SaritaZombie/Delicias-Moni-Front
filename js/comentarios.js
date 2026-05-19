document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('editarComentario');
    if (!form) return;

    const ratingInputs = document.querySelectorAll('input[name="id_calificacion"]');
    const ratingLabel = document.getElementById('ratingLabel');
    const textos = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', '¡Excelente!'];

    ratingInputs.forEach(input => {
        input.addEventListener('change', function() {
            ratingLabel.textContent = textos[this.value];
        });
    });

    form.addEventListener('submit', function(e) {
        const rating = document.querySelector('input[name="id_calificacion"]:checked');
        const titulo = document.getElementById('titulo').value.trim();
        const comentario = document.getElementById('descripcion').value.trim();

        if (!rating) { e.preventDefault(); alert('Selecciona una calificación.'); return; }
        if (!titulo) { e.preventDefault(); alert('Ingresa un título.'); return; }
        if (!comentario) { e.preventDefault(); alert('Escribe un comentario.'); return; }
    });

    const btnDejarComentario = document.getElementById('dejarComentario');
    if (btnDejarComentario) {
        btnDejarComentario.addEventListener('click', function(e) {
            e.preventDefault();
            if (form.style.display === 'flex') {
                form.style.cssText = 'display: none !important';
                this.textContent = 'Dejar un Comentario';
            } else {
                form.style.cssText = 'display: flex !important; flex-direction: column;';
                this.textContent = 'Cancelar';
            }
        });
    }
});