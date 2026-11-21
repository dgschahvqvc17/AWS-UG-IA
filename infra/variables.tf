variable "aws_region" {
  description = "Región de AWS (us-east-2 está dentro de la capa gratuita)."
  type        = string
  default     = "us-east-2"
}

variable "project_name" {
  description = "Prefijo para los nombres de los recursos."
  type        = string
  default     = "aws-ug-ia"
}

variable "environment" {
  description = "Entorno de despliegue."
  type        = string
  default     = "dev"
}

variable "callback_urls" {
  description = "URLs permitidas por el cliente de Cognito (Angular local)."
  type        = list(string)
  default     = ["http://localhost:4200"]
}
