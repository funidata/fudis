import { defineConfig } from "cypress";
import getCompareSnapshotsPlugin from "cypress-image-diff-js/plugin";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:6006",
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config);
    },
  },
});
