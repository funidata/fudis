import { Canvas } from "@storybook/blocks";
import * as VersionSelectorStories from "../../projects/ngx-fudis/src/storybook-docs/version-selector/version-selector.stories";
import React from "react";

// The reason this file and CustomDocsContainer are both react files is that
// customizing Storybook's DocsContainer requires React and does not support Angular components.

export function VersionSelectorDocsWrapper() {
  // Hide the version selector from the welcome docs page
  if (typeof window !== "undefined") {
    const search = window.location.search || "";
    const params = new URLSearchParams(search);
    const idParam = params.get("id") || "";

    const excludedIds = new Set([
      "documentation-introduction-welcome--documentation",
      "components-language-badge-group--documentation",
      "components-form-error-message--documentation",
      "components-dropdown-menu--documentation",
    ]);

    if (excludedIds.has(idParam)) {
      return null;
    }
  }

  return (
    <Canvas
      of={VersionSelectorStories.VersionSelectorStory}
      meta={VersionSelectorStories}
      withToolbar={false}
      sourceState="none"
      className="unstyled-canvas"
    />
  );
}
