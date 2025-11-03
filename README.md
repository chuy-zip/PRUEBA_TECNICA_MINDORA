# PRUEBA_TECNICA_MINDORA

### Hecho Por Ricardo Andrés Chuy Morales

### Demostración de funcionamiento: [aquí](https://youtu.be/BqOu_YwB8jA)

Este repo es una prueba técnica donde el objetivo es realiar el backend para una aplicación de tipo TODO-LIST simple. Para esta prueba, no se toma en consideración cosas como autenticación, roles o usuarios, por lo que el modelo es bastante simple. Para realizar el backend lo que hice fue crear una base de datos en Mongo Cloud. Ya que uno de los requisitos mencionados en el pdf fue que fuera sencillo de probar el proyecto decidí usar el enfoque de cloud en lugar de un contenedor con Docker. Además de eso, para simplificar aún más la demostración del sistema de backend realizado he realizado un deploy de la API en vercel. Vercel es también una tecnología cloud que facilita la construcción y deploy de proyectos, que se vincula de forma práctica con git.

El proyecto ahora mismo funciona de forma automática y al momento de realizar un commit se intenta realizar un deploy a mi cuenta de vercel. Entonces, este proyecto de backend se puede probar tanto de forma local o bien visitando el deploy de la API [aquí](https://prueba-tecnica-mindora.vercel.app) y utilizando las rutas que se especifican luego en este mismo README. Esto es posible porque realicé la configuración necesaria de variables de entorno en vercel y la vinculación con el repositorio de github.  Ahora bien, soy consciente que en un ambiente laboral, no es seguro tener un deploy que tenga la capacidad de modifcar la base de datos, pero mi objetivo principal fue hacerlo de esta manera para simplificar la demostración del funcionamiento.

## Estructura del backend
La siguiente estructura es de la carpeta `Api`:

```
C:.
│   index.js
│
├───controllers
│       taskController.js
│
├───middleware
│       errorHandler.js
│
├───models
│       Task.js
│
├───routes
│       index.js
│       taskRoutes.js
│
└───utils
        mongoClient.js
```

Este proyecto sigue una arquitectura MVC (Model-View-Controller) modular diseñada específicamente para aplicaciones Express.js con MongoDB, optimizada para despliegue en Vercel. La estructura separa claramente las responsabilidades en diferentes capas: los Models `/models` se encargan de la interacción directa con la base de datos y la lógica de datos; los Controllers `/controllers` contienen la lógica de negocio y manejan las requests/responses HTTP; las Routes `/routes `definen los endpoints disponibles y enrutan las peticiones a sus controladores correspondientes; el Middleware `/middleware` centraliza el manejo de errores y funciones transversales; y los Utils `/utils` proporcionan utilidades reutilizables como la conexión a MongoDB con connection pooling. Me gusta maner este tipo de estructuras porque generalmente ayuda con la escalabilidad del código y a separar las responsabilidades en partes. También facilita las pruebas unitarias,debugging y para agregar nuevas funcionalidades. Aunque parezca demasiados archivos para la solución que se pide, siempre es bueno tener en cuenta la escalabilidad y crecimiento de un proyecto en mente. 

## Stack de tecnologías:
* JavaScript
* Express
* MongoDB
* Vercel

# Documentación API - Sistema de Tareas (Todo List)

- **URL Base para prueba local**: `http://localhost:3000/api`
- **URL Base para prueba en deploy**: `https://prueba-tecnica-mindora.vercel.app/api`
- **Formato**: JSON
- **Autenticación**: No requerida

> **Nota**: Los archivos para pruebas de postman también se encuentran en el repositorio para hacer las pruebas. La siguiente documentación ayuda a dar una introducción a la solución propuesta.

## Estructura propuesta para el archivo que representa a una tarea "Task":

```json
{
  "_id": ObjectId,
  "titulo": string,
  "descripcion": string,
  "prioridad": number (1-10),
  "fechaVencimiento": Date,
  "etiquetas": string[],
  "completada": boolean,
  "creadoEn": Date,
  "actualizadoEn": Date,
  "completadaEn": Date | null
}
```

* **_id**: Identificador único de MongoDB para operaciones CRUD.
* **titulo**: Campo obligatorio que define la esencia de la tarea.
* **descripcion**: Contexto opcional para detalles adicionales.
* **prioridad** (1-10): Escala numérica para clasificar urgencia e importancia.
* **fechaVencimiento**: Fecha límite opcional para gestión de tiempos.
* **etiquetas**: Array flexible para categorización y filtrado múltiple.
* **completada**: Booleano esencial para el estado básico de la tarea.
* **creadoEn**: Timestamp automático para auditoría y ordenamiento.
* **actualizadoEn**: Timestamp que rastrea la última modificación.
* **completadaEn**: Timestamp opcional que registra cuándo se finalizó la tarea.

## Prueba rápida
He realizado un front end, hosteado también con vercel, para hacer pruebas con una GUI hecha con react y NextJS. Es un ejemplo donde principalmente se pueden corroborar los GET (traer y filtrar las tasks), POST (crear un task), UPDATE (markar como completado) y DELETE (borrar un task). Esta interfaz fue algo extra para corroborar el funcionamiento y puede ser accedido desde internet. Esta UI usa la API deployeada en vercel. Los enlaces son:
* Enlace al repo: https://github.com/chuy-zip/demo-mindora
* Enlace a la página: https://demo-mindora.vercel.app/


## Pasos de Instalación y Prueba
Es necesario contar con node y npm para poder realizar la descarga y prueba local del proyecto. Si no se cuenta con eso, también se puede probar con el deploy y e importando el json de prueba de postman. Hay un json para pruebas locales y otro para las pruebas con el deplooy.

### 1. Instalación

```bash
# Clonar el proyecto 
git clone https://github.com/chuy-zip/PRUEBA_TECNICA_MINDORA
cd PRUEBA_TECNICA_MINDORA

# Instalar dependencias
npm install
```

### 2. Configuración

* Modificar el archivo .env.example y colocar las credenciales (El .env/credenciales se enviarán junto con el correo de entrega por motivos de seguridad)
* Verificar que el package.json contenga el script para correr el programa:

```json
"scripts": {
    "start": "node api/index.js"
}
```
### 3: Ejecución

``` bash
npm start
```

### 4: Pruebas
* Abrir: http://localhost:3000/api/tasks
* Probar endpoints con Postman

# Endpoints de Tareas

### 1. Obtener todas las tareas
**GET** `/api/tasks`

Obtiene la lista completa de tareas.

#### __Response__
```json
{
  "status": "success",
  "data": [
    {
      "_id": "690001ce648e127ff06f4612",
      "titulo": "Comprar leche",
      "descripcion": "Comprar leche deslactosada",
      "prioridad": 3,
      "fechaVencimiento": "2024-12-31T15:00:00Z",
      "etiquetas": ["personal", "supermercado"],
      "completada": false,
      "creadoEn": "2024-10-26T10:15:00Z",
      "actualizadoEn": "2024-10-26T10:15:00Z",
      "completadaEn": null
    }
  ],
  "count": 1
}
```

---

### 2. Obtener tarea por ID
**GET** `/api/tasks/:id`

Obtiene una tarea específica por su ID.

#### __Parámetros__

| Parámetro | Tipo   | Descripción                      |
|-----------|--------|----------------------------------|
| id        | string | ID de la tarea (MongoDB ObjectId)|

#### _Ejemplo_
```
GET /api/tasks/690001ce648e127ff06f4612
```

#### __Response__
```json
{
  "status": "success",
  "data": {
    "_id": "690001ce648e127ff06f4612",
    "titulo": "Comprar leche",
    "descripcion": "Comprar leche deslactosada",
    "prioridad": 3,
    "completada": false,
    "creadoEn": "2024-10-26T10:15:00Z",
    "actualizadoEn": "2024-10-26T10:15:00Z",
    "completadaEn": null
  }
}
```

---

### 3. Obtener tareas por estado
**GET** `/api/tasks/estado/:status`

Filtra tareas por estado de completado.

#### _Parámetros_

| Parámetro | Tipo   | Valores aceptados        |
|-----------|--------|--------------------------|
| status    | string | completadas, incompletas |

#### _Ejemplos_
```
GET /api/tasks/estado/completadas
GET /api/tasks/estado/incompletas
```

#### _Response_
```json
{
  "status": "success",
  "data": [...],
  "count": 5,
  "estado": "completadas"
}
```

---

### 4. Crear nueva tarea
**POST** `/api/tasks`

Crea una nueva tarea en el sistema.

#### Body (JSON)
```json
{
  "titulo": "Reunión con equipo",
  "descripcion": "Preparar presentación para reunión semanal",
  "prioridad": 5,
  "fechaVencimiento": "2024-11-15T14:00:00Z",
  "etiquetas": ["trabajo", "reunión", "importante"]
}
```

#### _Parámetros_ del Body

| Campo            | Tipo   | Requerido | Validaciones           |
|------------------|--------|:-----------:|------------------------|
| titulo           | string | SI        | No vacío               |
| descripcion      | string | NO        | -                      |
| prioridad        | number | NO        | 1-10 (default: 5)      |
| fechaVencimiento | string | NO        | Formato ISO            |
| etiquetas        | array  | NO        | Array de strings       |

#### _Response_
```json
{
  "status": "success",
  "message": "Tarea creada exitosamente",
  "data": {
    "id": "690001ce648e127ff06f4612",
    "titulo": "Reunión con equipo",
    "descripcion": "Preparar presentación para reunión semanal",
    "prioridad": 5,
    "fechaVencimiento": "2024-11-15T14:00:00Z",
    "etiquetas": ["trabajo", "reunión", "importante"]
  }
}
```

---

### 5. Actualizar tarea
**PUT** `/api/tasks/:id`

Actualiza los campos de una tarea existente.

#### _Parámetros_

| Parámetro | Tipo   | Descripción              |
|-----------|--------|--------------------------|
| id        | string | ID de la tarea a actualizar |

#### _Body (JSON)_
```json
{
  "titulo": "Título actualizado",
  "prioridad": 8,
  "etiquetas": ["urgente", "trabajo"],
  "completada": false
}
```

> **Nota**: Solo incluir los campos que se desean actualizar

#### _Ejemplo_
```
PUT /api/tasks/690001ce648e127ff06f4612
```

#### _Response_
```json
{
  "status": "success",
  "message": "Tarea actualizada exitosamente"
}
```

---

### 6. Marcar tarea como completada
**PUT** `/api/tasks/:id/completar`

Marca una tarea específica como completada.

#### _Parámetros_

| Parámetro | Tipo   | Descripción              |
|-----------|--------|--------------------------|
| id        | string | ID de la tarea a completar |

#### _Body_
No requiere body

#### _Ejemplo_
```
PUT /api/tasks/690001ce648e127ff06f4612/completar
```

#### _Response_
```json
{
  "status": "success",
  "message": "Tarea marcada como completada"
}
```

---

### 7. Eliminar tarea
**DELETE** `/api/tasks/:id`

Elimina una tarea del sistema.

#### _Parámetros_

| Parámetro | Tipo   | Descripción              |
|-----------|--------|--------------------------|
| id        | string | ID de la tarea a eliminar |

#### _Ejemplo_
```
DELETE /api/tasks/690001ce648e127ff06f4612
```

#### _Response_
```json
{
  "status": "success",
  "message": "Tarea eliminada exitosamente"
}
```

---

## Códigos de Estado HTTP

| Código | Descripción                              |
|--------|------------------------------------------|
| 200    |    Success                               |
| 201    |    Created                               |
| 400    |    Bad Request (datos inválidos)         |
| 404    |    Not Found (tarea no existe)           |
| 500    |    Internal Server Error                 |
