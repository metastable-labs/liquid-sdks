import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Platform } from "react-native";
import {
  LiquidClient,
  LiquidConfig,
  AskLiquidParams,
  UseLiquidReturn,
} from "@liquid/core";

export class LiquidReactNativeSDK extends LiquidClient {
  private isModalOpen: boolean = false;

  constructor(config: LiquidConfig) {
    super(config);
  }

  askLiquid(params: AskLiquidParams): void {
    console.log(`[Liquid RN] Opening modal with params:`, params);
    this.isModalOpen = true;
    // TODO: Implement native modal presentation
  }

  closeLiquid(): void {
    console.log(`[Liquid RN] Closing modal`);
    this.isModalOpen = false;
    // TODO: Implement native modal dismissal
  }

  isOpen(): boolean {
    return this.isModalOpen;
  }

  getPlatformInfo(): { os: string; version: string } {
    return {
      os: Platform.OS,
      version: Platform.Version.toString(),
    };
  }
}

// Context for the SDK
interface LiquidRNContextValue {
  sdk: LiquidReactNativeSDK;
  isOpen: boolean;
  askLiquid: (params: AskLiquidParams) => void;
  closeLiquid: () => void;
}

const LiquidRNContext = createContext<LiquidRNContextValue | null>(null);

// Provider component
interface LiquidRNProviderProps {
  config: LiquidConfig;
  children: ReactNode;
}

export const LiquidRNProvider: React.FC<LiquidRNProviderProps> = ({
  config,
  children,
}) => {
  const [sdk] = useState(() => new LiquidReactNativeSDK(config));
  const [isOpen, setIsOpen] = useState(false);

  const askLiquid = useCallback(
    (params: AskLiquidParams) => {
      sdk.askLiquid(params);
      setIsOpen(true);
    },
    [sdk]
  );

  const closeLiquid = useCallback(() => {
    sdk.closeLiquid();
    setIsOpen(false);
  }, [sdk]);

  const contextValue: LiquidRNContextValue = {
    sdk,
    isOpen,
    askLiquid,
    closeLiquid,
  };

  return React.createElement(
    LiquidRNContext.Provider,
    { value: contextValue },
    children
  );
};

// Hook to use the SDK - matches React SDK API
export const useLiquidRN = (): UseLiquidReturn => {
  const context = useContext(LiquidRNContext);
  if (!context) {
    throw new Error("useLiquidRN must be used within a LiquidRNProvider");
  }

  return {
    askLiquid: context.askLiquid,
    closeLiquid: context.closeLiquid,
    isOpen: context.isOpen,
  };
};

// Export everything from core
export * from "@liquid/core";

// Create a default instance function
export const createLiquidRNSDK = (
  config: LiquidConfig
): LiquidReactNativeSDK => {
  return new LiquidReactNativeSDK(config);
};
