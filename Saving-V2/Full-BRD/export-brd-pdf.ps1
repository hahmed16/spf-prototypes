param(
    [string]$InputHtml = "Saving-Full-BRD.html",
    [string]$OutputPdf = "Saving-Full-BRD.pdf",
    [int]$WaitMs = 30000
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$inputPath = Join-Path $scriptDir $InputHtml
$outputPath = Join-Path $scriptDir $OutputPdf
$tempPdfPath = Join-Path $env:TEMP ("spf-brd-export-" + [guid]::NewGuid().ToString("N") + ".pdf")

if (-not (Test-Path $inputPath)) {
    throw "Input HTML not found: $inputPath"
}

function Test-FileLocked {
    param([string]$Path)
    if (-not (Test-Path $Path)) { return $false }
    try {
        $stream = [System.IO.File]::Open($Path, 'Open', 'ReadWrite', 'None')
        $stream.Close()
        return $false
    } catch {
        return $true
    }
}

$edgeCandidates = @(
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
)

$edgePath = $edgeCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $edgePath) {
    throw "Microsoft Edge not found in expected locations."
}

$tempUserDataDir = Join-Path $env:TEMP ("spf-brd-export-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tempUserDataDir | Out-Null

try {
    $inputUri = ([System.Uri]::new($inputPath).AbsoluteUri + "?exportPdf=1")
    $edgeArgs = @(
        "--headless",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=$WaitMs",
        "--user-data-dir=$tempUserDataDir",
        "--print-to-pdf=$tempPdfPath",
        "--print-to-pdf-no-header",
        $inputUri
    )

    $proc = Start-Process -FilePath $edgePath -ArgumentList $edgeArgs -PassThru -Wait -WindowStyle Hidden
    if ($proc.ExitCode -ne 0) {
        throw "Edge export failed with exit code $($proc.ExitCode)."
    }

    if (-not (Test-Path $tempPdfPath)) {
        throw "PDF was not created: $tempPdfPath"
    }

    $finalOutputPath = $outputPath
    if (Test-FileLocked -Path $outputPath) {
        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($outputPath)
        $extension = [System.IO.Path]::GetExtension($outputPath)
        $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
        $finalOutputPath = Join-Path $scriptDir ($baseName + "-" + $timestamp + $extension)
    } elseif (Test-Path $outputPath) {
        Remove-Item -LiteralPath $outputPath -Force
    }
    Move-Item -LiteralPath $tempPdfPath -Destination $finalOutputPath

    $pdfInfo = Get-Item $finalOutputPath
    Write-Output "PDF created successfully:"
    Write-Output $pdfInfo.FullName
    Write-Output ("SizeBytes=" + $pdfInfo.Length)
}
finally {
    if (Test-Path $tempPdfPath) {
        Remove-Item -LiteralPath $tempPdfPath -Force -ErrorAction SilentlyContinue
    }
    if (Test-Path $tempUserDataDir) {
        Remove-Item -LiteralPath $tempUserDataDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}
