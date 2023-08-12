#!/usr/bin/env bash

set -o errexit  # Abort on nonzero exit code.
set -o nounset  # Abort on unbound variable.
set -o pipefail # Don't hide errors within pipes.
# set -o xtrace   # Enable for debugging.

[[ -f Dockerfile ]] || \
    { printf "Dockerfile not found\n" >&2 && exit 1; }

podman build --tag joke-bot:latest -f ./Dockerfile

printf "Run 'podman run --name joke-bot --rm user:joke-bot' to start the container\n"
