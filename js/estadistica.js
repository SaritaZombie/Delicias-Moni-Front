const grafica1 = document.getElementById("ventasXDia");
const datosDia = [38,42,45,41,50,55,49,40];

//Ventas Por Dia
new Chart(grafica1,
    {
        type: 'bar',
        data:{
            labels:[
                '15/03/2026',
                '16/03/2026',
                '17/03/2026',
                '18/03/2026',
                '19/03/2026',
                '20/03/2026',
                '21/03/2026',
                '22/03/2026'],
            
            datasets: [{
                label: 'Numero de ventas',
                data: datosDia,
                borderWith:1,
                borderRadius:8,
                backgroundColor: '#d90089',
                barPercentage: 1,
                categoryPercentage: 0.7
                
            }]
        },
        options: {
            scales: {
                y: {
                beginAtZero: true,
                ticks: { stepSize: 20}
            }
        }
        }

    }
);

//Toma el ultimo valor de la grafica (Simulando de que siempre tomara el valor de hoy)
const ventasHoy = datosDia.at(-1);

document.getElementById("ventasHoy").textContent = `Ventas: ${ventasHoy}`;

//Ventas por Prodcuto
const grafica2 = document.getElementById("ventaXProd");
const datosProd = [58,36,30,24];

new Chart(grafica2,
    {
        type: 'bar',
        data:{
            labels:[
                'Postres 3 Leches',
                'Fresas Con Crema',
                'Deditos',
                'Pudines'
                ],
            
            datasets: [{
                label: 'Numero de ventas',
                data: datosProd,
                borderWith:1,
                borderRadius:8,
                backgroundColor: '#d90089',
                barPercentage: 1,
                categoryPercentage: 0.7
                
            }]
        },
        options: {
            scales: {
                y: {
                beginAtZero: true,
                ticks: { stepSize: 20}
            }
        }
        }

    }
);




