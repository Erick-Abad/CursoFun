document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('register-email').value.trim().toLowerCase();
      const password = document.getElementById('register-password').value.trim();
      const confirmPassword = document.getElementById('confirm-password').value.trim();

      if (!name || !email || !password || !confirmPassword) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(data.message);
          window.location.href = '/';
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema con el registro.');
      }
    });
  }
});
