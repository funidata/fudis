#!/bin/bash

# Sync sub-projects to given version number.
#
# Pass current version as first argument.
# This script is meant to be used along with `npm version` in project root.

# List projects to update here by their folder name.
projects=(
  "ngx-fudis"
  "ngx-fudis/projects/ngx-fudis"
)

new_version=$1
repo_root=$(pwd)

function update_sub_project_version {
  project_name=$1
  dir="${repo_root}/${project_name}"

  cd $dir
  echo -n "${project_name}: "

  # Don't commit, just bump to given version.
  npm version --git-tag-version false $new_version
  # Running `npm version` in root will not stage extra files, so add them here.
  git add "${dir}/package.json" "${dir}/package-lock.json"
}

for project in ${projects[@]}; do
  update_sub_project_version $project
done
