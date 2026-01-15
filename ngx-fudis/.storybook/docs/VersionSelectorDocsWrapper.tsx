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

    if (idParam === "documentation-introduction-welcome--documentation") {
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
