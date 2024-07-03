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

        xhr.open('POST', backendUrl + '/auth/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.auth && response.token) {
                    // Guardar el token JWT en localStorage
                    localStorage.setItem('token', response.token);
                    mensaje.textContent = 'Inicio de sesión exitoso';
                    // Redirigir al usuario a la página de administración
                    window.location.href = 'admin.html';
                } else {
                    mensaje.textContent = response.error || 'Error al iniciar sesión';
                }
            } else {
                mensaje.textContent = 'Error en la solicitud al servidor';
            }
        };

        xhr.onerror = function() {
            mensaje.textContent = 'Error de red al intentar iniciar sesión';
        };
        console.log(nombre);
        console.log(password);
        const data = JSON.stringify({ nombre: nombre, password: password });
        xhr.send(data);
    });
});

