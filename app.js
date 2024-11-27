const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware para procesar datos JSON
app.use(bodyParser.json());

// Configuración de CORS
app.use(cors());

// Archivo para almacenar los usuarios
const usersFile = path.join(__dirname, 'users.json');
let users = [];

// Leer usuarios desde el archivo al iniciar el servidor
if (fs.existsSync(usersFile)) {
  users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  console.log('Usuarios cargados desde el archivo:', users);
} else {
  console.log('Archivo users.json no encontrado. Se creará automáticamente.');
}

// Ruta para manejar el registro de usuarios
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
  }

  if (users.some(user => user.email === email.toLowerCase())) {
    return res.status(400).json({ message: 'Usted ya se encuentra registrado.' });
  }

  const newUser = { name, email: email.toLowerCase(), password };
  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  console.log('Nuevo usuario registrado:', newUser);

  res.status(200).json({ message: 'Registro Exitoso.' });
});

// Ruta para manejar el inicio de sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, ingrese su correo y contraseña.' });
  }

  const user = users.find(user => user.email === email.toLowerCase());

  if (!user) {
    return res.status(404).json({ message: 'El correo no está registrado.' });
  } else if (user.password !== password) {
    return res.status(401).json({ message: 'La contraseña es incorrecta.' });
  }

  res.status(200).json({ message: `Gracias por ingresar, ${user.name}.` });
});

// Rutas estáticas y archivos HTML
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'register.html')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// Verificar archivo de usuarios
app.get('/api/check-users', (req, res) => {
  if (fs.existsSync(usersFile)) {
    res.status(200).json({ message: 'El archivo users.json existe.' });
  } else {
    res.status(404).json({ message: 'El archivo users.json no existe.' });
  }
});

// Ruta para manejar errores en producción
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
