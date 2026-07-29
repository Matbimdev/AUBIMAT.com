# make-og-image.ps1
# Generates assets/og-image.png (1200x630), the preview card shown when
# aubimat.com is shared on LinkedIn, WhatsApp, X or Slack.
#
# The logo artwork is dark on white with no light-on-dark variant, so the mark
# sits in a white rounded tile here exactly as it does in the site header — see
# the .brand-mark rule in css/styles.css, whose crop this mirrors.
#
# Re-run whenever the wording or the logo changes.  .\tools\make-og-image.ps1

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$root    = Split-Path $PSScriptRoot -Parent
$logoSrc = Join-Path $root "assets\logo.png"
$outPath = Join-Path $root "assets\og-image.png"

if (-not (Test-Path $logoSrc)) { throw "Logo not found: $logoSrc" }

$W, $H = 1200, 630
$bg     = [System.Drawing.Color]::FromArgb(10, 10, 10)      # #0a0a0a, the page background
$cyan   = [System.Drawing.Color]::FromArgb(43, 184, 196)    # #2bb8c4, brand accent
$grey   = [System.Drawing.Color]::FromArgb(156, 163, 175)   # #9ca3af, body copy

$bmp = New-Object System.Drawing.Bitmap $W, $H
$g   = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear($bg)

# --- Rounded-rectangle helper (System.Drawing has no primitive for it) ---
function New-RoundedPath([int]$x, [int]$y, [int]$w, [int]$h, [int]$r) {
    $p = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $r * 2
    $p.AddArc($x,           $y,           $d, $d, 180, 90)
    $p.AddArc($x + $w - $d, $y,           $d, $d, 270, 90)
    $p.AddArc($x + $w - $d, $y + $h - $d, $d, $d,   0, 90)
    $p.AddArc($x,           $y + $h - $d, $d, $d,  90, 90)
    $p.CloseFigure()
    return $p
}

# --- Brand mark: white tile with the circular part of the logo cropped into it.
#     Mirrors .brand-mark: background-size 155%, background-position 50% 13%. ---
$logo = [System.Drawing.Image]::FromFile($logoSrc)
$tile = 132
$tileX, $tileY = 90, 200
$tilePath = New-RoundedPath $tileX $tileY $tile $tile 26
$g.FillPath([System.Drawing.Brushes]::White, $tilePath)

$state = $g.Save()
$g.SetClip($tilePath)
$scaled = [int]($tile * 1.55)
$g.DrawImage($logo, [int]($tileX - ($scaled - $tile) * 0.5), [int]($tileY - ($scaled - $tile) * 0.13), $scaled, $scaled)
$g.Restore($state)
$tilePath.Dispose()
$logo.Dispose()

# --- Wordmark, headline and supporting line ---
$fontBrand = New-Object System.Drawing.Font("Segoe UI", 62, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontHead  = New-Object System.Drawing.Font("Segoe UI", 58, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$fontBody  = New-Object System.Drawing.Font("Segoe UI", 30, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$fontMeta  = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)

$brushWhite = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$brushGrey  = New-Object System.Drawing.SolidBrush $grey
$brushCyan  = New-Object System.Drawing.SolidBrush $cyan

$g.DrawString("AUBIMAT", $fontBrand, $brushWhite, 240, 218)

# Headline: the second line carries the brand colour, as the hero does on the site.
$g.DrawString("Automate your modelling", $fontHead, $brushWhite, 90, 360)
$g.DrawString("and raise your BIM productivity", $fontHead, $brushCyan, 90, 424)

# The separator is built from its code point: PowerShell 5.1 reads a .ps1 with no
# BOM as ANSI, which would turn a literal U+00B7 into "Â·".
$dot = [char]0x00B7
$g.DrawString("Revit 2022-2026  $dot  one installer  $dot  aubimat.com", $fontBody, $brushGrey, 90, 512)

# Accent rule along the top edge
$g.FillRectangle($brushCyan, 0, 0, $W, 8)

$g.DrawString("REVIT ADD-IN", $fontMeta, $brushCyan, 92, 140)

$g.Dispose()
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

$kb = [math]::Round((Get-Item $outPath).Length / 1KB, 1)
Write-Host "-> $outPath  (${W}x${H}, $kb KB)"
