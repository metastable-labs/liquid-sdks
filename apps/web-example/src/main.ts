import { createLiquidWebSDK, LiquidWebSDK } from "@liquid/web-sdk";

// Initialize the SDK
const sdk: LiquidWebSDK = createLiquidWebSDK({
  apiKey: "demo-web-api-key",
  baseUrl: "https://api.liquid.com",
  timeout: 5000,
});

// Initialize for browser
await sdk.initializeForBrowser();

// Example of how to use the SDK with TypeScript
export class WebSDKDemo {
  private sdk: LiquidWebSDK;

  constructor(sdk: LiquidWebSDK) {
    this.sdk = sdk;
  }

  async loadUserInfo(): Promise<void> {
    try {
      const userResponse = await this.sdk.getUser();

      if (userResponse.success) {
        const user = userResponse.data;
        console.log("User loaded:", {
          id: user.id,
          name: user.name,
          email: user.email,
        });
      } else {
        console.error("Failed to load user:", userResponse.error);
      }
    } catch (error) {
      console.error("Error loading user:", error);
    }
  }

  async sayHello(): Promise<string | null> {
    try {
      const response = await this.sdk.sayHello();
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.error || "Failed to say hello");
      }
    } catch (error) {
      console.error("Error saying hello:", error);
      return null;
    }
  }

  getBrowserInfo(): { userAgent: string; platform: string } {
    return this.sdk.getBrowserInfo();
  }

  testLocalStorage(): boolean {
    try {
      const testKey = "liquid_test_key";
      const testValue = "Hello from Liquid Web SDK!";

      // Set value
      this.sdk.setLocalStorageItem(testKey, testValue);

      // Get value
      const retrievedValue = this.sdk.getLocalStorageItem(testKey);

      return retrievedValue === testValue;
    } catch (error) {
      console.error("Local storage test failed:", error);
      return false;
    }
  }

  getConfig(): { apiKey: string; baseUrl?: string; timeout?: number } {
    return this.sdk.getConfig();
  }
}

// Export the demo instance
export const demo = new WebSDKDemo(sdk);

// Example usage
console.log("Liquid Web SDK Demo loaded");
console.log(
  "Available methods:",
  Object.getOwnPropertyNames(WebSDKDemo.prototype)
);

// Auto-run some demos
demo.loadUserInfo();
console.log("Browser Info:", demo.getBrowserInfo());
console.log("Local Storage Test:", demo.testLocalStorage());
console.log("SDK Config:", demo.getConfig());
