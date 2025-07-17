export const formatApiKey = (apiKey: string): string => {
  if (apiKey.length <= 8) return apiKey;
  return `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`;
};

export const isValidApiKey = (apiKey: string): boolean => {
  return typeof apiKey === "string" && apiKey.length > 0;
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const version = "1.0.0";
