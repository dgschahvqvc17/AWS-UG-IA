param([string]$PlanFile = '')

$ErrorActionPreference = 'Stop'

# Valida que el estado/plan de Terraform no contenga recursos con servidor propio.
$forbidden = @(
  'aws_instance',
  'aws_ecs_',
  'aws_eks_',
  'aws_rds_',
  'aws_elasticache_',
  'aws_nat_gateway',
  'aws_lb',
  'aws_elb',
  'aws_eip',
  'aws_autoscaling_',
  'aws_batch_',
  'aws_emr_',
  'aws_lightsail_',
  'aws_workspaces_'
)

if ($PlanFile) {
  $state = terraform show -json $PlanFile | ConvertFrom-Json
}
else {
  $state = terraform show -json | ConvertFrom-Json
}

if ($state.resource_changes) {
  # Salida de un plan (terraform show -json tfplan)
  $types = @($state.resource_changes | ForEach-Object { $_.type })
}
elseif ($state.values.root_module.resources) {
  # Salida del estado aplicado (terraform show -json)
  $types = @($state.values.root_module.resources | ForEach-Object { $_.type })
}
else {
  $types = @()
}

$types = @($types | Sort-Object -Unique)

$violations = foreach ($type in $types) {
  foreach ($pattern in $forbidden) {
    if ($type.StartsWith($pattern)) {
      $type
      break
    }
  }
}

if ($violations.Count -gt 0) {
  Write-Error "Recursos NO serverless detectados: $($violations -join ', ')"
  exit 1
}

Write-Host "OK: todos los recursos son serverless ($($types.Count) tipos)."
