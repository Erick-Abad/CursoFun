document.addEventListener('DOMContentLoaded', function () {
  // Toggle para mostrar/ocultar la contraseña
  const togglePassword = document.getElementById('togglePassword');
  if (togglePassword) {
    const passwordField = document.getElementById('password');
    togglePassword.addEventListener('click', function () {
      // Cambia el tipo de input entre "password" y "text"
      const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordField.setAttribute('type', type);

      // Cambia el texto del botón "Mostrar" o "Ocultar"
      togglePassword.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
    });
  }

  // Manejo del formulario de inicio de sesión
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const email = document.getElementById('email').value.trim().toLowerCase();
      const password = document.getElementById('password').value.trim();

      if (!email || !password) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Guarda el nombre y correo en localStorage
          localStorage.setItem('userName', data.name);
          localStorage.setItem('userEmail', data.email);

          // Redirigir a la página del curso
          window.location.href = 'Curso.html';
        } else {
          alert(data.message); // Mostrar mensaje de error
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al iniciar sesión. Inténtalo de nuevo más tarde.');
      }
    });
  }
});
