#!/bin/bash

# Convenience script for tagging releases.
# Creates a new branch from main and runs `npm version`` with given command.
#
# Usage: release.sh <major|minor|patch>

# Allow running from anywhere.
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

arg=$1
release_branch=release

if [ -z "$arg" ]
then
	echo "Version increment argument is required"
	exit 1
fi

git switch main
git pull
git branch --delete "$release_branch"
git push origin --delete "$release_branch"
git checkout -b "$release_branch"
git push --set-upstream origin "$release_branch"
npm version "$arg"
