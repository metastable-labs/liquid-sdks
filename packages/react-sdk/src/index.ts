import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { LiquidWebSDK, LiquidConfig, LiquidUser } from "@liquid/web-sdk";

// Context for the SDK
const LiquidContext = createContext<LiquidWebSDK | null>(null);

// Provider component
interface LiquidProviderProps {
  config: LiquidConfig;
  children: ReactNode;
}

export const LiquidProvider: React.FC<LiquidProviderProps> = ({
  config,
  children,
}) => {
  const [sdk] = useState(() => new LiquidWebSDK(config));

  useEffect(() => {
    sdk.initializeForBrowser();
  }, [sdk]);

  return React.createElement(LiquidContext.Provider, { value: sdk }, children);
};

// Hook to use the SDK
export const useLiquid = (): LiquidWebSDK => {
  const sdk = useContext(LiquidContext);
  if (!sdk) {
    throw new Error("useLiquid must be used within a LiquidProvider");
  }
  return sdk;
};

// Hook for user data
export const useLiquidUser = () => {
  const sdk = useLiquid();
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

// Hook for hello world
export const useLiquidHello = () => {
  const sdk = useLiquid();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchHello = async () => {
    setLoading(true);
    try {
      const response = await sdk.sayHello();
      if (response.success) {
        setMessage(response.data);
      }
    } catch (err) {
      console.error("Error fetching hello:", err);
    } finally {
      setLoading(false);
    }
  };

  return { message, loading, fetchHello };
};

// Export everything from web-sdk
export * from "@liquid/web-sdk";
