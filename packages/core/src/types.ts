// Modal presentation styles
export type ModalStyle =
  | "halfBottomSheet"
  | "fullBottomSheet"
  | "modal"
  | "panel";

// Light/Dark theme
export type Mode = "light" | "dark";

// Supported blockchain networks
export type Chain = "solana" | "base" | "ink";

// Main configuration interface
export interface LiquidConfig {
  appId: string; // Required: Unique identifier for the integrating platform
  modalStyle?: ModalStyle; // Optional: Default is "halfBottomSheet"
  chains?: Chain[]; // Optional: Default is ["solana"]
  mode?: Mode; // Optional: Default is "light"
}

// Parameters for askLiquid function
export interface AskLiquidParams {
  userWalletAddresses: string[]; // Required: Array of wallet addresses (0x format)
  chains?: Chain[]; // Optional: Override provider config
  modalStyle?: ModalStyle; // Optional: Override provider config
}

// Hook return interface
export interface UseLiquidReturn {
  askLiquid: (params: AskLiquidParams) => void;
  closeLiquid: () => void;
  isOpen: boolean;
}
