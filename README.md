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

1. Registro de Usuario (POST /users/register)
Descripción: Esta ruta permite registrar un nuevo usuario en el sistema. Los usuarios deben proporcionar su nombre, correo electrónico, contraseña y el rol que desean tener (por ejemplo, usuario o admin).

Método HTTP: POST

Ruta: /users/register

Cuerpo de la solicitud (Body): Aquí proporcionas la información del usuario en formato JSON.

json
Copiar código
{
  "nombre": "Juan",
  "email": "juan@example.com",
  "password": "password123",
  "rol": "usuario"
}
nombre: El nombre del usuario.
email: El correo electrónico único del usuario.
password: La contraseña que se utilizará para autenticar al usuario.
rol: El rol del usuario, puede ser usuario o admin. Los administradores tienen permisos especiales.
Respuesta esperada: Si el registro es exitoso, el servidor devolverá una respuesta que indica que el usuario fue creado correctamente. Si hay un error (por ejemplo, si el correo ya existe), se devolverá un mensaje de error.

2. Inicio de Sesión (POST /users/login)
Descripción: Esta ruta permite que los usuarios se autentiquen proporcionando su correo electrónico y contraseña. Si las credenciales son correctas, el servidor generará un token JWT que se utilizará para autenticar futuras solicitudes.

Método HTTP: POST

Ruta: /users/login

Cuerpo de la solicitud (Body): Aquí se proporcionan las credenciales del usuario para la autenticación.

json
Copiar código
{
  "email": "juan@example.com",
  "password": "password123"
}
email: El correo electrónico del usuario registrado.
password: La contraseña del usuario.
Respuesta esperada: Si las credenciales son correctas, se devolverá un token JWT. Este token debe ser utilizado en las solicitudes subsiguientes para acceder a las rutas protegidas.

Ejemplo de respuesta con token:

json
Copiar código
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjcwZ2FhZTJlMGVmMjAxYjQ5M2FkYzAiLCJyb2wiOiJ1c3VhcmlvIn0.ZYZ8VG6gyghdJ1LTVhBC9V-kAqERgT5PbwGcUNhE7MQ"
}
3. Gestión de Productos (Solo para Administradores)
Estas rutas son exclusivas para administradores y permiten agregar, modificar y eliminar productos.

Agregar un Producto (POST /productos)
Descripción: Permite agregar un nuevo producto al inventario del sistema. Esta ruta solo está disponible para administradores.

Método HTTP: POST

Ruta: /productos

Cuerpo de la solicitud (Body): Aquí debes proporcionar los detalles del producto que deseas agregar:

json
Copiar código
{
  "nombre": "Producto 1",
  "categoria": "Electrónica",
  "precio": 100,
  "stock": 50
}
nombre: Nombre del producto.
categoria: Categoría del producto (por ejemplo, Electrónica, Ropa).
precio: El precio del producto.
stock: La cantidad de unidades del producto en inventario.
Encabezado (Header):
El administrador debe proporcionar un token JWT en el encabezado de autorización para autenticar la solicitud:

json
Copiar código
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
Respuesta esperada: Si el producto se agrega correctamente, el servidor responderá con un mensaje de éxito y el producto agregado.

Modificar un Producto (PUT /productos/:id)
Descripción: Permite modificar los detalles de un producto existente utilizando su ID.

Método HTTP: PUT

Ruta: /productos/:id (Reemplaza :id con el ID del producto a modificar).

Cuerpo de la solicitud (Body): Debes enviar los detalles que deseas actualizar. Por ejemplo:

json
Copiar código
{
  "nombre": "Producto actualizado",
  "categoria": "Electrónica",
  "precio": 120,
  "stock": 40
}
nombre: Nuevo nombre del producto.
categoria: Nueva categoría.
precio: Nuevo precio.
stock: Nueva cantidad en inventario.
Encabezado (Header):
Como en la solicitud de agregar un producto, el administrador debe incluir su token JWT para poder modificar el producto.

Respuesta esperada: El servidor devolverá el producto actualizado si la modificación es exitosa.

Eliminar un Producto (DELETE /productos/:id)
Descripción: Permite eliminar un producto del inventario usando su ID.

Método HTTP: DELETE

Ruta: /productos/:id (Reemplaza :id con el ID del producto a eliminar).

Encabezado (Header):
El administrador debe proporcionar un token JWT.

Respuesta esperada: Si el producto se elimina correctamente, el servidor devolverá un mensaje de éxito.

4. Consulta de Productos (Accesible para Todos los Usuarios)
Estas rutas permiten consultar productos, y son accesibles tanto para usuarios normales como para administradores.

Consultar Todos los Productos (GET /productos)
Descripción: Devuelve todos los productos disponibles en el sistema.

Método HTTP: GET

Ruta: /productos

Encabezado (Header):
Si es necesario, puedes incluir el token JWT para autenticación. Sin embargo, generalmente esta ruta no requiere autenticación para usuarios normales.

Respuesta esperada: Una lista de productos en formato JSON, por ejemplo:

json
Copiar código
{
  "productos": [
    {
      "nombre": "Producto 1",
      "categoria": "Electrónica",
      "precio": 100,
      "stock": 50
    },
    {
      "nombre": "Producto 2",
      "categoria": "Ropa",
      "precio": 50,
      "stock": 100
    }
  ]
}
Consultar Productos por Categoría (GET /productos?categoria=<categoria>)
Descripción: Permite filtrar los productos según su categoría. Por ejemplo, puedes consultar todos los productos de la categoría Electrónica.

Método HTTP: GET

Ruta: /productos?categoria=Electrónica

Encabezado (Header):
Puedes enviar el token JWT si la autenticación es requerida, pero generalmente no se necesita para consultar productos.

Respuesta esperada: El servidor devolverá los productos que pertenecen a la categoría solicitada.

Ejemplo de respuesta:

json
Copiar código
{
  "productos": [
    {
      "nombre": "Laptop",
      "categoria": "Electrónica",
      "precio": 1500,
      "stock": 20
    }
  ]
}
Resumen de Rutas
Usuarios:

POST /users/register: Registrar un nuevo usuario.
POST /users/login: Iniciar sesión y obtener un token JWT.
Productos:

GET /productos: Obtener todos los productos.
GET /productos?categoria=<categoria>: Filtrar productos por categoría.
POST /productos: Agregar un producto (solo para administradores).
PUT /productos/:id: Modificar un producto (solo para administradores).
DELETE /productos/:id: Eliminar un producto (solo para administradores).


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
