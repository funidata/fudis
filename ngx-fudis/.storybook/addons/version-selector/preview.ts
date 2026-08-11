import type { Renderer, ProjectAnnotations } from 'storybook/internal/types';
import { CustomDocsContainer } from './CustomDocsContainer';

const preview: ProjectAnnotations<Renderer> = {
  parameters: {
    docs: {
      container: CustomDocsContainer,
    },
  },
};

export default preview;
