import { DocsContainer } from "@storybook/addon-docs";
import { VersionSelectorDocsWrapper } from "./VersionSelectorDocsWrapper";
import React from "react";

// The reason this file and the VersionSelectorDocsWrapper are both react files is that
// customizing Storybook's DocsContainer requires React and does not support Angular components.

export function CustomDocsContainer({ children, context }: any) {
  return (
    <DocsContainer context={context}>
      <VersionSelectorDocsWrapper />
      {children}
    </DocsContainer>
  );
}
