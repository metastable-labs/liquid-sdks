"use client";

import {
  LiquidProvider,
  useLiquidUser,
  useLiquidHello,
} from "@liquid/react-sdk";

function UserInfo() {
  const { user, loading, error } = useLiquidUser();

  if (loading) return <div className="text-blue-600">Loading user...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!user) return <div className="text-gray-600">No user data</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
      <div className="space-y-2">
        <p>
          <span className="font-semibold">ID:</span> {user.id}
        </p>
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>
    </div>
  );
}

function HelloWorld() {
  const { message, loading, fetchHello } = useLiquidHello();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Hello World</h2>
      <button
        onClick={fetchHello}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? "Loading..." : "Say Hello"}
      </button>
      {message && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}
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
          <UserInfo />
          <HelloWorld />
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">SDK Information</h2>
          <p className="text-gray-700">
            This example demonstrates the usage of the Liquid React SDK with:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>React hooks for data fetching</li>
            <li>Context provider for SDK initialization</li>
            <li>Tailwind CSS for styling</li>
            <li>TypeScript for type safety</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <LiquidProvider config={{ apiKey: "demo-api-key" }}>
      <AppContent />
    </LiquidProvider>
  );
}
