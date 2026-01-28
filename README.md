# Prueba Técnica - Desarrollador Junior 
#Autor : Diana Gomez
##  Descripción

Aplicación web básica que implementa un CRUD de Usuarios y Pedidos, con un backend en Node.js y un frontend en HTML, CSS y JavaScript.

---------Tecnologías y Herramientas---------
Backend: Node.js, Express.js.

Frontend: HTML5, CSS3 
Herramientas: Git, GitHub y Postman para pruebas de endpoints.

----Estructura del Repositorio----
Tal como se muestra en el  repositorio https://github.com/diana-gomez1/prueba_tecnica_juniorFullstack.git

backend/: Contiene la lógica del servidor, rutas y controladores.

frontend/: Contiene la interfaz de usuario (HTML, CSS y JS).

.gitignore: Configurado para excluir node_modules.
-----Instrucciones de Ejecución---
1. Servidor (Backend)
Desde la terminal, accede a la carpeta y levanta el servicio:

Bash
cd backend
node index.js
El servidor se iniciará en http://localhost:3000.

2. Interfaz (Frontend)
Simplemente abre el archivo frontend/index.html en tu navegador.

----Pruebas Realizadas---
Se valida la API utilizando Postman, asegurando que cada endpoint responda correctamente. Durante la ejecución, el servidor registra las siguientes operaciones:

> node index.js
Servidor corriendo en puerto 3000
POST /api/users    -> Usuario creado
GET /api/users     -> Listado obtenido
PUT /api/users/1   -> Usuario actualizado
DELETE /api/users/1 -> Usuario eliminado

POST /api/orders   -> Pedido registrado con éxito
GET /api/orders?id_usuario=1   -> Listado de pedidos
PUT /api/orders/1   -> Pedidos actualizados
DELETE /api/orders/1 -> Pedidos eliminados

Validaciones: Comprobación de formato de email y validación de existencia de usuarios antes de crear pedidos.

Control de Versiones: Historial de commits claro que refleja el progreso del desarrollo.
