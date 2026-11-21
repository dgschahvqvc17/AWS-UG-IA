output "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB."
  value       = aws_dynamodb_table.items.name
}

output "dynamodb_table_arn" {
  description = "ARN de la tabla DynamoDB."
  value       = aws_dynamodb_table.items.arn
}

output "s3_bucket_name" {
  description = "Nombre del bucket S3 privado."
  value       = aws_s3_bucket.files.id
}

output "s3_bucket_arn" {
  description = "ARN del bucket S3."
  value       = aws_s3_bucket.files.arn
}

output "cognito_user_pool_id" {
  description = "ID del User Pool de Cognito."
  value       = aws_cognito_user_pool.app.id
}

output "cognito_client_id" {
  description = "ID del cliente público de Cognito (se usa en Angular)."
  value       = aws_cognito_user_pool_client.app.id
}

output "cognito_domain" {
  description = "Dominio de Cognito para el flujo hosted UI."
  value       = "${aws_cognito_user_pool_domain.app.domain}.auth.${var.aws_region}.amazoncognito.com"
}

output "lambda_function_name" {
  description = "Nombre de la Lambda que procesa nuevos objetos en S3."
  value       = aws_lambda_function.s3_object_created.function_name
}

output "aws_region" {
  description = "Región desplegada."
  value       = var.aws_region
}
