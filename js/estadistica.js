//Obtener solo los últimos 4 días para la gráfica
const labelsUltimos2 = labelesDia.slice(-4);
const datosUltimos2 = datosDia.slice(-4);

//Obtener el canvas donde se mostrará la gráfica
const grafica1 = document.getElementById("ventasXDia");

//Crear gráfica de ventas por día
new Chart(grafica1, {
    type: 'bar',
    data: {
        labels: labelsUltimos2,
        datasets: [{
            label: 'Numero de ventas',
            data: datosUltimos2,
            borderWidth: 1,
            borderRadius: 8,
            backgroundColor: '#d90089',
            barPercentage: 1,
            categoryPercentage: 0.7
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 20 }
            }
        }
    }
});

//Obtener el valor de ventas del último día
const ventasHoy = datosUltimos2.at(-1);

//Arreglo con los nombres de los meses
const nombresMeses = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];

//Variable para guardar la gráfica actual
let grafica2 = null;

//Función para cargar la gráfica según el mes y año
function cargarGrafica(mes, anio) {
    
    //Hacer petición al controlador
    fetch(`index.php?action=mostrarEstadisticas&mes=${mes}&anio=${anio}`, {
        //Indicar que es una petición AJAX
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })

    //Convertir respuesta a JSON
    .then(res => res.text())
    .then(data => {
        console.log(data);
    })

    //Trabajar los datos recibidos
    .then(datos => {

        // Obtener solo los 2 productos más vendidos
        const labels = datos
            .slice(0, 5)
            .map(item => item.nombre_producto);

        const valores = datos
            .slice(0, 5)
            .map(item => parseInt(item.total_vendidos));

        // Actualizar el título del mes
        document.getElementById('tituloMes').textContent = `${nombresMeses[mes-1]} ${anio}`;

        // Eliminar gráfica anterior
        if (grafica2) grafica2.destroy();

        // Obtener canvas de la gráfica
        const ctx = document.getElementById("ventaXProd");

        // Crear nueva gráfica
        grafica2 = new Chart(ctx, {

            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Número de ventas',
                    data: valores,
                    borderWidth: 1,
                    borderRadius: 8,
                    backgroundColor: '#d90089',
                    barPercentage: 1,
                    categoryPercentage: 0.7
                }]
            },

            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 20 }
                    }
                }
            }
        });
    });
}

// Botón para ir al mes anterior
document.getElementById('btnPrev').addEventListener('click', () => {

    if (mesActual == 1) {
        mesActual = 12;
        anioActual--;

    } else {
        mesActual--;
    }
    cargarGrafica(mesActual, anioActual);
});


// Botón para ir al siguiente mes
document.getElementById('btnNext').addEventListener('click', () => {

    if (mesActual == 12) {
        mesActual = 1;
        anioActual++;

    } else {
        mesActual++;
    }
    cargarGrafica(mesActual, anioActual);
});


// Cargar gráfica inicial al abrir la página
document.addEventListener(
    'DOMContentLoaded',
    () => cargarGrafica(mesActual, anioActual)
);
