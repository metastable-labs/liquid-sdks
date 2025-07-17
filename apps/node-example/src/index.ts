import { createLiquidNodeSDK } from "@liquid/node-sdk";

async function main() {
  console.log("🚀 Starting Liquid Node SDK Example...\n");

  // Initialize the SDK
  const sdk = createLiquidNodeSDK({
    apiKey: "demo-node-api-key",
    baseUrl: "https://api.liquid.com",
    timeout: 5000,
  });

  try {
    // Initialize for Node.js
    const initResult = await sdk.initializeForNode();
    console.log("✅ Initialization:", initResult.data);

    // Get node information
    const nodeInfo = sdk.getNodeInfo();
    console.log("📊 Node Information:");
    console.log(`   - Version: ${nodeInfo.version}`);
    console.log(`   - Platform: ${nodeInfo.platform}`);
    console.log(`   - Architecture: ${nodeInfo.arch}`);

    // Say hello
    const helloResult = await sdk.sayHello();
    console.log("\n👋 Hello:", helloResult.data);

    // Get user information
    const userResult = await sdk.getUser();
    if (userResult.success) {
      console.log("\n👤 User Information:");
      console.log(`   - ID: ${userResult.data.id}`);
      console.log(`   - Name: ${userResult.data.name}`);
      console.log(`   - Email: ${userResult.data.email}`);
    }

    // Demonstrate file operations
    const testDir = "./temp-demo";
    const testFile = `${testDir}/demo.txt`;

    // Ensure directory exists
    const dirResult = await sdk.ensureDirectory(testDir);
    console.log("\n📁 Directory:", dirResult.data);

    // Write a file
    const writeResult = await sdk.writeFile(
      testFile,
      "Hello from Liquid Node SDK!"
    );
    console.log("✏️  Write:", writeResult.data);

    // Read the file back
    const readResult = await sdk.readFile(testFile);
    if (readResult.success) {
      console.log("📄 Read:", readResult.data);
    }

    // Check environment variable
    const envVar = sdk.getEnvironmentVariable("NODE_ENV");
    console.log(`\n🌍 Environment: ${envVar || "not set"}`);

    // Show SDK configuration
    const config = sdk.getConfig();
    console.log("\n⚙️  SDK Configuration:");
    console.log(`   - API Key: ${config.apiKey.substring(0, 8)}...`);
    console.log(`   - Base URL: ${config.baseUrl}`);
    console.log(`   - Timeout: ${config.timeout}ms`);

    console.log("\n🎉 Node SDK Example completed successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main().catch(console.error);
