import { LiquidConfig, LiquidResponse, LiquidUser } from "./types";

export class LiquidClient {
  private config: LiquidConfig;

  constructor(config: LiquidConfig) {
    this.config = {
      baseUrl: "https://api.liquid.com",
      timeout: 10000,
      ...config,
    };
  }

  async getUser(): Promise<LiquidResponse<LiquidUser>> {
    // Hello World implementation
    return {
      data: {
        id: "1",
        email: "hello@liquid.com",
        name: "Hello World User",
      },
      success: true,
    };
  }

  async sayHello(): Promise<LiquidResponse<string>> {
    return {
      data: "Hello from Liquid Core!",
      success: true,
    };
  }

  getConfig(): LiquidConfig {
    return { ...this.config };
  }
}
