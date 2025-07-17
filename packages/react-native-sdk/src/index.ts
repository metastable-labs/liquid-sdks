import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LiquidClient,
  LiquidConfig,
  LiquidResponse,
  LiquidUser,
} from "@liquid/core";

export class LiquidReactNativeSDK extends LiquidClient {
  constructor(config: LiquidConfig) {
    super(config);
  }

  async initializeForReactNative(): Promise<LiquidResponse<string>> {
    // React Native specific initialization
    return {
      data: `Liquid React Native SDK initialized on ${Platform.OS}!`,
      success: true,
    };
  }

  async getStorageItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error("Error getting storage item:", error);
      return null;
    }
  }

  async setStorageItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error setting storage item:", error);
    }
  }

  async removeStorageItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing storage item:", error);
    }
  }

  getPlatformInfo(): { os: string; version: string } {
    return {
      os: Platform.OS,
      version: Platform.Version.toString(),
    };
  }
}

// Context for the SDK
const LiquidRNContext = createContext<LiquidReactNativeSDK | null>(null);

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

  useEffect(() => {
    sdk.initializeForReactNative();
  }, [sdk]);

  return React.createElement(
    LiquidRNContext.Provider,
    { value: sdk },
    children
  );
};

// Hook to use the SDK
export const useLiquidRN = (): LiquidReactNativeSDK => {
  const sdk = useContext(LiquidRNContext);
  if (!sdk) {
    throw new Error("useLiquidRN must be used within a LiquidRNProvider");
  }
  return sdk;
};

// Hook for user data
export const useLiquidRNUser = () => {
  const sdk = useLiquidRN();
  const [user, setUser] = useState<LiquidUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await sdk.getUser();
        if (response.success) {
          setUser(response.data);
        } else {
          setError(response.error || "Failed to fetch user");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [sdk]);

  return { user, loading, error };
};

// Export everything from core
export * from "@liquid/core";

// Create a default instance function
export const createLiquidRNSDK = (
  config: LiquidConfig
): LiquidReactNativeSDK => {
  return new LiquidReactNativeSDK(config);
};
