#!/bin/sh

set -eu

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <contact-email>" >&2
    exit 1
fi

contact_email=$1
script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
project_dir=$(CDPATH= cd -- "$script_dir/../.." && pwd)

cd "$project_dir"
mkdir -p deploy/certbot/conf deploy/certbot/www

echo "Starting the HTTP bootstrap gateway for ACME validation..."
docker compose -f docker-compose.yml -f deploy/certbot/docker-compose.bootstrap.yml \
    up -d --force-recreate --no-deps portfolio-gateway

echo "Requesting a certificate for stellerainn.com and www.stellerainn.com..."
docker compose run --rm certbot certonly \
    --webroot \
    --webroot-path /var/www/certbot \
    --email "$contact_email" \
    --agree-tos \
    --no-eff-email \
    --domain stellerainn.com \
    --domain www.stellerainn.com

echo "Switching the gateway to HTTPS..."
docker compose up -d --force-recreate --no-deps portfolio-gateway
docker compose exec portfolio-gateway nginx -t

echo "HTTPS is ready. Verify https://stellerainn.com/ in a browser."
