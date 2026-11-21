# Backend (Node.js + Express + AWS)

API REST organizada con arquitectura MVC e integrada con DynamoDB, S3 y Cognito.

```
src/
├── app.js                 # Configuración de Express y middleware
├── server.js              # Punto de entrada
├── config/aws.js          # Clientes AWS
├── middleware/auth.js     # Verificación de JWT de Cognito
├── models/                # DynamoDB
├── controllers/           # Lógica de petición/respuesta
└── routes/                # Definición de endpoints
```

## Configuración

Copia `.env.example` a `.env` y completa los valores (los obtienes con
`terraform output` en `../infra`). Las credenciales AWS se toman de la cadena
por defecto del SDK (`~/.aws/credentials`, variables de entorno o rol de IAM).

- `REQUIRE_AUTH=false` permite desarrollo sin token. Ponlo en `true` para exigir JWT.
- Si envías `Authorization: Bearer <access-token>`, se valida contra Cognito.

## Endpoints

- `GET /health` — verificación de estado.
- `GET /api/examples` — listar registros en DynamoDB.
- `GET /api/examples/:id` — obtener uno.
- `POST /api/examples` — crear (`{ "nombre": "...", "descripcion": "..." }`).
- `DELETE /api/examples/:id` — eliminar.
- `GET /api/files` — listar objetos del bucket S3.
- `POST /api/files/upload-url` — URL prefirmada de subida (`{ "fileName": "foto.png", "contentType": "image/png" }`).
- `GET /api/files/download-url?key=...` — URL prefirmada de descarga.

Al subir un archivo a S3, la Lambda `aws-ug-ia-dev-s3-object-created` registra
sus metadatos en DynamoDB automáticamente.

## Ejecutar

```bash
npm install
npm run dev
```
