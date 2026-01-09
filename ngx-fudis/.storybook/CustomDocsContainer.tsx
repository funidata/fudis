import { DocsContainer } from "@storybook/addon-docs";
import { VersionSelectorDocsWrapper } from "../projects/ngx-fudis/src/lib/components/version-selector/VersionSelectorDocsWrapper";
import React from "react";

export function CustomDocsContainer({ children, context }: any) {
  return (
    <DocsContainer context={context}>
      <VersionSelectorDocsWrapper />
      {children}
    </DocsContainer>
  );
}
