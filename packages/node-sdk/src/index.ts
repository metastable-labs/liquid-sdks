import { promises as fs } from "fs";
import { LiquidClient, LiquidConfig, LiquidResponse } from "@liquid/core";

export class LiquidNodeSDK extends LiquidClient {
  constructor(config: LiquidConfig) {
    super(config);
  }

  async initializeForNode(): Promise<LiquidResponse<string>> {
    // Node.js specific initialization
    return {
      data: `Liquid Node SDK initialized on Node.js ${process.version}!`,
      success: true,
    };
  }

  async writeFile(
    filePath: string,
    data: string
  ): Promise<LiquidResponse<string>> {
    try {
      await fs.writeFile(filePath, data, "utf8");
      return {
        data: `File written successfully to ${filePath}`,
        success: true,
      };
    } catch (error) {
      return {
        data: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async readFile(filePath: string): Promise<LiquidResponse<string>> {
    try {
      const data = await fs.readFile(filePath, "utf8");
      return {
        data,
        success: true,
      };
    } catch (error) {
      return {
        data: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async ensureDirectory(dirPath: string): Promise<LiquidResponse<string>> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
      return {
        data: `Directory ensured: ${dirPath}`,
        success: true,
      };
    } catch (error) {
      return {
        data: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
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
