export interface LiquidConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

export interface LiquidResponse<T = unknown> {
  data: T;
  success: boolean;
  error?: string;
}

export interface LiquidUser {
  id: string;
  email: string;
  name: string;
}
