# make-favicons.ps1
# Generates the small brand images the pages reference:
#   assets/favicon-32.png       browser tab
#   assets/favicon-180.png      iOS "add to home screen"
#   assets/favicon.ico          multi-resolution fallback (16/32/48)
#   assets/brand-mark.png       the header and footer tile (.brand-mark)
#
# All of them used to resolve to assets/logo.png - a 2000x2000, 645 KB image -
# so every visitor downloaded it whole to paint a 40px tile and a 16px tab.
# logo.png stays in the repo as the source these are derived from.
#
# The logo artwork is dark on white with no light-on-dark variant, so each icon
# keeps a white background and crops to the circular mark, mirroring the
# .brand-mark rule in css/styles.css.
#
# Re-run whenever the logo changes.  .\tools\make-favicons.ps1

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$root    = Split-Path $PSScriptRoot -Parent
$logoSrc = Join-Path $root "assets\logo.png"
if (-not (Test-Path $logoSrc)) { throw "Logo not found: $logoSrc" }

$logo = [System.Drawing.Image]::FromFile($logoSrc)

# Crops the logo to its circular mark on a white square, the same framing the
# site header uses: the source is drawn at 155% and pulled up to 13%.
function New-MarkBitmap([int]$size) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g   = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::White)
    $scaled = [int]($size * 1.55)
    $g.DrawImage($script:logo,
                 [int]($size - $scaled) / 2,
                 [int](($size - $scaled) * 0.13),
                 $scaled, $scaled)
    $g.Dispose()
    return $bmp
}

foreach ($s in 32, 180) {
    $bmp  = New-MarkBitmap $s
    $path = Join-Path $root "assets\favicon-$s.png"
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host ("  -> favicon-$s.png  ({0:N1} KB)" -f ((Get-Item $path).Length / 1KB))
}

# The header tile renders at 40px, so 256px covers a 3x display with room spare.
# Because this file is already cropped, .brand-mark can use `cover` instead of
# repeating the 155% / 13% offset.
$markPath = Join-Path $root "assets\brand-mark.png"
$bmp = New-MarkBitmap 256
$bmp.Save($markPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host ("  -> brand-mark.png  ({0:N1} KB)" -f ((Get-Item $markPath).Length / 1KB))

# --- favicon.ico: PNG-compressed entries, valid for Vista and later.
#     Same container format as Installer\prepare-assets.ps1 builds. ---
$icoPath = Join-Path $root "assets\favicon.ico"
$entries = @()
foreach ($s in 16, 32, 48) {
    $bmp = New-MarkBitmap $s
    $ms  = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $entries += ,@{ Size = $s; Bytes = $ms.ToArray() }
    $bmp.Dispose(); $ms.Dispose()
}

$fs = [System.IO.File]::Create($icoPath)
$bw = New-Object System.IO.BinaryWriter($fs)
$bw.Write([UInt16]0)                 # reserved
$bw.Write([UInt16]1)                 # type = icon
$bw.Write([UInt16]$entries.Count)
$offset = 6 + (16 * $entries.Count)
foreach ($e in $entries) {
    $bw.Write([Byte]$e.Size); $bw.Write([Byte]$e.Size)
    $bw.Write([Byte]0); $bw.Write([Byte]0)
    $bw.Write([UInt16]1); $bw.Write([UInt16]32)
    $bw.Write([UInt32]$e.Bytes.Length)
    $bw.Write([UInt32]$offset)
    $offset += $e.Bytes.Length
}
foreach ($e in $entries) { $bw.Write($e.Bytes) }
$bw.Flush(); $bw.Close(); $fs.Close()
Write-Host ("  -> favicon.ico     ({0:N1} KB)" -f ((Get-Item $icoPath).Length / 1KB))

$logo.Dispose()
Write-Host "Done."
