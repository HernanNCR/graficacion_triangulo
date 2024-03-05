const filas = 10;
    const columnas = 10;

    // Crear un contenedor para los puntos y las líneas
    const contenedor = document.getElementById('contenedor');

    // Crear los puntos y añadirlos al contenedor
    for (let y = 0; y < filas; y++) {
        for (let x = 0; x < columnas; x++) {
            const punto = document.createElement('div');
            punto.classList.add('punto');
            punto.id = `punto_${x}_${y}`; // Asignar un identificador único con coordenadas (x, y)
            punto.dataset.x = x;
            punto.dataset.y = y;
            // punto.textContent = `(${x}, ${y})`; // Agregar las coordenadas como texto dentro del punto
            contenedor.appendChild(punto);
        }
        // Agregar un salto de línea para pasar a la siguiente fila
        contenedor.appendChild(document.createElement('br'));
    }

    // Función para cambiar el color de los puntos con las coordenadas ingresadas
    function agregarCoordenadas() {
        const x = parseInt(document.getElementById("id_x").value);
        const y = parseInt(document.getElementById("id_y").value);

        const x2 = parseInt(document.getElementById("id_x2").value);
        const y2 = parseInt(document.getElementById("id_y2").value);

        const x3 = parseInt(document.getElementById("id_x3").value);
        const y3 = parseInt(document.getElementById("id_y3").value);

        // Cambiar el color de los puntos
        cambiarColorPuntos(x, y);
        cambiarColorPuntos(x2, y2);
        cambiarColorPuntos(x3, y3);

        // Dibujar líneas entre los puntos
        dibujarLinea(x, y, x2, y2);
        dibujarLinea(x2, y2, x3, y3);
        dibujarLinea(x, y, x3, y3);

        // Actualizar la tabla de pendientes
        actualizarTabla(x, y, x2, y2);
        actualizarTabla(x2, y2, x3, y3);
        actualizarTabla(x, y, x3, y3);
    }

    // Función para cambiar el color de un punto con coordenadas (x, y)
    function cambiarColorPuntos(x, y) {
        const punto = document.getElementById(`punto_${x}_${y}`);
        if (punto) {
            punto.style.backgroundColor = 'red';
        }
    }

    // Función para dibujar una línea entre dos puntos con coordenadas (x1, y1) y (x2, y2)
    function dibujarLinea(x1, y1, x2, y2) {
        // Obtener las coordenadas exactas de los puntos
        const punto1 = document.getElementById(`punto_${x1}_${y1}`);
        const punto2 = document.getElementById(`punto_${x2}_${y2}`);

        // Calcular la posición de la línea en relación con el contenedor
        const contenedorRect = contenedor.getBoundingClientRect();
        const punto1Rect = punto1.getBoundingClientRect();
        const punto2Rect = punto2.getBoundingClientRect();

        // Calcular las coordenadas de inicio y fin de la línea
        const inicioX = punto1Rect.left - contenedorRect.left + punto1Rect.width / 2;
        const inicioY = punto1Rect.top - contenedorRect.top + punto1Rect.height / 2;
        const finX = punto2Rect.left - contenedorRect.left + punto2Rect.width / 2;
        const finY = punto2Rect.top - contenedorRect.top + punto2Rect.height / 2;

        // Calcular la longitud de la línea y el ángulo de rotación
        const dx = finX - inicioX;
        const dy = finY - inicioY;
        const longitud = Math.sqrt(dx * dx + dy * dy);
        const angulo = Math.atan2(dy, dx);

        // Crear la línea y establecer su posición y rotación
        const linea = document.createElement('div');
        linea.classList.add('linea');
        linea.style.width = `${longitud}px`;
        linea.style.transform = `rotate(${angulo}rad)`;
        linea.style.top = `${inicioY}px`;
        linea.style.left = `${inicioX}px`;
        contenedor.appendChild(linea);
    }

    // Función para calcular la pendiente entre dos puntos
    function calcularPendiente(x1, y1, x2, y2) {
        if (x1 === x2) {
            return Infinity; // Pendiente indefinida para líneas verticales
        } else {
            return (y2 - y1) / (x2 - x1);
        }
    }

    // Función para actualizar la tabla de pendientes
    function actualizarTabla(x1, y1, x2, y2) {
        const tabla = document.getElementById('tabla');
        const fila = document.createElement('tr');
        const punto1 = `(${x1}, ${y1})`;
        const punto2 = `(${x2}, ${y2})`;
        const pendiente = calcularPendiente(x1, y1, x2, y2);
        const pendienteTexto = isFinite(pendiente) ? pendiente.toFixed(2) : 'Infinito';
        fila.innerHTML = `<td>${punto1}</td><td>${punto2}</td><td>${pendienteTexto}</td>`;
        tabla.appendChild(fila);

        // Obtener los puntos en la trayectoria de la línea
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = x1 < x2 ? 1 : -1;
        const sy = y1 < y2 ? 1 : -1;
        let err = dx - dy;
        let x = x1;
        let y = y1;
        while (x !== x2 || y !== y2) {
            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x += sx;
            }
            if (e2 < dx) {
                err += dx;
                y += sy;
            }
            const pendientePunto = calcularPendiente(x1, y1, x, y);
            const pendientePuntoTexto = isFinite(pendientePunto) ? pendientePunto.toFixed(2) : 'Infinito';
            const filaPunto = document.createElement('tr');
            filaPunto.innerHTML = `<td>${punto1}</td><td>(${x}, ${y})</td><td>${pendientePuntoTexto}</td>`;
            tabla.appendChild(filaPunto);
        }
    }




