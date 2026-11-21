# AWS-UG-IA

Proyecto base de aplicación web con arquitectura MVC.

- Frontend: Angular 21 (TypeScript)
- Backend: Node.js + Express ( patrón MVC )

## Estructura

```
├── frontend/   # Angular (cliente web)
├── backend/    # Node.js + Express (API, patrón MVC + AWS SDK)
│   └── src/    # config / middleware / models / controllers / routes
├── infra/      # Terraform: DynamoDB, S3, Cognito y Lambda
├── REGLAS_AWS.md
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

## AWS

La infraestructura está en `infra/` y se despliega con Terraform. Incluye DynamoDB (on-demand),
S3 privado, Cognito y una Lambda que registra en DynamoDB cada archivo subido a S3.
Los valores de conexión se copian de `terraform output` a `backend/.env` (ver `backend/.env.example`).

**Regla obligatoria:** solo servicios serverless, sin máquinas virtuales ni servicios siempre encendidos.
Detalle en [REGLAS_AWS.md](REGLAS_AWS.md).
