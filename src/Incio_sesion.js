document.addEventListener('DOMContentLoaded', function () {
  const togglePassword = document.getElementById('togglePassword');
  if (togglePassword) {
    const passwordField = document.getElementById('password');
    togglePassword.addEventListener('click', function () {
      const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordField.setAttribute('type', type);
      togglePassword.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const email = document.getElementById('email').value.trim().toLowerCase(); // Normalización
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
          alert(data.message);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al iniciar sesión. Inténtalo de nuevo más tarde.');
      }
    });
  }
});