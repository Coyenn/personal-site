#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
src="$root/src/fonts/akkurat-mono.otf"
out="$root/src/fonts/akkurat-mono.woff2"

# Latin + Latin-1 + box/block drawing. Drops the Nerd Font PUA icons
# that make the source OTF ~4.8 MB.
uvx --from fonttools --with brotli pyftsubset "$src" \
  --output-file="$out" \
  --flavor=woff2 \
  --unicodes=U+0020-007E,U+00A0-00FF,U+2500-259F \
  --layout-features='*' \
  --name-IDs='*' \
  --notdef-outline \
  --recommended-glyphs \
  --no-hinting

ls -lh "$src" "$out"
