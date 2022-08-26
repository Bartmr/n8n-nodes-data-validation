#!/usr/bin/env bash

set -e

cd /workspaces/n8n-nodes-data-validation
npm link

cd ~/.npm-global/lib/node_modules/n8n
npm link n8n-nodes-data-validation
