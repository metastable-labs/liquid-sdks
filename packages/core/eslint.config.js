import baseConfig from "@liquid/eslint-config";

export default [
  ...baseConfig,
  {
    ignores: ["dist/**", "node_modules/**"],
  },
];
