import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  LiquidConfig,
  AskLiquidParams,
  UseLiquidReturn,
  Chain,
} from "@liquid/core";
import { LiquidModal } from "./components/LiquidModal";

// Context for the Liquid SDK
interface LiquidContextValue {
  config: LiquidConfig;
  isOpen: boolean;
  currentParams: AskLiquidParams | null;
  askLiquid: (params: AskLiquidParams) => void;
  closeLiquid: () => void;
}

const LiquidContext = createContext<LiquidContextValue | null>(null);

// Provider component
interface LiquidProviderProps {
  config: LiquidConfig;
  children: ReactNode;
}

export const LiquidProvider: React.FC<LiquidProviderProps> = ({
  config,
  children,
}) => {
  // Validate required config
  useEffect(() => {
    if (!config.appId) {
      throw new Error("LiquidProvider: appId is required in config");
    }
  }, [config.appId]);

  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [currentParams, setCurrentParams] = useState<AskLiquidParams | null>(
    null
  );

  // Merge config with defaults
  const mergedConfig: LiquidConfig = {
    modalStyle: "halfBottomSheet",
    chains: ["solana"],
    mode: "light",
    ...config,
  };

  // Ask Liquid function
  const askLiquid = useCallback(
    (params: AskLiquidParams) => {
      // Validate required parameters
      if (
        !params.userWalletAddresses ||
        params.userWalletAddresses.length === 0
      ) {
        throw new Error(
          "askLiquid: userWalletAddresses is required and cannot be empty"
        );
      }

      // Filter out invalid chains
      const validChains: Chain[] = ["solana", "base", "ink"];
      const filteredChains =
        params.chains?.filter((chain) => validChains.includes(chain)) ||
        mergedConfig.chains;

      // Set current parameters with defaults
      const finalParams: AskLiquidParams = {
        ...params,
        chains: filteredChains,
        modalStyle: params.modalStyle || mergedConfig.modalStyle,
      };

      setCurrentParams(finalParams);
      setIsOpen(true);
    },
    [mergedConfig]
  );

  // Close Liquid function
  const closeLiquid = useCallback(() => {
    setIsOpen(false);
    // Clear params after animation completes
    setTimeout(() => {
      setCurrentParams(null);
    }, 300);
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeLiquid();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      // Disable body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable body scroll
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeLiquid]);

  const contextValue: LiquidContextValue = {
    config: mergedConfig,
    isOpen,
    currentParams,
    askLiquid,
    closeLiquid,
  };

  return (
    <LiquidContext.Provider value={contextValue}>
      {children}
      {isOpen && currentParams && (
        <LiquidModal
          config={mergedConfig}
          params={currentParams}
          isOpen={isOpen}
          onClose={closeLiquid}
        />
      )}
    </LiquidContext.Provider>
  );
};

// Hook to use the Liquid SDK
export const useLiquid = (): UseLiquidReturn => {
  const context = useContext(LiquidContext);

  if (!context) {
    throw new Error("useLiquid must be used within a LiquidProvider");
  }

  return {
    askLiquid: context.askLiquid,
    closeLiquid: context.closeLiquid,
    isOpen: context.isOpen,
  };
};

// Export types for convenience
export type {
  LiquidConfig,
  AskLiquidParams,
  UseLiquidReturn,
  ModalStyle,
  Chain,
  Mode,
} from "@liquid/core";
