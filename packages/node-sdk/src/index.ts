import { LiquidClient, LiquidConfig, AskLiquidParams } from "@liquid/core";

export class LiquidNodeSDK extends LiquidClient {
  constructor(config: LiquidConfig) {
    super(config);
  }

  askLiquid(params: AskLiquidParams): void {
    console.log(`[Liquid Node] askLiquid called with params:`, params);
    // TODO: Implement server-side modal handling or API calls
    console.log(`[Liquid Node] Config:`, this.getConfig());
  }

  closeLiquid(): void {
    console.log(`[Liquid Node] closeLiquid called`);
    // TODO: Implement server-side modal cleanup
  }

  getNodeInfo(): { version: string; platform: string; arch: string } {
    return {
      version: process.version,
      platform: process.platform,
      arch: process.arch,
    };
  }

  getEnvironmentVariable(key: string): string | undefined {
    return process.env[key];
  }
}

// Export everything from core
export * from "@liquid/core";

// Create a default instance function
export const createLiquidNodeSDK = (config: LiquidConfig): LiquidNodeSDK => {
  return new LiquidNodeSDK(config);
};
