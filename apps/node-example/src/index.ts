import { LiquidNodeSDK } from "@liquid/node-sdk";

async function runNodeExample() {
  console.log("🚀 Liquid Node SDK Example");
  console.log("=".repeat(40));

  try {
    // Initialize the SDK with required appId
    const sdk = new LiquidNodeSDK({
      appId: "demo-node-app",
      modalStyle: "modal",
      chains: ["solana", "base"],
      mode: "light",
    });

    console.log("✅ SDK initialized successfully!");

    // Demonstrate askLiquid functionality
    console.log("\n📞 Calling askLiquid...");
    sdk.askLiquid({
      userWalletAddresses: ["0x1234567890123456789012345678901234567890"],
      chains: ["solana", "base"],
      modalStyle: "fullBottomSheet",
    });

    // Demonstrate closeLiquid functionality
    console.log("\n🔒 Calling closeLiquid...");
    sdk.closeLiquid();

    // Show Node.js specific information
    console.log("\n🖥️  Node.js Environment Info:");
    const nodeInfo = sdk.getNodeInfo();
    console.log(`   - Node Version: ${nodeInfo.version}`);
    console.log(`   - Platform: ${nodeInfo.platform}`);
    console.log(`   - Architecture: ${nodeInfo.arch}`);

    // Show environment variables (demo only)
    console.log("\n🌍 Environment Variables:");
    const nodeEnv = sdk.getEnvironmentVariable("NODE_ENV") || "not set";
    const path = sdk.getEnvironmentVariable("PATH")
      ? "available"
      : "not available";
    console.log(`   - NODE_ENV: ${nodeEnv}`);
    console.log(`   - PATH: ${path}`);

    // Show SDK configuration
    console.log("\n⚙️  SDK Configuration:");
    const config = sdk.getConfig();
    console.log(`   - App ID: ${config.appId}`);
    console.log(`   - Modal Style: ${config.modalStyle}`);
    console.log(`   - Chains: ${config.chains?.join(", ")}`);
    console.log(`   - Mode: ${config.mode}`);

    console.log("\n🎉 Node SDK example completed successfully!");
  } catch (error) {
    console.error("\n❌ Error running Node SDK example:", error);
    process.exit(1);
  }
}

// Run the example
runNodeExample();
