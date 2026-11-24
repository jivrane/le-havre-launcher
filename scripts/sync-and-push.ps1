# Script d'actualisation et de publication du Modpack Le Havre vers GitHub
param(
    [string]$CommitMessage = "Mise à jour des mods et configurations du serveur"
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$ProjectDir = Split-Path -Parent $ScriptDir

Write-Host "==========================================" -ForegroundColor Amber
Write-Host "   LE HAVRE // SYNCHRONISATION GITHUB     " -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Amber

Set-Location $ProjectDir

# 1. Générer le nouveau manifest.json
Write-Host "[1/3] Génération du manifeste des mods..." -ForegroundColor Cyan
& "C:\Program Files\nodejs\node.exe" "$ScriptDir\generate-manifest.js"

# 2. Vérifier les changements Git
Write-Host "`n[2/3] Préparation des fichiers Git..." -ForegroundColor Cyan
& "C:\Users\elijo\AppData\Local\Programs\Git\cmd\git.exe" add manifest.json
$status = & "C:\Users\elijo\AppData\Local\Programs\Git\cmd\git.exe" status --porcelain

if ($status) {
    & "C:\Users\elijo\AppData\Local\Programs\Git\cmd\git.exe" commit -m "$CommitMessage"
    Write-Host "Modifications enregistrées localement dans Git." -ForegroundColor Green
} else {
    Write-Host "Aucun changement détecté dans les fichiers des mods." -ForegroundColor Gray
}

# 3. Pousser vers GitHub si un remote est configuré
Write-Host "`n[3/3] Envoi vers le dépôt distant..." -ForegroundColor Cyan
$remotes = & "C:\Users\elijo\AppData\Local\Programs\Git\cmd\git.exe" remote

if ($remotes) {
    & "C:\Users\elijo\AppData\Local\Programs\Git\cmd\git.exe" push origin main
    Write-Host "Déploiement GitHub terminé avec succès !" -ForegroundColor Green
} else {
    Write-Host "Astuce : Aucun dépôt distant (remote) n'est encore configuré." -ForegroundColor Yellow
    Write-Host "Pour lier ton compte GitHub, utilise la commande :" -ForegroundColor White
    Write-Host "  git remote add origin https://github.com/<ton-pseudo>/<ton-repo>.git" -ForegroundColor White
    Write-Host "  git push -u origin main" -ForegroundColor White
}

Write-Host "`nTerminé !" -ForegroundColor Green
