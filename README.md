### 🚀 Node.js & Express Architecture Lab

Este repositorio es un laboratorio práctico diseñado para explorar, comparar y dominar diferentes patrones arquitectónicos, estructuras de archivos e integraciones en el desarrollo backend utilizando **Node.js**, **Express**, **JavaScript** y **TypeScript**. 

El objetivo es analizar desde las implementaciones más minimalistas hasta arquitecturas de nivel empresarial y sistemas monolíticos tradicionales. 

### 📂 Estructura del Repositorio

El laboratorio se organiza en los siguientes proyectos independientes: 

### ⚙️ Arquitecturas y Patrones

* **backend-node-simple**: Configuración mínima de un servidor Express en un solo archivo.
* **backend-nodejs-capas**: Arquitectura clásica dividida por capas técnicas (Controladores, Servicios).
* **backend-node-mvc**: Patrón Modelo-Vista-Controlador enfocado en APIs desacopladas.
* **backend-node-monolith-modular**: Monolito organizado por módulos o características independientes (*features*).
* **backend-nodets-hexagonal / backend-nodets-ports-adapters**: Arquitectura Limpia basada en aislamiento del dominio mediante Puertos y Adaptadores en TypeScript.

### 🖥️ Renderizado en el Servidor (SSR)

* **backend-node-mvc-views**: Monolito tradicional que gestiona lógica y vistas HTML (vistas estilo Laravel/Blade).

### 💾 Persistencia de Datos y Caché

* **backend-node-mongoose**: Integración con bases de datos NoSQL utilizando MongoDB.
* **backend-node-prisma**: Gestión de bases de datos SQL usando Prisma ORM (JavaScript).
* **backend-nodets-prisma**: Gestión de bases de datos SQL usando Prisma ORM con tipado estricto (TypeScript).
* **backend-node-sequelize**: Integración clásica con bases de datos relacionales usando Sequelize ORM.
* **backend-node-redis-cache**: Implementación de una capa de almacenamiento en caché para optimizar respuestas.

### 🔐 Seguridad y Funcionalidades Core

* **backend-node-auth-jwt**: Sistema completo de autenticación y autorización mediante JSON Web Tokens (JWT).

### 🛠️ Tecnologías Principales

* **Runtime:** Node.js
* **Framework Web:** Express.js
* **Lenguajes:** JavaScript (ES6+) & TypeScript
* **Bases de Datos:** MongoDB, PostgreSQL / MySQL (vía ORMs)
* **Herramientas:** Prisma, Sequelize, Mongoose, Redis

### 🚀 Cómo Empezar

Cada carpeta funciona como un proyecto Node.js aislado. Para ejecutar cualquiera de ellos: 

1. Clona este repositorio: 

bash

git clone <URL_DE_TU_REPOSITORIO>

Usa el código con precaución.
2. Entra en la carpeta del proyecto que deseas probar: 

bash

cd nombre-de-la-carpeta

Usa el código con precaución.
3. Instala las dependencias: 

bash

npm install

Usa el código con precaución.
4. Configura las variables de entorno si el proyecto lo requiere (revisa el archivo .env.example interno).
5. Inicia el servidor en modo desarrollo: 

bash

npm run dev

Usa el código con precaución.

## "Aprende Creando, Crea Aprendiendo".