#!/usr/bin/env bash

set -e

echo "=== Deploying on Heroku ==="

git checkout heroku
git rebase master
git push -f heroku heroku:master

git checkout master
