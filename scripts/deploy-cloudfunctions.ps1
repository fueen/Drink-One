param(
  [string]$EnvId = $env:CLOUDBASE_ENV_ID,
  [switch]$Force
)

$ErrorActionPreference = "Stop"

if (-not $EnvId) {
  throw "CloudBase env id is required. Pass -EnvId <env-id> or set `$env:CLOUDBASE_ENV_ID."
}

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$functionRoot = Join-Path $root "cloudfunctions"

if (-not (Test-Path $functionRoot)) {
  throw "cloudfunctions directory not found: $functionRoot"
}

$cli = Get-Command tcb -ErrorAction SilentlyContinue
if (-not $cli) {
  $cli = Get-Command cloudbase -ErrorAction SilentlyContinue
}

if ($cli) {
  $command = @($cli.Source)
} else {
  $command = @("npx.cmd", "-y", "--package", "@cloudbase/cli", "tcb")
}

$functions = Get-ChildItem $functionRoot -Directory |
  Where-Object {
    $_.Name -ne "common" -and
    (Test-Path (Join-Path $_.FullName "index.js")) -and
    (Test-Path (Join-Path $_.FullName "package.json"))
  } |
  Sort-Object Name

if ($functions.Count -eq 0) {
  throw "No deployable cloud functions found under $functionRoot"
}

Write-Host "Deploying $($functions.Count) cloud functions to env $EnvId"

Push-Location $root
try {
  foreach ($function in $functions) {
    $deployArgs = @(
      "fn",
      "deploy",
      $function.Name,
      "--dir",
      $function.FullName,
      "-e",
      $EnvId,
      "--yes",
      "--deployMode",
      "cos"
    )
    if ($Force) {
      $deployArgs += "--force"
    }

    $baseArgs = @()
    if ($command.Length -gt 1) {
      $baseArgs = $command[1..($command.Length - 1)]
    }

    Write-Host "Deploying $($function.Name)..."
    & $command[0] @baseArgs @deployArgs
    if ($LASTEXITCODE -ne 0) {
      throw "Failed to deploy $($function.Name)"
    }
  }
} finally {
  Pop-Location
}

Write-Host "Cloud function deployment complete."
