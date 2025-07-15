import { VALID_ENV_KEYS } from "@/types/valid-keys"
import { cookies } from "next/headers"

export async function getServerProfile() {
  // For now, return a mock profile
  // In a real implementation, you'd get the user from the session and fetch their profile
  const mockProfile = {
    id: "mock-profile-id",
    user_id: "e9fc7e46-a8a5-4fd4-8ba7-af485013e6fa",
    bio: "Mock user bio",
    has_onboarded: true,
    image_url: "",
    image_path: "",
    profile_context: "Mock profile context",
    display_name: "Mock User",
    use_azure_openai: false,
    username: "mockuser",
    anthropic_api_key: "",
    azure_openai_35_turbo_id: "",
    azure_openai_45_turbo_id: "",
    azure_openai_45_vision_id: "",
    azure_openai_api_key: "",
    azure_openai_endpoint: "",
    google_gemini_api_key: "",
    mistral_api_key: "",
    openai_api_key: "",
    openai_organization_id: "",
    perplexity_api_key: "",
    groq_api_key: "",
    openrouter_api_key: ""
  }

  const profileWithKeys = addApiKeysToProfile(mockProfile)

  return profileWithKeys
}

function addApiKeysToProfile(profile: any) {
  Object.values(VALID_ENV_KEYS).forEach((envKey: string) => {
    const profileKey = envKey.toLowerCase().replace(/_/g, "_")
    if (process.env[envKey]) {
      ;(profile as any)[profileKey] = process.env[envKey]
    }
  })

  return profile
}

export function checkApiKey(apiKey: string | null, keyName: string) {
  if (apiKey === null || apiKey === "") {
    throw new Error(`${keyName} API Key not found`)
  }
}
