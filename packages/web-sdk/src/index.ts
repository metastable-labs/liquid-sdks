import { LiquidClient, LiquidConfig, LiquidResponse } from "@liquid/core";

export class LiquidWebSDK extends LiquidClient {
  constructor(config: LiquidConfig) {
    super(config);
  }

  async initializeForBrowser(): Promise<LiquidResponse<string>> {
    // Browser-specific initialization
    return {
      data: "Liquid Web SDK initialized for browser!",
      success: true,
    };
  }

  getLocalStorageItem(key: string): string | null {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return null;
  }

  setLocalStorageItem(key: string, value: string): void {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  }

  getBrowserInfo(): { userAgent: string; platform: string } {
    if (typeof window !== "undefined" && window.navigator) {
      return {
        userAgent: window.navigator.userAgent,
        platform: window.navigator.platform,
      };
    }
    return {
      userAgent: "unknown",
      platform: "unknown",
    };
  }
}

// Export everything from core
export * from "@liquid/core";

// Create a default instance function
export const createLiquidWebSDK = (config: LiquidConfig): LiquidWebSDK => {
  return new LiquidWebSDK(config);
};
