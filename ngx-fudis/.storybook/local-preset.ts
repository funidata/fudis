import { fileURLToPath } from 'node:url';

export function previewAnnotations(entry = []) {
  return [...entry];
}

export function managerEntries(entry = []) {
  return [...entry, fileURLToPath(import.meta.resolve('./addons/version-selector/manager.tsx'))];
}
