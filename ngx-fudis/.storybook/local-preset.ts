import { fileURLToPath } from 'node:url';

export function previewAnnotations(entry = []) {
  return [...entry, fileURLToPath(import.meta.resolve('./addons/version-selector/preview.ts'))];
}
