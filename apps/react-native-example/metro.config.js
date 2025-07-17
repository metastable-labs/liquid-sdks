const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Add the workspace root to the Metro watch folders
const workspaceRoot = path.resolve(__dirname, "../..");
config.watchFolders = [workspaceRoot];

// Tell Metro where to find modules
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// Force Metro to use the app's React instance (prevents hook conflicts)
config.resolver.extraNodeModules = {
  react: path.resolve(__dirname, "node_modules/react"),
  "react-native": path.resolve(__dirname, "node_modules/react-native"),
  "@liquid/core": path.resolve(workspaceRoot, "packages/core"),
  "@liquid/react-native-sdk": path.resolve(
    workspaceRoot,
    "packages/react-native-sdk"
  ),
};

// Add workspace packages to the resolver
config.resolver.disableHierarchicalLookup = false;

module.exports = config;
