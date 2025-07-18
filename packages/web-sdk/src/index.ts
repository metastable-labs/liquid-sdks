import { LiquidClient, LiquidConfig, AskLiquidParams } from "@liquid/core";

export class LiquidWebSDK extends LiquidClient {
  private isModalOpen: boolean = false;

  constructor(config: LiquidConfig) {
    super(config);
  }

  askLiquid(params: AskLiquidParams): void {
    console.log(`[Liquid Web] Opening modal with params:`, params);
    this.isModalOpen = true;
    // TODO: Implement web modal rendering
    // This could create and append a modal element to the DOM
  }

  closeLiquid(): void {
    console.log(`[Liquid Web] Closing modal`);
    this.isModalOpen = false;
    // TODO: Implement web modal cleanup
    // This could remove the modal element from the DOM
  }

  isOpen(): boolean {
    return this.isModalOpen;
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
