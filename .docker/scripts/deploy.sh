#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/../.."

DEPLOY_HOST="${DEPLOY_HOST:-ubuntu@berus}"
DEPLOY_PATH="${DEPLOY_PATH:-~/poon-demo}"
BUILD_DIR="/tmp/poon-demo"

if [ ! -f .docker/app/env.sh ]; then
	echo "Missing .docker/app/env.sh" >&2
	exit 1
fi

if [ ! -f .docker/app/settings.json ]; then
	echo "Missing .docker/app/settings.json" >&2
	exit 1
fi

echo "Building Meteor bundle"
rm -rf "$BUILD_DIR"
BROWSERSLIST_IGNORE_OLD_DATA=1 meteor build "$BUILD_DIR" --directory --architecture os.linux.x86_64

echo "Syncing to $DEPLOY_HOST:$DEPLOY_PATH"
ssh "$DEPLOY_HOST" "mkdir -p $DEPLOY_PATH/.docker/build $DEPLOY_PATH/.docker"
for path in docker-compose.yml .docker/app/ .docker/cloudflared/; do
	rsync -az --delete "$path" "$DEPLOY_HOST:$DEPLOY_PATH/$path"
done
rsync -az --delete "$BUILD_DIR/bundle/" "$DEPLOY_HOST:$DEPLOY_PATH/.docker/build/bundle/"
rm -rf "$BUILD_DIR"

echo "Starting Docker stack"
ssh "$DEPLOY_HOST" "cd $DEPLOY_PATH && . .docker/app/env.sh && export METEOR_SETTINGS=\"\$(jq -c . .docker/app/settings.json)\" && docker compose up -d --build && docker compose ps"
