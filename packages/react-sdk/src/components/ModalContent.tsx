import React from "react";
import { LiquidConfig, AskLiquidParams } from "@liquid/core";

interface ModalContentProps {
  config: LiquidConfig;
  params: AskLiquidParams;
  onClose: () => void;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  config,
  params,
  onClose,
}) => {
  return (
    <div className="liquid-modal-content">
      {/* Header */}
      <div className="liquid-modal-header">
        <h2 id="liquid-modal-title" className="liquid-modal-title">
          Liquid AI Assistant
        </h2>
        <button
          className="liquid-modal-close"
          onClick={onClose}
          aria-label="Close Liquid AI Assistant"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="liquid-modal-body">
        <p id="liquid-modal-description" className="liquid-modal-description">
          Welcome to Liquid AI Assistant. This interface will help you interact
          with blockchain data and AI capabilities.
        </p>

        {/* Debug Info (for development) */}
        <div className="liquid-modal-debug">
          <h3>Configuration</h3>
          <ul>
            <li>
              <strong>App ID:</strong> {config.appId}
            </li>
            <li>
              <strong>Modal Style:</strong>{" "}
              {params.modalStyle || config.modalStyle}
            </li>
            <li>
              <strong>Mode:</strong> {config.mode}
            </li>
            <li>
              <strong>Chains:</strong>{" "}
              {(params.chains || config.chains)?.join(", ")}
            </li>
          </ul>

          <h3>Wallet Addresses</h3>
          <ul>
            {params.userWalletAddresses.map((address, index) => (
              <li key={index} className="liquid-wallet-address">
                {address}
              </li>
            ))}
          </ul>
        </div>

        {/* Placeholder for actual AI interface */}
        <div className="liquid-ai-interface">
          <p>🤖 AI Interface will be implemented here</p>
          <p>This is a placeholder for the actual Liquid AI chat interface.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="liquid-modal-footer">
        <button
          className="liquid-button liquid-button--secondary"
          onClick={onClose}
          type="button"
        >
          Close
        </button>
        <button className="liquid-button liquid-button--primary" type="button">
          Start Chat
        </button>
      </div>
    </div>
  );
};
