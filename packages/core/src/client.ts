import { LiquidConfig } from "./types";

export class LiquidClient {
  private config: LiquidConfig;

  constructor(config: LiquidConfig) {
    // Validate required config
    if (!config.appId) {
      throw new Error("LiquidClient: appId is required in config");
    }

    // Set defaults
    this.config = {
      modalStyle: "halfBottomSheet",
      chains: ["solana"],
      mode: "light",
      ...config,
    };
  }

  getConfig(): LiquidConfig {
    return { ...this.config };
  }
}
