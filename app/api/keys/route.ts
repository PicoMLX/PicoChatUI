import { isUsingEnvironmentKey } from "@/lib/envs"
import { createResponse } from "@/lib/server/server-utils"
import { EnvKey } from "@/types/key-type"
import { VALID_ENV_KEYS } from "@/types/valid-keys"

export async function GET() {
  const envKeyMap: Record<string, VALID_ENV_KEYS> = {
    ollama: VALID_ENV_KEYS.OLLAMA_URL
  }

  const isUsingEnvKeyMap = Object.keys(envKeyMap).reduce<
    Record<string, boolean>
  >((acc, provider) => {
    const key = envKeyMap[provider]

    if (key) {
      acc[provider] = isUsingEnvironmentKey(key as EnvKey)
    }
    return acc
  }, {})

  return createResponse({ isUsingEnvKeyMap }, 200)
}
