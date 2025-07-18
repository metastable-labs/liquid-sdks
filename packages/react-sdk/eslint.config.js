import baseConfig from "@liquid/eslint-config";

export default [
  ...baseConfig,
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    languageOptions: {
      globals: {
        HTMLElement: "readonly",
        HTMLDivElement: "readonly",
        NodeListOf: "readonly",
        KeyboardEvent: "readonly",
        Event: "readonly",
        document: "readonly",
        window: "readonly",
      },
    },
  },
];
