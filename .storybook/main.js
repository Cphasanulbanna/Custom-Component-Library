/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", // Look for stories in the src directory
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite", // Use the correct framework for your project
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
