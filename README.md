# API Videojuegos

## Overview

Esta es una API para gestionar información sobre videojuegos. Proporciona endpoints para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre diferentes recursos relacionados con los videojuegos.

## Tabla de Contenidos

1. [Instalación](#instalación)
2. [Uso](#uso)
3. [Endpoints](#endpoints)

## Instalación

Para utilizar esta API, primero debes clonar el repositorio desde GitHub:

```bash
git clone https://github.com/Adalab/modulo-4-evaluacion-final-bpw-bearm12.git

```

Instalar todas las dependencias necesarias con:

```bash
npm install
```

Luego, crea un archivo ".env" copiando los parametros de ".env_example" con tus datos.

## Uso

Una vez que hayas instalado las dependencias, puedes iniciar el servidor ejecutando el siguiente comando:

```bash
npm run dev
```

El servidor estará en funcionamiento en http://localhost:3000 (o el puerto que hayas indicado en el archivo .env). Puedes usar herramientas como Postman o cURL para realizar solicitudes HTTP a los endpoints proporcionados por la API.

## Endpoints

La API proporciona los siguientes endpoints:

- `GET /videojuegos`: Obtiene la lista de todos los videojuegos.
- `GET /videojuegos/:id`: Obtiene los detalles de un videojuego específico.
- `POST /videojuegos`: Crea un nuevo videojuego.
- `PUT /videojuegos/:id`: Actualiza los detalles de un videojuego existente.
- `DELETE /videojuegos/:id`: Elimina un videojuego.

Para obtener más detalles sobre cómo usar cada endpoint, consulta la documentación en la sección de [http://localhost:3000/api-games/](http://localhost:3000/api-games/) con el servidor levantado.
