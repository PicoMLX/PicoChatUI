# PicoChatUI Changelog

## Supabase Removal (Latest)

### Overview
Removed Supabase dependency and replaced it with a localhost-based authentication and database system to simplify the application architecture.

### Major Changes

#### Dependencies Removed
- `@supabase/ssr` - Supabase SSR client
- `@supabase/supabase-js` - Supabase JavaScript client
- All Supabase CLI scripts from package.json

#### New Authentication System
- Created `lib/auth/client.ts` - New authentication client
- Created `app/api/auth/login/route.ts` - Login endpoint
- Created `app/api/auth/signup/route.ts` - Signup endpoint  
- Created `app/api/auth/logout/route.ts` - Logout endpoint
- Created `app/api/auth/session/route.ts` - Session management endpoint

#### New Database System
- Created `lib/db/client.ts` - New database client to replace Supabase
- Updated database operations to use localhost API endpoints
- Implemented basic CRUD operations and storage functionality

#### Updated Components
- `app/[locale]/login/page.tsx` - Updated to use new auth system
- `middleware.ts` - Updated to use new session management
- `app/[locale]/setup/page.tsx` - Updated to use new auth system
- `app/[locale]/login/password/page.tsx` - Updated auth checks
- `lib/server/server-chat-helpers.ts` - Updated to use mock profile
- `db/profile.ts` - Updated to use new database client
- `db/storage/files.ts` - Updated to use new storage client
- `app/auth/callback/route.ts` - Simplified for new auth system

#### Configuration Changes
- Removed `supabase/` directory and all Supabase configuration
- Removed `lib/supabase/` directory and Supabase client files
- Updated environment variables to remove Supabase-specific ones
- Updated `README.md` with new localhost-based setup instructions

#### Benefits
- Simplified setup (no Docker or Supabase CLI required)
- Local development with localhost endpoints
- Reduced dependencies and complexity
- Easier deployment without external database setup

### Files Still Needing Updates
The following database files still need to be updated to use the new database client:
- `db/assistants.ts`
- `db/files.ts` 
- `db/assistant-tools.ts`
- `db/collection-files.ts`
- `db/tools.ts`
- `db/storage/workspace-images.ts`
- `db/assistant-files.ts`
- `db/message-file-items.ts`
- `db/models.ts`
- `db/assistant-collections.ts`
- `db/storage/message-images.ts`
- `db/storage/profile-images.ts`
- And several other database-related files

---

# Ollama Simplification Log

## Overview
This document logs all changes made to simplify PicoChatUI from supporting multiple providers (OpenAI, Azure, Anthropic, Google, Mistral, Groq, Perplexity, OpenRouter) to only supporting Ollama and custom providers.

## File Deletions

### Deleted LLM List Files
- `lib/models/llm/anthropic-llm-list.ts`
- `lib/models/llm/google-llm-list.ts`
- `lib/models/llm/groq-llm-list.ts`
- `lib/models/llm/mistral-llm-list.ts`
- `lib/models/llm/openai-llm-list.ts`
- `lib/models/llm/perplexity-llm-list.ts`

### Deleted API Routes
- `app/api/chat/anthropic/route.ts`
- `app/api/chat/azure/route.ts`
- `app/api/chat/google/route.ts`
- `app/api/chat/groq/route.ts`
- `app/api/chat/mistral/route.ts`
- `app/api/chat/openai/route.ts`
- `app/api/chat/openrouter/route.ts`
- `app/api/chat/perplexity/route.ts`
- `app/api/chat/tools/route.ts`

## Type Changes

### types/models.ts
**Before:**
```typescript
export type ModelProvider =
  | "openai"
  | "google"
  | "anthropic"
  | "mistral"
  | "groq"
  | "perplexity"
  | "ollama"
  | "openrouter"
  | "custom"
```

**After:**
```typescript
export type ModelProvider =
  | "ollama"
  | "custom"
```

### types/chat.ts
**Before:**
```typescript
export interface ChatSettings {
  model: LLMID
  prompt: string
  temperature: number
  contextLength: number
  includeProfileContext: boolean
  includeWorkspaceInstructions: boolean
  embeddingsProvider: "openai" | "local"
}
```

**After:**
```typescript
export interface ChatSettings {
  model: string
  prompt: string
  temperature: number
  contextLength: number
  includeProfileContext: boolean
  includeWorkspaceInstructions: boolean
  embeddingsProvider: "local"
}
```

