const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend Node Simple API',
      version: '1.0.0',
      description: 'Documentación interactiva de la API (Estilo FastAPI / Swagger UI)',
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
        description: 'Servidor Local de Desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Introduce tu token JWT en el formato: Bearer <token>',
        },
      },
    },
    paths: {
      '/auth/login': {
        post: {
          tags: ['Autenticación'],
          summary: 'Iniciar Sesión',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'admin@demo.com' },
                    password: { type: 'string', example: 'admin123' },
                  },
                  required: ['email', 'password'],
                },
              },
            },
          },
          responses: {
            200: { description: 'Inicio de sesión exitoso' },
            401: { description: 'Credenciales inválidas' },
          },
        },
      },
      '/auth/logout': {
        post: {
          tags: ['Autenticación'],
          summary: 'Cerrar Sesión',
          responses: {
            200: { description: 'Sesión cerrada exitosamente' },
          },
        },
      },
      '/auth/me': {
        get: {
          tags: ['Autenticación'],
          summary: 'Obtener datos del usuario autenticado',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Perfil de usuario obtenido' },
            401: { description: 'No autorizado' },
          },
        },
      },
      '/academia': {
        get: {
          tags: ['Academia'],
          summary: 'Obtener lista de academias con paginación',
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          ],
          responses: { 200: { description: 'Lista obtenida exitosamente' } },
        },
        post: {
          tags: ['Academia'],
          summary: 'Crear una nueva academia',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nombre: { type: 'string', example: 'Academia CodeX' },
                    lema: { type: 'string', example: 'Aprende y construye' },
                  },
                  required: ['nombre'],
                },
              },
            },
          },
          responses: {
            201: { description: 'Academia creada' },
            409: { description: 'Nombre duplicado' },
          },
        },
      },
      '/academia/{id}': {
        get: {
          tags: ['Academia'],
          summary: 'Obtener academia por ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            200: { description: 'Academia obtenida' },
            404: { description: 'No encontrada' },
          },
        },
        put: {
          tags: ['Academia'],
          summary: 'Actualizar academia por ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nombre: { type: 'string', example: 'Academia CodeX Pro' },
                    lema: { type: 'string', example: 'Innovación constante' },
                  },
                  required: ['nombre'],
                },
              },
            },
          },
          responses: {
            200: { description: 'Academia actualizada' },
            404: { description: 'No encontrada' },
          },
        },
        delete: {
          tags: ['Academia'],
          summary: 'Eliminar academia por ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            200: { description: 'Academia eliminada' },
            404: { description: 'No encontrada' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = {
  setupSwagger,
};
