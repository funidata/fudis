#!/bin/bash

set -euo pipefail

PROJECT_ROOT="."
DIST_DIR="./dist"

mkdir -p "$DIST_DIR"

find "$PROJECT_ROOT" \
  -path "$PROJECT_ROOT/.storybook" -prune -o \
  -path "$PROJECT_ROOT/node_modules" -prune -o \
  -path "$DIST_DIR" -prune -o \
  \( -name "*.scss" -o -name "*.woff2" \) -type f -print | while read -r file; do
    rel_path="${file#"$PROJECT_ROOT"/}"
    target_dir="$DIST_DIR/$(dirname "$rel_path")"
    mkdir -p "$target_dir"
    cp "$file" "$target_dir/"
    echo "Copied: $rel_path"
done

for f in package.json README.md; do
  if [[ -f "$PROJECT_ROOT/$f" ]]; then
    cp "$PROJECT_ROOT/$f" "$DIST_DIR/"
    echo "Copied: $f"
  else
    echo "Warning: $f not found."
  fi
done

echo "All files copied successfully to $DIST_DIR"
