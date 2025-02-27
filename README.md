# Proyecto Nueva Los Lagos

Este proyecto utiliza **Prisma** para gestionar la base de datos y MySQL como sistema de gestión de bases de datos.

## Requisitos previos

- Node.js (v14 o superior)
- MySQL
- npm o yarn

## Instalación

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/apizarro1204/backend-sist-gestion.git
    ```

2. Accede al directorio del proyecto:

    ```bash
    cd backend-sist-gestion
    ```

3. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```

## Configuración de la base de datos

### 1. Configurar el archivo `.env`

Debes crear un archivo `.env` y copiar el contenido de .envExample. Modificando las credenciales de la conexión a la base de datos MySQL.
Un ejemplo:

    ```plaintext
    DATABASE_URL="mysql://root@localhost:3306/sistema-gestion"
    ```

Asegúrate de reemplazar `root` con tu usuario de MySQL y ajustar los detalles de conexión según tu entorno y la contraseña si es necesaria

### 2. Crear la estructura de la base de datos con Prisma

Una vez que hayas configurado el archivo `.env`, ejecuta las migraciones de Prisma para crear la estructura de la base de datos:

    ```bash
    npx prisma migrate dev
    ```

Esto generará todas las tablas necesarias en la base de datos.

### 3. Poblar la tabla `Rol`

Después de haber creado la estructura de la base de datos con Prisma, debes poblar la tabla `Rol` con los roles necesarios.

Puedes hacer esto ejecutando el siguiente código SQL en tu base de datos MySQL. Puedes usar herramientas como **phpMyAdmin**, **MySQL Workbench** o la línea de comandos para ejecutar este script:

    ```sql
    -- Inserta las categorías
   INSERT INTO Categoria (nombre)
    VALUES
    ('Compras'),
    ('Limpieza'),
    ('Trabajo');

    ```

### 4. Ejecutar el servidor

Después de haber configurado y poblado la base de datos, puedes ejecutar el servidor con el siguiente comando:

    ```bash
    npm run start
    ```

El servidor debería estar corriendo en `http://localhost:3000`.

## Ejemplo de solicitud POST para crear un nuevo usuario

Para crear un nuevo usuario, puedes enviar una solicitud **POST** a la ruta `/api/usuarios` con el siguiente cuerpo en formato JSON:

### URL:
    ```
    http://localhost:3000/api/usuarios/registrar
    ```

### Método:
    ```
    POST
    ```

### Body (JSON):

    ```json para usuarios
    {
        "nombreUsuario": "juanperez",
        "password": "miContraseña123"
    }
    ```

Esta solicitud creará un nuevo usuario con los datos proporcionados en la base de datos.

## Notas adicionales

- Si necesitas restaurar la base de datos o cambiar la estructura, puedes usar el comando `npx prisma migrate dev` para aplicar cambios futuros.
- Recuerda que las migraciones solo generan la estructura de la base de datos, no los datos. Por eso, es necesario que ejecutes el código SQL de manera separada para poblar la base de datos con los datos iniciales (como los roles).
