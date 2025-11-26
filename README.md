# To-Do API

Una API RESTful robusta y moderna para gestión de tareas, construida con **Django Rest Framework**.

Este proyecto implementa las mejores prácticas de desarrollo backend, incluyendo autenticación segura con JWT, documentación automática y separación de recursos por usuario.

## Características

*   **Autenticación JWT:** Seguridad moderna y stateless usando `Simple JWT`.
*   **Privacidad de Datos:** Cada usuario solo puede ver, editar y eliminar sus propias tareas.
*   **Documentación Interactiva:** Swagger UI integrado gracias a `drf-spectacular`.
*   **Filtrado y Ordenamiento:** Búsqueda por título, filtros por estado/prioridad y ordenamiento flexible.
*   **Gestión de Dependencias:** Proyecto optimizado usando `uv` para una instalación ultrarrápida.

## Tecnologías

*   **Python 3.13**
*   **Django 5.2**
*   **Django Rest Framework**
*   **PostgreSQL** (Base de datos)
*   **drf-spectacular** (OpenAPI 3.0)

## Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/gminos/to_do_api.git
    cd to_do_api
    ```

2.  **Instalar dependencias:**
    Asegúrate de tener instalado `uv`.
    ```bash
    uv sync
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz basado en el siguiente ejemplo:
    ```env
    DJANGO_SECRET_KEY=tu_clave_secreta_super_segura
    DJANGO_DEBUG=true
    DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
    POSTGRES_DB=nombre_tu_base_datos
    POSTGRES_USER=usuario_postgres
    POSTGRES_PASSWORD=password_postgres
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    ```

4.  **Aplicar migraciones:**
    ```bash
    uv run manage.py migrate
    ```

5.  **Correr el servidor (Modo Local):**
    ```bash
    uv run manage.py runserver
    ```

## Ejecución con Docker (Recomendado)

Si prefieres no instalar dependencias en tu máquina, usa Docker:

1.  Asegúrate de tener Docker y Docker Compose instalados.
2.  Crea el archivo `.env` como se indicó arriba.
3.  Ejecuta:
    ```bash
    docker compose up --build
    ```
4.  La API estará disponible en: [http://localhost:8001/api/docs/](http://localhost:8001/api/docs/)
    *(Nota: La configuración de Docker usará el puerto 8001 para evitar conflictos)*

## Documentación de la API

Una vez corriendo el servidor, visita:

*   **Swagger UI:** [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)
*   **Redoc:** [http://localhost:8000/api/schema/](http://localhost:8000/api/schema/)

Desde Swagger puedes probar todos los endpoints directamente (recuerda obtener tu token en `/api/token/` y usar el botón **Authorize**).

## Endpoints Principales

*   `POST /api/token/` - Obtener Access y Refresh Token.
*   `POST /api/register/` - Registrar nuevo usuario.
*   `GET /tasks/` - Listar tareas del usuario autenticado.
*   `POST /tasks/` - Crear nueva tarea.
