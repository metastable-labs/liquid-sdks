import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import {
  LiquidRNProvider,
  useLiquidRNUser,
  useLiquidRN,
} from "@liquid/react-native-sdk";

function UserInfoCard() {
  const { user, loading, error } = useLiquidRNUser();

  if (loading) {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>User Information</Text>
        <Text style={styles.loadingText}>Loading user...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>User Information</Text>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>User Information</Text>
        <Text style={styles.infoText}>No user data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>User Information</Text>
      <Text style={styles.infoText}>ID: {user.id}</Text>
      <Text style={styles.infoText}>Name: {user.name}</Text>
      <Text style={styles.infoText}>Email: {user.email}</Text>
    </View>
  );
}

function SDKDemo() {
  const sdk = useLiquidRN();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [platformInfo, setPlatformInfo] = useState<any>(null);

  const handleSayHello = async () => {
    setLoading(true);
    try {
      const response = await sdk.sayHello();
      if (response.success) {
        setMessage(response.data);
      } else {
        Alert.alert("Error", response.error || "Failed to say hello");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while saying hello");
    } finally {
      setLoading(false);
    }
  };

  const handleGetPlatformInfo = () => {
    const info = sdk.getPlatformInfo();
    setPlatformInfo(info);
  };

  const handleStorageDemo = async () => {
    try {
      // Set a value
      await sdk.setStorageItem("demo_key", "Hello from Liquid RN SDK!");

      // Get the value
      const value = await sdk.getStorageItem("demo_key");

      Alert.alert("Storage Demo", `Stored and retrieved: ${value}`);
    } catch (error) {
      Alert.alert("Storage Error", "Failed to demo storage");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.title}>Liquid React Native SDK Demo</Text>

      <UserInfoCard />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>SDK Actions</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSayHello}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Loading..." : "Say Hello"}
          </Text>
        </TouchableOpacity>

        {message && (
          <View style={styles.messageContainer}>
            <Text style={styles.successText}>{message}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleGetPlatformInfo}>
          <Text style={styles.buttonText}>Get Platform Info</Text>
        </TouchableOpacity>

        {platformInfo && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>OS: {platformInfo.os}</Text>
            <Text style={styles.infoText}>Version: {platformInfo.version}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleStorageDemo}>
          <Text style={styles.buttonText}>Test Storage</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>About</Text>
        <Text style={styles.infoText}>
          This app demonstrates the Liquid React Native SDK with:
        </Text>
        <Text style={styles.bulletText}>
          • React Native hooks for data fetching
        </Text>
        <Text style={styles.bulletText}>
          • Context provider for SDK initialization
        </Text>
        <Text style={styles.bulletText}>• AsyncStorage integration</Text>
        <Text style={styles.bulletText}>• Platform-specific information</Text>
        <Text style={styles.bulletText}>• TypeScript support</Text>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

export default function App() {
  return (
    <LiquidRNProvider config={{ apiKey: "demo-rn-api-key" }}>
      <SDKDemo />
    </LiquidRNProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingText: {
    color: "#007AFF",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 16,
    textAlign: "center",
  },
  successText: {
    color: "#34C759",
    fontSize: 16,
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#666",
  },
  bulletText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
    marginLeft: 10,
  },
  messageContainer: {
    backgroundColor: "#E8F5E8",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: "#F0F8FF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
