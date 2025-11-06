# Tumblera - Initial Git Setup Script
# Run this script to initialize your repository and push to GitHub

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Tumblera - Git Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    git --version | Out-Null
    Write-Host "[OK] Git is installed" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Git is not installed. Please install Git first." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "This script will help you push your Tumblera website to GitHub" -ForegroundColor Yellow
Write-Host ""

# Get GitHub username and repo name
$username = Read-Host "Enter your GitHub username"
$reponame = Read-Host "Enter your repository name (default: Tumblera)"

if ([string]::IsNullOrWhiteSpace($reponame)) {
    $reponame = "Tumblera"
}

Write-Host ""
Write-Host "Repository URL will be: https://github.com/$username/$reponame" -ForegroundColor Cyan
$confirm = Read-Host "Is this correct? (y/n)"

if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "Cancelled." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Initializing Git repository..." -ForegroundColor Yellow

# Initialize git
git init

# Add all files
Write-Host "Adding files..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Tumblera custom tumbler website"

# Create main branch
Write-Host "Setting up main branch..." -ForegroundColor Yellow
git branch -M main

# Add remote
Write-Host "Adding remote repository..." -ForegroundColor Yellow
git remote add origin "https://github.com/$username/$reponame.git"

# Push
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "(You may need to enter your GitHub credentials)" -ForegroundColor Gray
Write-Host ""

git push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://github.com/$username/$reponame/settings/pages" -ForegroundColor White
Write-Host "2. Under 'Source', select 'main' branch" -ForegroundColor White
Write-Host "3. Click 'Save'" -ForegroundColor White
Write-Host "4. Wait 1-2 minutes" -ForegroundColor White
Write-Host "5. Visit: https://$username.github.io/$reponame/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Optional: Set up Formspree for email notifications" -ForegroundColor Yellow
Write-Host "See QUICKSTART.md for details" -ForegroundColor White
Write-Host ""