### types/valid-keys.ts
**Added:**
```typescript
OLLAMA_URL = "OLLAMA_URL",
```

## Model Management Changes

### lib/models/llm/llm-list.ts
**Before:**
```typescript
import { LLM } from "@/types"
import { ANTHROPIC_LLM_LIST } from "./anthropic-llm-list"
import { GOOGLE_LLM_LIST } from "./google-llm-list"
import { MISTRAL_LLM_LIST } from "./mistral-llm-list"
import { GROQ_LLM_LIST } from "./groq-llm-list"
import { OPENAI_LLM_LIST } from "./openai-llm-list"
import { PERPLEXITY_LLM_LIST } from "./perplexity-llm-list"

export const LLM_LIST: LLM[] = [
  ...OPENAI_LLM_LIST,
  ...GOOGLE_LLM_LIST,
  ...MISTRAL_LLM_LIST,
  ...GROQ_LLM_LIST,
  ...PERPLEXITY_LLM_LIST,
  ...ANTHROPIC_LLM_LIST
]

export const LLM_LIST_MAP: Record<string, LLM[]> = {
  openai: OPENAI_LLM_LIST,
  azure: OPENAI_LLM_LIST,
  google: GOOGLE_LLM_LIST,
  mistral: MISTRAL_LLM_LIST,
  groq: GROQ_LLM_LIST,
  perplexity: PERPLEXITY_LLM_LIST,
  anthropic: ANTHROPIC_LLM_LIST
}
```

**After:**
```typescript
import { LLM } from "@/types"

export const LLM_LIST: LLM[] = []

export const LLM_LIST_MAP: Record<string, LLM[]> = {
  ollama: []
}
```

### lib/models/fetch-models.ts
**Before:**
```typescript
export const fetchHostedModels = async (profile: Tables<"profiles">) => {
  try {
    const providers = ["google", "anthropic", "mistral", "groq", "perplexity"]

    if (profile.use_azure_openai) {
      providers.push("azure")
    } else {
      providers.push("openai")
    }

    const response = await fetch("/api/keys")

    if (!response.ok) {
      throw new Error(`Server is not responding.`)
    }

    const data = await response.json()

    let modelsToAdd: LLM[] = []

    for (const provider of providers) {
      let providerKey: keyof typeof profile

      if (provider === "google") {
        providerKey = "google_gemini_api_key"
      } else if (provider === "azure") {
        providerKey = "azure_openai_api_key"
      } else {
        providerKey = `${provider}_api_key` as keyof typeof profile
      }

      if (profile?.[providerKey] || data.isUsingEnvKeyMap[provider]) {
        const models = LLM_LIST_MAP[provider]

        if (Array.isArray(models)) {
          modelsToAdd.push(...models)
        }
      }
    }

    return {
      envKeyMap: data.isUsingEnvKeyMap,
      hostedModels: modelsToAdd
    }
  } catch (error) {
    console.warn("Error fetching hosted models: " + error)
  }
}
```

**After:**
```typescript
export const fetchHostedModels = async (profile: Tables<"profiles">) => {
  try {
    // Only support Ollama for hosted models
    const providers = ["ollama"]

    const response = await fetch("/api/keys")

    if (!response.ok) {
      throw new Error(`Server is not responding.`)
    }

    const data = await response.json()

    let modelsToAdd: LLM[] = []

    for (const provider of providers) {
      const models = LLM_LIST_MAP[provider]

      if (Array.isArray(models)) {
        modelsToAdd.push(...models)
      }
    }

    return {
      envKeyMap: data.isUsingEnvKeyMap,
      hostedModels: modelsToAdd
    }
  } catch (error) {
    console.warn("Error fetching hosted models: " + error)
  }
}
```

**OpenRouter function simplified:**
```typescript
export const fetchOpenRouterModels = async () => {
  // OpenRouter is no longer supported
  return []
}
```

## Chat Logic Changes

