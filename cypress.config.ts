import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "b1cir4",
  allowCypressEnv: false,

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
