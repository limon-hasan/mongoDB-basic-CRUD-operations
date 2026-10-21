const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim()

export const API_BASE_URL = configuredApiUrl
  ? configuredApiUrl.replace(/\/+$/, "")
  : "http://localhost:5000"

// Host shown in the UI without the protocol, e.g. "localhost:5000".
export const API_DISPLAY_HOST = API_BASE_URL.replace(/^https?:\/\//, "")
