"use client";

import { LiquidProvider, useLiquid } from "@liquid/react-sdk";

function DemoSection() {
  const { askLiquid, closeLiquid, isOpen } = useLiquid();

  const handleOpenModal = () => {
    askLiquid({
      userWalletAddresses: ["0x1234567890123456789012345678901234567890"],
      chains: ["solana", "base"],
      modalStyle: "panel",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Liquid SDK Demo</h2>
      <div className="space-y-4">
        <p className="text-gray-700">
          Current modal state:{" "}
          <span className="font-semibold">{isOpen ? "Open" : "Closed"}</span>
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleOpenModal}
            disabled={isOpen}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Open Liquid Modal
          </button>

          <button
            onClick={closeLiquid}
            disabled={!isOpen}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Close Modal
          </button>
        </div>

        <div className="mt-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          <p>
            <strong>Demo wallet:</strong>{" "}
            0x1234567890123456789012345678901234567890
          </p>
          <p>
            <strong>Chains:</strong> Solana, Base
          </p>
          <p>
            <strong>Modal Style:</strong> Half Bottom Sheet
          </p>
        </div>
      </div>
    </div>
  );
}

function ConfigInfo() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">SDK Configuration</h2>
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">App ID:</span> demo-react-app
        </p>
        <p>
          <span className="font-semibold">Default Modal Style:</span> Half
          Bottom Sheet
        </p>
        <p>
          <span className="font-semibold">Default Chains:</span> Solana
        </p>
        <p>
          <span className="font-semibold">Mode:</span> Light
        </p>
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Liquid React SDK Example
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DemoSection />
          <ConfigInfo />
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Features Demonstrated</h2>
          <p className="text-gray-700 mb-4">
            This example demonstrates the updated Liquid React SDK with:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              <strong>LiquidProvider:</strong> Context provider for SDK
              configuration
            </li>
            <li>
              <strong>useLiquid Hook:</strong> Access to askLiquid, closeLiquid,
              and isOpen state
            </li>
            <li>
              <strong>Modal Styles:</strong> halfBottomSheet, fullBottomSheet,
              modal, panel
            </li>
            <li>
              <strong>Multi-Chain Support:</strong> Solana, Base, Ink networks
            </li>
            <li>
              <strong>TypeScript:</strong> Full type safety and autocompletion
            </li>
            <li>
              <strong>Portal Rendering:</strong> Modal renders outside component
              tree
            </li>
            <li>
              <strong>Accessibility:</strong> Keyboard navigation and focus
              management
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <LiquidProvider
      config={{
        appId: "demo-react-app",
        modalStyle: "halfBottomSheet",
        chains: ["solana"],
        mode: "light",
      }}
    >
      <AppContent />
    </LiquidProvider>
  );
}
