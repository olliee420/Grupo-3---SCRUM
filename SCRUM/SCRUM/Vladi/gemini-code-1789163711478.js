document.getElementById('formAuth').addEventListener('submit', async function(e) {
    e.preventDefault(); // Evita que la página se recargue

    const form = e.target;
    const correo = document.getElementById('correo').value.trim();
    const contrasenia = document.getElementById('contrasenia').value.trim();
    const mensajeError = document.getElementById('mensajeError');

    // Validación de campos obligatorios (frontend)
    if (!form.checkValidity()) {
        mensajeError.innerText = "Por favor, completa todos los campos obligatorios.";
        mensajeError.style.display = 'block';
        return;
    }

    mensajeError.style.display = 'none'; // Ocultar errores previos

    try {
        // Petición POST al backend en C#
        const response = await fetch('https://localhost:5001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Correo: correo, Contrasenia: contrasenia })
        });

        if (!response.ok) {
            throw new Error("Credenciales inválidas");
        }

        const usuario = await response.json();

        // Redirección según el rol de la base de datos
        if (usuario.rol === 'Estudiante') {
            window.location.href = '/menu.html';
        } else if (usuario.rol === 'Personal Cafeteria') {
            window.location.href = '/pedidos-activos.html';
        } else if (usuario.rol === 'Administrador') {
            window.location.href = '/panel-admin.html';
        }

    } catch (error) {
        mensajeError.innerText = "Correo o contraseña incorrectos.";
        mensajeError.style.display = 'block';
    }
});