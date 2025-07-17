# Liquid SDKs

A comprehensive monorepo containing TypeScript SDKs for all JavaScript environments, built with Turbo Repo.

## 🚀 SDKs Included

### Core Packages

- **`@liquid/core`** - Shared utilities, types, and base client
- **`@liquid/web-sdk`** - Browser/web applications
- **`@liquid/react-sdk`** - React applications with hooks and components
- **`@liquid/react-native-sdk`** - React Native and Expo applications
- **`@liquid/node-sdk`** - Node.js server-side applications

### Shared Configurations

- **`@liquid/typescript-config`** - Shared TypeScript configurations
- **`@liquid/eslint-config`** - Shared ESLint configurations

## 📦 Architecture

```
liquid-sdks/
├── packages/
│   ├── core/                 # Base client and shared utilities
│   ├── web-sdk/             # Browser-specific features
│   ├── react-sdk/           # React hooks and components
│   ├── react-native-sdk/    # React Native/Expo features
│   ├── node-sdk/            # Node.js server-side features
│   ├── typescript-config/   # Shared TypeScript configs
│   └── eslint-config/       # Shared ESLint configs
├── apps/
│   ├── react-example/       # Next.js + Tailwind CSS example
│   ├── node-example/        # Node.js CLI example
│   ├── rn-example/          # React Native/Expo example
│   └── web-example/         # Vanilla JS/HTML example
└── turbo.json              # Turbo Repo configuration
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18.17.0 or higher
- npm 8.19.2 or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd liquid-sdks

# Install dependencies
npm install

# Build all packages
npm run build
```

### Development

```bash
# Run all packages in development mode
npm run dev

# Run specific package
npx turbo dev --filter=@liquid/react-sdk

# Build all packages
npm run build

# Run linting
npm run lint

# Type checking
npm run check-types
```

## 📚 Usage Examples

### React SDK

```tsx
import {
  LiquidProvider,
  useLiquidUser,
  useLiquidHello,
} from "@liquid/react-sdk";

function App() {
  return (
    <LiquidProvider config={{ apiKey: "your-api-key" }}>
      <UserProfile />
      <HelloWorld />
    </LiquidProvider>
  );
}

function UserProfile() {
  const { user, loading, error } = useLiquidUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

function HelloWorld() {
  const { message, loading, fetchHello } = useLiquidHello();

  return (
    <div>
      <button onClick={fetchHello} disabled={loading}>
        {loading ? "Loading..." : "Say Hello"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
```

### Node.js SDK

```typescript
import { createLiquidNodeSDK } from "@liquid/node-sdk";

async function main() {
  const sdk = createLiquidNodeSDK({
    apiKey: "your-api-key",
    baseUrl: "https://api.liquid.com",
  });

  // Initialize for Node.js
  await sdk.initializeForNode();

  // Get user information
  const user = await sdk.getUser();
  console.log("User:", user.data);

  // File operations
  await sdk.writeFile("./output.txt", "Hello World!");
  const content = await sdk.readFile("./output.txt");
  console.log("File content:", content.data);
}
```

### React Native SDK

```tsx
import { LiquidRNProvider, useLiquidRNUser } from "@liquid/react-native-sdk";

function App() {
  return (
    <LiquidRNProvider config={{ apiKey: "your-api-key" }}>
      <UserScreen />
    </LiquidRNProvider>
  );
}

function UserScreen() {
  const { user, loading, error } = useLiquidRNUser();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
    </View>
  );
}
```

### Web SDK

```typescript
import { createLiquidWebSDK } from "@liquid/web-sdk";

const sdk = createLiquidWebSDK({
  apiKey: "your-api-key",
});

// Initialize for browser
await sdk.initializeForBrowser();

// Use localStorage
sdk.setLocalStorageItem("token", "abc123");
const token = sdk.getLocalStorageItem("token");

// Get browser info
const browserInfo = sdk.getBrowserInfo();
console.log("Browser:", browserInfo.userAgent);
```

## 🏃‍♂️ Running Examples

### React Example (Next.js + Tailwind)

```bash
cd apps/react-example
npm run dev
# Visit http://localhost:3000
```

### Node.js Example

```bash
cd apps/node-example
npm run dev
```

### Build and Run React Example

```bash
# Build all packages first
npm run build

# Run React example
cd apps/react-example
npm run build
npm start
```

## 🧪 Testing

```bash
# Run tests for all packages
npm test

# Run tests for specific package
npx turbo test --filter=@liquid/core
```

## 📝 Publishing

```bash
# Build and publish all packages
npm run publish

# Publish specific package
cd packages/core
npm publish
```

## 🔧 Development Workflow

1. **Make changes** to any package in `packages/`
2. **Build** with `npm run build` to ensure everything compiles
3. **Test** your changes with the example apps
4. **Lint** and **type-check** with `npm run lint` and `npm run check-types`
5. **Commit** your changes

## 🚀 Features

- **🔄 Shared Core**: Common functionality across all SDKs
- **🎯 Platform-specific**: Each SDK optimized for its environment
- **📱 React Native**: Full Expo support with async storage
- **🌐 Web**: Browser APIs and localStorage integration
- **🖥️ Node.js**: File system and environment variable access
- **⚡ Turbo Repo**: Fast, cached builds and parallel execution
- **🎨 TypeScript**: Full type safety across all packages
- **🧩 Modular**: Use only what you need

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and ensure they pass
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
