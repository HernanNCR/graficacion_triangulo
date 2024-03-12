const filas = 50;
const columnas = 1000;


const contenedor = document.getElementById('contenedor');
for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
        const punto = document.createElement('div');
        punto.classList.add('punto');
        punto.id = `punto_${x}_${y}`; 
        punto.dataset.x = x;
        punto.dataset.y = y;
        contenedor.appendChild(punto);
    }
    // contenedor.appendChild(document.createElement('br'));
}