# Infraestructura AWS (Terraform)

Recursos creados, todos dentro de la capa gratuita:

| Servicio | Recurso | Uso |
|---|---|---|
| DynamoDB | Tabla `aws-ug-ia-dev-items` (on-demand) | Datos de la app y metadatos de archivos |
| S3 | Bucket privado `aws-ug-ia-dev-files-<account>` | Archivos subidos por los usuarios |
| Cognito | User Pool + cliente público + dominio | Registro/login de usuarios |
| Lambda | `aws-ug-ia-dev-s3-object-created` | Al subir un archivo a S3, guarda sus metadatos en DynamoDB |

También se crean el rol IAM de la Lambda, su permiso de invocación desde S3 y la notificación del bucket.

**Regla obligatoria:** arquitectura 100% serverless. No se permiten EC2, RDS, NAT Gateway,
Load Balancers ni ningún servicio con cobro por servidor encendido. Ver `../REGLAS_AWS.md`.
Para comprobarlo después de cada plan/apply:

```powershell
./scripts/verify-serverless.ps1
```

## Desplegar

```bash
cd infra
terraform init
terraform plan
terraform apply
```

## Destruir (para no generar costos)

```bash
terraform destroy
```

## Salidas útiles

`terraform output` muestra los IDs de Cognito, el nombre del bucket, la tabla y la Lambda.
Se usan en `backend/.env` y en `frontend/src/environments/`.

> La Lambda usa el SDK de AWS incluido en el runtime de Node.js 22, por eso no lleva `package.json`.