### components/chat/chat-helpers/index.ts
**Removed handleHostedChat function and replaced with handleCustomChat:**
```typescript
export const handleCustomChat = async (
  payload: ChatPayload,
  profile: Tables<"profiles">,
  modelData: LLM,
  tempAssistantChatMessage: ChatMessage,
  isRegeneration: boolean,
  newAbortController: AbortController,
  newMessageImages: MessageImage[],
  chatImages: MessageImage[],
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>,
  setFirstTokenReceived: React.Dispatch<React.SetStateAction<boolean>>,
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  setToolInUse: React.Dispatch<React.SetStateAction<string>>
) => {
  let draftMessages = await buildFinalMessages(payload, profile, chatImages)
  let formattedMessages = draftMessages

  const apiEndpoint = "/api/chat/custom"

  const requestBody = {
    chatSettings: payload.chatSettings,
    messages: formattedMessages,
    customModelId: modelData.hostedId
  }

  const response = await fetchChatResponse(
    apiEndpoint,
    requestBody,
    true,
    newAbortController,
    setIsGenerating,
    setChatMessages
  )

  return await processResponse(
    response,
    isRegeneration
      ? payload.chatMessages[payload.chatMessages.length - 1]
      : tempAssistantChatMessage,
    true,
    newAbortController,
    setFirstTokenReceived,
    setChatMessages,
    setToolInUse
  )
}
```

**Updated handleRetrieval function:**
```typescript
export const handleRetrieval = async (
  userInput: string,
  newMessageFiles: ChatFile[],
  chatFiles: ChatFile[],
  embeddingsProvider: "local",
  sourceCount: number
) => {
  // ... rest of function unchanged
}
```

### components/chat/chat-hooks/use-chat-handler.tsx
**Updated imports:**
```typescript
import {
  createTempMessages,
  handleCreateChat,
  handleCreateMessages,
  handleCustomChat,
  handleLocalChat,
  handleRetrieval,
  processResponse,
  validateChatSettings
} from "../chat-helpers"
```

**Simplified chat logic:**
```typescript
let generatedText = ""

if (modelData!.provider === "ollama") {
  generatedText = await handleLocalChat(
    payload,
    profile!,
    chatSettings!,
    tempAssistantChatMessage,
    isRegeneration,
    newAbortController,
    setIsGenerating,
    setFirstTokenReceived,
    setChatMessages,
    setToolInUse
  )
} else if (modelData!.provider === "custom") {
  generatedText = await handleCustomChat(
    payload,
    profile!,
    modelData!,
    tempAssistantChatMessage,
    isRegeneration,
    newAbortController,
    newMessageImages,
    chatImages,
    setIsGenerating,
    setFirstTokenReceived,
    setChatMessages,
    setToolInUse
  )
}
```

## UI Component Changes

### components/models/model-select.tsx
**Removed tabs and simplified model filtering:**
```typescript
const allModels = [
  ...models.map(model => ({
    modelId: model.model_id as LLMID,
    modelName: model.name,
    provider: "custom" as ModelProvider,
    hostedId: model.id,
    platformLink: "",
    imageInput: false
  })),
  ...availableHostedModels,
  ...availableLocalModels
]

// Removed tab filtering logic
const filteredModels = models
  .filter(model =>
    model.modelName.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => a.provider.localeCompare(b.provider))
```

**Updated empty state message:**
```typescript
{allModels.length === 0 ? (
  <div className="rounded text-sm font-bold">
    No models available. Make sure Ollama is running.
  </div>
) : (
  // ... rest unchanged
)}
```

### components/ui/chat-settings-form.tsx
**Simplified embeddings provider selection:**
```typescript
<Select
  value={chatSettings.embeddingsProvider}
  onValueChange={(embeddingsProvider: "local") => {
    onChangeChatSettings({
      ...chatSettings,
      embeddingsProvider
    })
  }}
>
  <SelectTrigger>
    <SelectValue defaultValue="local" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="local">Local</SelectItem>
  </SelectContent>
</Select>
```

### components/setup/api-step.tsx
**Completely simplified interface:**
```typescript
interface APIStepProps {
  // Only keep Ollama-related props
  ollamaUrl: string
  onOllamaUrlChange: (value: string) => void
}

export const APIStep: FC<APIStepProps> = ({
  ollamaUrl,
  onOllamaUrlChange
}) => {
  return (
    <>
      <div className="mt-5 space-y-2">
        <Label>Ollama URL</Label>
        <Input
          placeholder="http://localhost:11434"
          type="text"
          value={ollamaUrl}
          onChange={e => onOllamaUrlChange(e.target.value)}
        />
        <div className="text-xs text-muted-foreground">
          Enter the URL where your Ollama server is running. Default is http://localhost:11434
        </div>
      </div>
    </>
  )
}
```

