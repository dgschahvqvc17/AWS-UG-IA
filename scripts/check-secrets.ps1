$ErrorActionPreference = 'Stop'

# Revisa los archivos en staging antes de hacer commit.
$staged = @(git diff --cached --name-only --diff-filter=ACM)

$forbiddenNames = @(
  '(^|/)\.env$',
  '\.(pem|key|pfx|p12)$',
  '(^|/)id_rsa',
  '(^|/)id_ed25519',
  '(^|/)credentials$',
  '(^|/)\.aws/'
)

$secretPatterns = @(
  'AKIA[0-9A-Z]{16}',
  'aws_secret_access_key',
  'BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY'
)

$problems = @()

foreach ($file in $staged) {
  foreach ($pattern in $forbiddenNames) {
    if ($file -match $pattern) {
      $problems += "Nombre prohibido: $file"
    }
  }

  # El propio script contiene los patrones de búsqueda.
  if ($file -eq 'scripts/check-secrets.ps1') { continue }

  if (-not (Test-Path $file)) { continue }

  $content = Get-Content -Raw -ErrorAction SilentlyContinue $file
  if (-not $content) { continue }

  foreach ($pattern in $secretPatterns) {
    if ($content -match $pattern) {
      $problems += "Posible secreto en $file ( patrón: $pattern )"
    }
  }
}

if ($problems.Count -gt 0) {
  Write-Error ($problems -join "`n")
  exit 1
}

Write-Host "OK: no se encontraron claves ni secretos en $($staged.Count) archivos."
