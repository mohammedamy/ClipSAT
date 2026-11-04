#!/usr/bin/env bash
# scripts/upload-r2-assets.sh — WP-23 Cloudflare R2 Binary & Shard Offload
# Uploads 768 printable PDFs + 1,300 HTML exams (public/downloads/) and
# question-bank shards (public/bank-shards/) to R2 bucket cdn.clipsat.org.
set -euo pipefail

BUCKET="${R2_BUCKET:-clipsat-cdn}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Uploading public/downloads/ to r2://${BUCKET}/downloads/ ..."
npx -y wrangler r2 object put "${BUCKET}" --local=false >/dev/null 2>&1 || true
if command -v rclone >/dev/null 2>&1; then
  rclone sync "${ROOT_DIR}/public/downloads" "r2:${BUCKET}/downloads" \
    --transfers 16 \
    --header-upload "Cache-Control: public, max-age=31536000, immutable"
  rclone sync "${ROOT_DIR}/public/bank-shards" "r2:${BUCKET}/bank-shards" \
    --transfers 16 \
    --header-upload "Cache-Control: public, max-age=86400, stale-while-revalidate=604800"
  rclone sync "${ROOT_DIR}/public/worksheet-data" "r2:${BUCKET}/worksheet-data" \
    --transfers 16 \
    --header-upload "Cache-Control: public, max-age=86400, stale-while-revalidate=604800"
  echo "R2 sync completed via rclone."
else
  echo "Install rclone configured with remote 'r2:' (Cloudflare R2 S3 endpoint) and re-run."
  exit 1
fi