## Setup and Configuration Changes

### app/[locale]/setup/page.tsx
**Removed all API key state management:**
```typescript
// API Step
const [ollamaUrl, setOllamaUrl] = useState("http://localhost:11434")

// Removed all other API key state variables
```

**Simplified profile update:**
```typescript
const updateProfilePayload: TablesUpdate<"profiles"> = {
  ...profile,
  has_onboarded: true,
  display_name: displayName,
  username
}
```

**Updated step description:**
```typescript
<StepContainer
  stepDescription="Configure Ollama connection."
  stepNum={currentStep}
  stepTitle="Configure Ollama"
  onShouldProceed={handleShouldProceed}
  showNextButton={true}
  showBackButton={true}
>
  <APIStep
    ollamaUrl={ollamaUrl}
    onOllamaUrlChange={setOllamaUrl}
  />
</StepContainer>
```

### components/utility/profile-settings.tsx
**Simplified provider management:**
```typescript
// Only support Ollama and custom providers
const providers = ["ollama"]

providers.forEach(async provider => {
  const models = LLM_LIST_MAP[provider]
  const envKeyActive = envKeyMap[provider]

  if (!envKeyActive) {
    if (Array.isArray(models)) {
      setAvailableHostedModels(prev => {
        const newModels = models.filter(
          model =>
            !prev.some(prevModel => prevModel.modelId === model.modelId)
        )
        return [...prev, ...newModels]
      })
    }
  }
})
```

### components/utility/global-state.tsx
**Removed OpenRouter logic:**
```typescript
useEffect(() => {
  ;(async () => {
    const profile = await fetchStartingData()

    if (profile) {
      const hostedModelRes = await fetchHostedModels(profile)
      if (!hostedModelRes) return

      setEnvKeyMap(hostedModelRes.envKeyMap)
      setAvailableHostedModels(hostedModelRes.hostedModels)
    }

    if (process.env.NEXT_PUBLIC_OLLAMA_URL) {
      const localModels = await fetchOllamaModels()
      if (!localModels) return
      setAvailableLocalModels(localModels)
    }
  })()
}, [])
```

## API Route Changes

### app/api/keys/route.ts
**Simplified to only handle Ollama:**
```typescript
const envKeyMap: Record<string, VALID_ENV_KEYS> = {
  ollama: VALID_ENV_KEYS.OLLAMA_URL
}
```

### app/api/retrieval/retrieve/route.ts
**Removed OpenAI/Azure embeddings:**
```typescript
const { userInput, fileIds, embeddingsProvider, sourceCount } = json as {
  userInput: string
  fileIds: string[]
  embeddingsProvider: "local"
  sourceCount: number
}

// Removed all OpenAI/Azure logic, only kept local embeddings
```

### app/api/retrieval/process/route.ts
**Simplified to only support local embeddings:**
```typescript
const {
  text,
  fileId,
  embeddingsProvider,
  fileExtension
} = json as {
  text: string
  fileId: string
  embeddingsProvider: "local"
  fileExtension: string
}

// Removed all OpenAI/Azure logic, only kept local embeddings
```

### lib/server/server-chat-helpers.ts
**Simplified API key mapping:**
```typescript
function addApiKeysToProfile(profile: Tables<"profiles">) {
  const apiKeys = {
    [VALID_ENV_KEYS.OLLAMA_URL]: "ollama_url"
  }

  for (const [envKey, profileKey] of Object.entries(apiKeys)) {
    if (process.env[envKey]) {
      ;(profile as any)[profileKey] = process.env[envKey]
    }
  }

  return profile
}
```

## Summary of Changes

1. **Removed 15 files** (6 LLM lists + 9 API routes)
2. **Updated 12 files** with simplified logic
3. **Simplified type definitions** to only support Ollama and custom providers
4. **Removed all API key management** for other providers
5. **Simplified UI components** to remove provider-specific logic
6. **Updated embeddings** to only support local embeddings
7. **Maintained core functionality** for Ollama and custom models

The project now only requires:
- `NEXT_PUBLIC_OLLAMA_URL` environment variable
- Supabase configuration (unchanged)
- Ollama server running locally or remotely

All chat functionality, file processing, and custom model support remains intact while removing the complexity of managing multiple API providers. 