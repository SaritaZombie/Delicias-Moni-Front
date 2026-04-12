// Parte del Contador de Cantidades
const inputNumero = document.getElementById("inputNumero");
const btnMas = document.getElementById("btnMas");
const btnMenos = document.getElementById("btnMenos");

let cantidad = 1;

inputNumero.value = cantidad;

inputNumero.addEventListener("keypress", (e) =>{
    if(e.key<"0" || e.key >"9"){
        e.preventDefault();
    }
})

btnMas.addEventListener("click", () =>{
    cantidad++;
    inputNumero.value = cantidad;
})

btnMenos.addEventListener("click", () =>{
    if(cantidad > 1){
        cantidad--;
        inputNumero.value = cantidad;
    }
})

// Zona de Comentarios

const formDejarReseña = document.getElementById("editarComentario");
const dejarComentario = document.getElementById("dejarComentario");

dejarComentario.addEventListener("click", ()=>{
    formDejarReseña.style.display="flex";
    dejarComentario.style.display="none";
})

const ratingLabel = document.getElementById("ratingLabel");
const labels = ["Muy mala", "Mala", "Regular", "Buena", "Excelente"];

document.querySelectorAll('#starGroup input').forEach(input => {
  input.addEventListener('change', () => {
    ratingLabel.textContent = labels[parseInt(input.value) - 1] + ` (${input.value}/5)`;
  });
});

