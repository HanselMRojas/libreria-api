# Libreria API.

## Puesta en marcha
Para correr el proyecto en desarrollo. **Tener en cuenta que se recomienda el uso de docker para manejar los entornos de desarrollo y producción.**

```bash
# Instalar dependencias
[path/to/libreria-api]$ npm i

# Levantar base de datos
[path/to/libreria-api]$ docker-compose up -d

# Poner en marcha
[path/to/libreria-api]$ npm run dev
```

Proyecto en producción, tener en cuenta que el registry de gitlab requiere que tenga una autorización previa mediante `access_token`.

```bash
# Instalar dependencias
[path/to/libreria-api]$ npm run build

# Levantar base de datos (Es necesario contar con acceso al registry de gitlab)
[path/to/libreria-api]$ npm run docker-bp
```

## Endpoints
Los endpoints que tiene este API a la fecha son se describen en la siguiente tabla. Adicionalmente sus respectivos middlewares.

* JWTMiddleware. Valida un token de sesión de usuario.
* AdminMiddleware. Valida que el usuario autenticado cuente con el rol de administrador.


| Modulo        | Ruta                             | Middleware | Método  | Descripción          |
|---------------|----------------------------------|------------|---------|----------------------|
| Autenticación | /v1/autenticacion/login          | --         | POST    | Autentica un usuario |
| Autenticación | /v1/autenticacion/registro       | --         | POST    | Registra un usuario  |
| Biblioteca    | /v1/biblioteca/libros            | --         | GET     | Lista los libros disponibles |
| Biblioteca    | /v1/biblioteca/libros            | JWT, Admin | POST    | Crea un nuevo libro |
| Biblioteca    | /v1/biblioteca/libros/:libroId   | JWT, Admin | GET     | Detalla un libro    |
| Biblioteca    | /v1/biblioteca/libros/:libroId   | JWT, Admin | POST    | Edita un libro      |
| Biblioteca    | /v1/biblioteca/libros/:libroId   | JWT, Admin | DELETE  | Borra un libro      |
| Biblioteca    | /v1/biblioteca/libros/:libroId/counters | JWT, Admin | POST  | Actualiza lines y reserva un libro |
| Biblioteca    | /v1/biblioteca/autores            | --         | GET     | Lista los autores disponibles |
| Biblioteca    | /v1/biblioteca/autores            | JWT, Admin | POST    | Crea un nuevo autor |
| Biblioteca    | /v1/biblioteca/autores/:autorId   | JWT, Admin | GET     | Detalla un autor    |
| Biblioteca    | /v1/biblioteca/autores/:autorId   | JWT, Admin | POST    | Edita un autor      |
| Biblioteca    | /v1/biblioteca/autores/:autorId   | JWT, Admin | DELETE  | Borra un autor      |

## Notas
Tener en cuenta que todas las rutas que sea GET con tipo de accion listar todos los elementos de una entidad. Cuentan con los siguientes `query_parameters`:

* **q**: Búsqueda basada en keywords y expresiones regulares, ej: 
* **sort**: Organizar la lista teniendo en cuenta algun campo del modelo de la entidad, ej: `?sort=nombre` o `?sort=-nombre`.
* **limit**: Determinar limite de documentos por página en que query. Ej: `?limit=99`. Debe estar entre un lìmite de 1 y 99. Por defecto es 30.
* **page**: Página actual del cursor en query. Este toma en cuenta el límite por página establecido y el total de registro, ej: `?page=1`
* **select**: Selecciona los campos indicados del modelo de una entidad. Puede ser una lista separada por comma, ej: `?select=titulo,subtitulo,autores`

