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

    const globals = params.get("globals");
    const globalsPart = globals ? `&globals=${encodeURIComponent(globals)}` : "";

    return (
      <div className="unstyled-canvas">
        <iframe
          title="Version selector"
          src={`iframe.html?id=docs-version-selector--version-selector-story&viewMode=story${globalsPart}`}
          style={{ width: "100%", height: "220px", border: 0, overflow: "hidden" }}
        />
      </div>
    );
  }

  return null;
}
