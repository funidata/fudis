#!/bin/bash

# Allow running from anywhere.
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"



arg=$1
basePath=$2

if [ -z "$arg" ]
then
	echo "Storybook version argument is required. E.g. npm run local-storyboo 0.1.1"
	exit 1
fi

if [ -z "$basePath" ]
then
	echo "Not provided second argument of Storybook URL, using the default of: http://localhost:8080"
	export STORYBOOK_DEPLOY_URL=http://localhost:8080
fi

if [ "$basePath" ]
then
	export STORYBOOK_DEPLOY_URL=$basePath
fi

export STORYBOOK_FUDIS_VERSION=$arg


npm run build-storybook

npm run host-static-storybook