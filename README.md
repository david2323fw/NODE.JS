#Proyecto Backend - API de Usuarios y Productos
#Este proyecto es una API RESTful desarrollada con Node.js, Express y MongoDB. Permite gestionar usuarios (registro, inicio de sesión) y productos (CRUD: agregar, modificar, eliminar, obtener productos). Además, la API está protegida mediante autenticación con JWT (JSON Web Token) y roles de usuario (admin/usuario).

Dependencias
Este proyecto requiere las siguientes dependencias:

express: Framework de Node.js para construir la API.
mongoose: ODM (Object Data Modeling) para interactuar con MongoDB.
bcryptjs: Biblioteca para encriptar y comparar contraseñas.
jsonwebtoken: Biblioteca para generar y verificar JWTs.
dotenv: Permite cargar variables de entorno desde un archivo .env.
cors: Middleware para habilitar CORS y permitir la comunicación con el frontend.
Instalación
1. Clona este repositorio
bash
Copiar código
git clone <URL_DEL_REPOSITORIO>
cd <nombre_del_directorio>
2. Instala las dependencias
Asegúrate de tener Node.js y npm instalados. Si no los tienes, instálalos desde aquí.

bash
Copiar código
npm install
3. Crea el archivo .env
En la raíz del proyecto, crea un archivo .env y agrega las siguientes variables de entorno:

makefile
Copiar código
PORT=3006
MONGODB_URI=mongodb://localhost:27017/bd_proyecto
JWT_SECRET=mi-clave-secreta

4. Inicia el servidor
bash
Copiar código
npm start
El servidor se ejecutará en el puerto definido en .env (por defecto es el puerto 3000).

Rutas disponibles
Usuarios
POST /users/register: Registra un nuevo usuario.

Body:
json
Copiar código
{
  "nombre": "Juan",
  "email": "juan@example.com",
  "password": "password123",
  "rol": "usuario"
}
POST /users/login: Inicia sesión y devuelve un token JWT.

Body:
json
Copiar código
{
  "email": "juan@example.com",
  "password": "password123"
}
Productos
GET /productos: Obtiene todos los productos (puede filtrar por categoría).

Query: ?categoria=<nombre_de_categoria>
POST /productos: Agrega un nuevo producto (requiere autenticación de administrador).

Body:
json
Copiar código
{
  "nombre": "Producto 1",
  "categoria": "Electrónica",
  "precio": 100,
  "stock": 50
}
PUT /productos/:id: Modifica un producto por su ID (requiere autenticación de administrador).

Body:
json
Copiar código
{
  "nombre": "Producto actualizado",
  "categoria": "Electrónica",
  "precio": 120,
  "stock": 40
}
DELETE /productos/:id: Elimina un producto por su ID (requiere autenticación de administrador).

Autenticación
Para acceder a las rutas de productos, se requiere autenticación JWT. Asegúrate de enviar el token JWT en el encabezado Authorization de tus solicitudes, en formato Bearer <token>.
Estructura del proyecto


/config
  db.js         - Configuración de la base de datos
/controllers
  userController.js - Lógica para manejar usuarios
  productController.js - Lógica para manejar productos
/middlewares
  authMiddleware.js - Middleware para autenticación y verificación de roles
/models
  User.js        - Modelo de datos para los usuarios
  Product.js     - Modelo de datos para los productos
/routes
  userRoutes.js  - Rutas para usuarios
  productRoutes.js - Rutas para productos
/app.js          - Configuración principal de la aplicación