// const filas = 11;
//     const columnas = 21;

//     // Crear un contenedor para los puntos y las líneas
//     const contenedor = document.getElementById('contenedor');

//     // Crear los puntos y añadirlos al contenedor
//     for (let y = 1; y < filas; y++) {
//         for (let x = 1; x < columnas; x++) {
//             const punto = document.createElement('div');
//             punto.classList.add('punto');
//             punto.id = `punto_${x}_${y}`; // Asignar un identificador único con coordenadas (x, y)
//             punto.dataset.x = x;
//             punto.dataset.y = y;
//             // punto.textContent = `(${x}, ${y})`; // Agregar las coordenadas como texto dentro del punto
//             contenedor.appendChild(punto);
//         }
//         // Agregar un salto de línea para pasar a la siguiente fila
//         contenedor.appendChild(document.createElement('br'));
//     }

//     // Función para cambiar el color de los puntos con las coordenadas ingresadas
//     function agregarCoordenadas() {
//         const x = parseInt(document.getElementById("id_x").value);
//         const y = parseInt(document.getElementById("id_y").value);

//         const x2 = parseInt(document.getElementById("id_x2").value);
//         const y2 = parseInt(document.getElementById("id_y2").value);

//         const x3 = parseInt(document.getElementById("id_x3").value);
//         const y3 = parseInt(document.getElementById("id_y3").value);

//         // Cambiar el color de los puntos
//         cambiarColorPuntos(x, y);
//         cambiarColorPuntos(x2, y2);
//         cambiarColorPuntos(x3, y3);

//         // Dibujar líneas entre los puntos
//         dibujarLinea(x, y, x2, y2);
//         dibujarLinea(x2, y2, x3, y3);
//         dibujarLinea(x, y, x3, y3);

//         // Actualizar la tabla de pendientes
//         actualizarTabla(x, y, x2, y2);
//         actualizarTabla(x2, y2, x3, y3);
//         actualizarTabla(x, y, x3, y3);
//     }

//     // Función para cambiar el color de un punto con coordenadas (x, y)
//     function cambiarColorPuntos(x, y) {
//         const punto = document.getElementById(`punto_${x}_${y}`);
//         if (punto) {
//             punto.style.backgroundColor = 'red';
//         }
//     }

//     // Función para dibujar una línea entre dos puntos con coordenadas (x1, y1) y (x2, y2)
//     function dibujarLinea(x1, y1, x2, y2) {
//         // Obtener las coordenadas exactas de los puntos
//         const punto1 = document.getElementById(`punto_${x1}_${y1}`);
//         const punto2 = document.getElementById(`punto_${x2}_${y2}`);

//         // Calcular la posición de la línea en relación con el contenedor
//         const contenedorRect = contenedor.getBoundingClientRect();
//         const punto1Rect = punto1.getBoundingClientRect();
//         const punto2Rect = punto2.getBoundingClientRect();

//         // Calcular las coordenadas de inicio y fin de la línea
//         const inicioX = punto1Rect.left - contenedorRect.left + punto1Rect.width / 2;
//         const inicioY = punto1Rect.top - contenedorRect.top + punto1Rect.height / 2;
//         const finX = punto2Rect.left - contenedorRect.left + punto2Rect.width / 2;
//         const finY = punto2Rect.top - contenedorRect.top + punto2Rect.height / 2;

//         // Calcular la longitud de la línea y el ángulo de rotación
//         const dx = finX - inicioX;
//         const dy = finY - inicioY;
//         const longitud = Math.sqrt(dx * dx + dy * dy);
//         const angulo = Math.atan2(dy, dx);

//         // Crear la línea y establecer su posición y rotación
//         const linea = document.createElement('div');
//         linea.classList.add('linea');
//         linea.style.width = `${longitud}px`;
//         linea.style.transform = `rotate(${angulo}rad)`;
//         linea.style.top = `${inicioY}px`;
//         linea.style.left = `${inicioX}px`;
//         contenedor.appendChild(linea);
//     }

//     // Función para calcular la pendiente entre dos puntos
//     function calcularPendiente(x1, y1, x2, y2) {
//         if (x1 === x2) {
//             return Infinity; // Pendiente indefinida para líneas verticales
//         } else {
//             return (y2 - y1) / (x2 - x1);
//         }
//     }

//     // Función para actualizar la tabla de pendientes
//     function actualizarTabla(x1, y1, x2, y2) {
//         const tabla = document.getElementById('tabla');
//         const fila = document.createElement('tr');
//         const punto1 = `(${x1}, ${y1})`;
//         const punto2 = `(${x2}, ${y2})`;
//         const pendiente = calcularPendiente(x1, y1, x2, y2);
//         const pendienteTexto = isFinite(pendiente) ? pendiente.toFixed(2) : 'Infinito';
//         fila.innerHTML = `<td>${punto1}</td><td>${punto2}</td><td>${pendienteTexto}</td>`;
//         tabla.appendChild(fila);
//     }