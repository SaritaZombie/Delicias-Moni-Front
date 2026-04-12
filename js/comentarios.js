//LocalStogare
const contenedor = document.querySelector('.comentarios')
const STORAGE_KEY = 'resenas_'+contenedor.dataset.producto;

//------- Utilidades -----------

//Esta funcion se encarga de abrir y guardar todos los comentarios
function getComentarios(){
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function guardarComentarios(lista){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

// Funcion del tiempo
function tiempoRelativo(timestamp){
    const diff = Date.now() - timestamp;
    const min = Math.floor(diff / 60000);
    const hrs = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);

    if (min < 1) return 'Justo ahora';
    if (min < 60) return `Hace ${min} min`;
    if (hrs < 24) return `Hace ${hrs} h`;
    if (dias == 1) return `Hace 1 día`;
    return `Hace ${dias} días`;

}

function generarEstrellas(n) {
    return Array.from({ length:5 }, (_,i) =>
    `<i class="bi bi-star-fill${i < n ? '' : ' i-gris'}"></i>`
    ).join('');
}

function inicialAvatar(nombre){
    return nombre.trim().charAt(0).toUpperCase();
}


// ---------- Seguridad ----------
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


//------- Render de los comentarios -----------

function renderComentarios(lista) {
  const contenedor = document.getElementById('listaComentarios');
  if (!contenedor) return;
 
  if (lista.length === 0) {
    contenedor.innerHTML = `
      <p class="text-muted text-center mt-3">
        Sé el primero en dejar una reseña 🌟
      </p>`;
    return;
  }
 
  contenedor.innerHTML = lista.map(c => `
    <div class="col-12 comentario-card" data-id="${c.id}">
      <div class="comentario-header">
        <div class="comentario-avatar">${inicialAvatar(c.nombre)}</div>
        <div>
          <strong>${escapeHTML(c.nombre)}</strong>
          <div class="comentario-estrellas">${generarEstrellas(c.rating)}</div>
          ${c.titulo ? `<small class="comentario-titulo">${escapeHTML(c.titulo)}</small>` : ''}
        </div>
        <span class="comentario-fecha">${tiempoRelativo(c.timestamp)}</span>
      </div>
      <p class="comentario-texto">${escapeHTML(c.descripcion)}</p>
    </div>
  `).join('');
}

//Funcion del promedio de valoraciones 
function actualizarResumen() {
  const lista = getComentarios();
  const total = lista.length;
  const promedio = total
    ? (lista.reduce((s, c) =>
        s + c.rating, 0) / total).toFixed(1)
    : '0.0';
 
  const elTotal = document.querySelector('.comentarios h4');
  const elProm  = document.querySelector('.valPromedio label');
  if (elTotal) elTotal.textContent = `(${total} comentario${total !== 1 ? 's' : ''})`;
  if (elProm)  elProm.textContent  = promedio;
}

//------- Filtros (Botones) -----------

let filtroActivo = 'populares';

function aplicarFiltro(lista) {
    switch (filtroActivo){
        case 'recientes': // el ...lista es una copia de la lista original
            return [...lista].sort((a, b) => b.timestamp - a.timestamp);
        case 'populares':
            return [...lista].sort((a, b) => b.rating - a.rating);
        case 'todas':
        default: //Por defecto que muestre todos
            return lista;
    }

}

function refrescarVista(){
    const lista = getComentarios();
    renderComentarios(aplicarFiltro(lista));
    actualizarResumen();
}

// ---------- Formulario ----------
 
function limpiarFormulario() {
  document.querySelectorAll('input[name="rating"]').forEach(r => r.checked = false);
  document.getElementById('titulo').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('nombreUsuario').value = '';
  document.getElementById('ratingLabel').textContent = 'Selecciona una calificación';
}
 
function validarFormulario() {
  const rating = document.querySelector('input[name="rating"]:checked');
  const nombre = document.getElementById('nombreUsuario').value.trim();
  const desc   = document.getElementById('descripcion').value.trim();
 
  if (!nombre) { mostrarError('Por favor ingresa tu nombre.'); return false; }
  if (!rating)  { mostrarError('Por favor selecciona una calificación.'); return false; }
  if (!desc)    { mostrarError('Por favor escribe una descripción.'); return false; }
  return true;
}
 
function mostrarError(msg) {
  let el = document.getElementById('formError');
  if (!el) {
    el = document.createElement('small');
    el.id = 'formError';
    el.style.cssText = 'color:#d4128c;display:block;margin-top:6px;font-weight:600;';
    document.getElementById('editarComentario').appendChild(el);
  }
  el.textContent = msg;
  setTimeout(() => { el.textContent = ''; }, 3000);
}
 
// ---------- Init ----------
 
document.addEventListener('DOMContentLoaded', () => {
 
  // --- Agregar campo "Nombre" dinámicamente si no existe ---
  const form = document.getElementById('editarComentario');
  if (form && !document.getElementById('nombreUsuario')) {
    const labelNombre = document.createElement('label');
    labelNombre.textContent = 'Tu nombre:';
    const inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.id = 'nombreUsuario';
    inputNombre.maxLength = 40;
    inputNombre.placeholder = 'Máximo 40 caracteres';
 
    // Insertar antes del label "Titulo:"
    const labelTitulo = form.querySelector('label[for="titulo"]') ||
      [...form.querySelectorAll('label')].find(l => l.textContent.includes('Titulo'));
 
    if (labelTitulo) {
      form.insertBefore(inputNombre, labelTitulo);
      form.insertBefore(labelNombre, inputNombre);
    } else {
      form.prepend(inputNombre);
      form.prepend(labelNombre);
    }
  }
 
  // Asegurarnos de que el textarea tiene id
  const textarea = form ? form.querySelector('textarea') : null;
  if (textarea && !textarea.id) textarea.id = 'descripcion';
 
  // --- Estrellas interactivas ---
  const starInputs = document.querySelectorAll('input[name="rating"]');
  const ratingLabel = document.getElementById('ratingLabel');
  const textos = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', '¡Excelente!'];
 
  starInputs.forEach(input => {
    input.addEventListener('change', () => {
      if (ratingLabel) ratingLabel.textContent = textos[input.value];
    });
  });
 
  // --- Envío del formulario ---
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validarFormulario()) return;
 
      const nuevo = {
        id: Date.now(),
        nombre: document.getElementById('nombreUsuario').value.trim(),
        rating: Number(document.querySelector('input[name="rating"]:checked').value),
        titulo: document.getElementById('titulo').value.trim(),
        descripcion: document.getElementById('descripcion').value.trim(),
        timestamp: Date.now(),
        likes: 0,
      };
 
      const lista = getComentarios();
      lista.push(nuevo);
      guardarComentarios(lista);
 
      limpiarFormulario();
      refrescarVista();
 
      // Scroll suave a la lista
      document.getElementById('listaComentarios')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
 
  // --- Filtros ---
  document.querySelectorAll('.btn-filtro').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      filtroActivo = btn.textContent.trim().toLowerCase();
      refrescarVista();
    });
  });
 
  // --- Render inicial ---
  refrescarVista();
});