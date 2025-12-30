import { Canvas } from "@storybook/blocks";
import * as VersionSelectorStories from "./version-selector.stories";
import React from "react";

export function VersionSelectorDocsWrapper() {
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
