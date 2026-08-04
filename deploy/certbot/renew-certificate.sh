#!/bin/sh

set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
project_dir=$(CDPATH= cd -- "$script_dir/../.." && pwd)

cd "$project_dir"
mkdir -p deploy/certbot/conf deploy/certbot/www

docker compose run --rm certbot renew \
    --webroot \
    --webroot-path /var/www/certbot \
    "$@"

docker compose exec portfolio-gateway nginx -s reload
