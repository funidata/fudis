import React from "react";
import { addons, types } from "storybook/manager-api";
import VersionSelector from "./VersionSelector";
import { ADDON_ID, TOOL_ID } from "./constants";

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Version Dropdown",
    match: ({ viewMode }) => !!viewMode,
    render: () => <VersionSelector />,
  });
});
