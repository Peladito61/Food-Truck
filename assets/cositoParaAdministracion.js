document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const mensaje = document.getElementById('mensaje');

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        const nombre = document.getElementById('nombre').value;
        const password = document.getElementById('password').value;

        // Realizar solicitud AJAX
        const xhr = new XMLHttpRequest();

        // URL del backend en Vercel
        const backendUrl = 'https://foodies-backend-three.vercel.app'; // Reemplaza con tu URL real de Vercel

        xhr.open('POST', backendUrl + '/usuarios/validarInicioSesion', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            const response = JSON.parse(xhr.responseText);
            if (xhr.status === 200 && response.authenticated) {
                mensaje.textContent = 'Inicio de sesión exitoso';
                window.location.href = 'https://foodies-backend-three.vercel.app/api/datos'; // Redirige a la página seleccionada
            } else {
                mensaje.textContent = response.error || 'Error al iniciar sesión';
            }
        };

        xhr.onerror = function() {
            mensaje.textContent = 'Error de red al intentar iniciar sesión';
        };

        const data = JSON.stringify({ nombre: nombre, password: password });
        xhr.send(data);
    });
});

