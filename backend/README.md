# Backend (Node.js + Express)

API REST organizada con arquitectura MVC:

```
src/
├── app.js                 # Configuración de Express y middleware
├── server.js              # Punto de entrada
├── models/                # Datos y persistencia
├── controllers/           # Lógica de petición/respuesta
└── routes/                # Definición de endpoints
```

## Endpoints

- `GET /health` — verificación de estado.
- `GET /api/examples` — listar ejemplos.
- `GET /api/examples/:id` — obtener uno.
- `POST /api/examples` — crear (body: `{ "nombre": "...", "descripcion": "..." }`).
- `DELETE /api/examples/:id` — eliminar.

## Ejecutar

```bash
npm install
npm run dev
```
