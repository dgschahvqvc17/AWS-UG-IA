# AWS-UG-IA

Proyecto base de aplicación web con arquitectura MVC.

- Frontend: Angular 21 (TypeScript)
- Backend: Node.js + Express ( patrón MVC )

## Estructura

```
├── frontend/   # Angular (cliente web)
├── backend/    # Node.js + Express (API, patrón MVC)
│   └── src/    # models / controllers / routes
└── README.md
```

Durante el desarrollo, el frontend redirige `/api` y `/health` al backend (`localhost:3000`)
mediante `frontend/proxy.conf.json`.

## Ramas

- `main`: versión estable / producción.
- `develop`: rama de desarrollo (estado actual del trabajo).

Flujo sugerido: trabajar en `develop` y fusionar en `main` cuando la versión esté lista.

## Puesta en marcha

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

La aplicación frontend estará disponible en `http://localhost:4200` y la API en `http://localhost:3000`.
