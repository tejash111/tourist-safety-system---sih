// Tourist ID for demo purposes - in a real app this would come from authentication
// Using the actual tourist ID from storage
export const TOURIST_ID = "DTI-IN-2024-001847";

// WebSocket connection URL
export const getWebSocketUrl = () => {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}/ws`;
};

// Risk level colors
export const RISK_COLORS = {
  safe: "#10b981", // green-500
  moderate: "#f59e0b", // amber-500
  high: "#ef4444", // red-500
} as const;

// Emergency numbers
export const EMERGENCY_NUMBERS = {
  police: "100",
  medical: "108",
  fire: "101",
  tourist_helpline: "1363",
} as const;

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "as", name: "অসমীয়া" },
  { code: "bn", name: "বাংলা" },
  { code: "kha", name: "Khasi" },
  { code: "garo", name: "Garo" },
] as const;

// App version
export const APP_VERSION = {
  version: "1.2.3",
  build: 45,
} as const;
