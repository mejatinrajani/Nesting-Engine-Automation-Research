const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

export const API_BASE_URL = rawApiBaseUrl
  ? rawApiBaseUrl.replace(/\/+$/, "")
  : "http://127.0.0.1:8000";

export const buildApiUrl = (path: string) => `${API_BASE_URL}${path}`;
