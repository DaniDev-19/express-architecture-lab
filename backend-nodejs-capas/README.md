# Backend Node.js por capas

API Express con PostgreSQL usando `pg`, sin ORM.

## Estructura

```text
src/
  app.js                  # Configura Express y middlewares
  server.js               # Inicia el proceso HTTP
  config/                 # Variables de entorno y configuracion
  db/                     # Pool y acceso a PostgreSQL
  middlewares/             # Errores y middleware HTTP compartido
  routes/                 # Composicion de rutas de la API
  modules/
    health/               # Endpoint de comprobacion
    users/
      user.routes.js      # URLs y verbos HTTP
      user.controller.js  # Entrada/salida HTTP
      user.service.js     # Reglas de negocio y validaciones
      user.repository.js  # SQL y persistencia
  utils/                  # Utilidades reutilizables

database/
  migrations/             # SQL versionado de la base de datos
```

Cada nuevo recurso debe vivir dentro de `src/modules/<recurso>` y conservar la direccion de dependencias:

```text
routes -> controller -> service -> repository -> db
```

## Uso

1. Copia `.env.example` a `.env` y configura `DATABASE_URL`.
2. Ejecuta `database/migrations/001_create_users.sql` en PostgreSQL.
3. Ejecuta `npm run dev`.

Endpoints de ejemplo:

- `GET /api/health`
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users` con `{ "name": "Ana", "email": "ana@example.com" }`
