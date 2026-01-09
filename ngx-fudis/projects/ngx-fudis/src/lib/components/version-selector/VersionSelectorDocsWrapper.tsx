import { Canvas } from "@storybook/blocks";
import * as VersionSelectorStories from "./version-selector.stories";
import React from "react";

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
