# Regla de arquitectura AWS (obligatoria)

**Todos los servicios AWS del proyecto deben ser serverless o administrados sin servidores que nosotros administremos.** No se permiten máquinas virtuales ni servicios que queden encendidos de forma permanente generando costo.

## Prohibido

- EC2, instancias dedicadas, Auto Scaling Groups.
- ECS/EKS con nodos EC2 (Fargate sí sería aceptable si se llegara a necesitar).
- RDS/Aurora provisionado, ElastiCache, DocumentDB, EMR, MQ.
- NAT Gateway, Application/Network Load Balancer, Elastic IPs sin uso.
- Lightsail, WorkSpaces, cualquier servicio con cobro por hora de servidor.

## Permitido (stack actual)

| Servicio | Uso en el proyecto |
|---|---|
| AWS Lambda | Procesamiento de eventos (subidas a S3) |
| DynamoDB (billing `PAY_PER_REQUEST`) | Datos y metadatos |
| S3 (privado, cifrado) | Archivos |
| Cognito (User Pool) | Autenticación |
| IAM y CloudWatch Logs | Permisos y logs |

También se permiten, si se necesitan más adelante: API Gateway, SQS, SNS y EventBridge.

## Reglas operativas

1. Todo recurso se crea con Terraform en `infra/` y se puede eliminar con `terraform destroy`.
2. Sin capacidad aprovisionada: DynamoDB on-demand, S3 sin versionado infinito, Lambdas con timeout corto.
3. Todos los recursos llevan la etiqueta `CostControl = free-tier`.
4. No se dejan recursos huérfanos ni datos de prueba al finalizar una validación.
5. Antes de `terraform apply`, revisar el plan y ejecutar `./scripts/verify-serverless.ps1`.
6. Si una necesidad exige un servicio no serverless, se debe aprobar explícitamente y documentar aquí el motivo.
