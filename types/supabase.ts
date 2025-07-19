// Mock Supabase types for static build
export interface TablesData {
  assistants: {
    id: string
    name: string
    description?: string
    instructions?: string
    model: string
    image_path?: string
    created_at: string
    updated_at: string
  }
  chats: {
    id: string
    name: string
    workspace_id: string
    assistant_id?: string
    created_at: string
    updated_at: string
  }
  collections: {
    id: string
    name: string
    description?: string
    created_at: string
    updated_at: string
  }
  files: {
    id: string
    name: string
    type: string
    size: number
    file_path: string
    created_at: string
    updated_at: string
  }
  folders: {
    id: string
    name: string
    workspace_id: string
    created_at: string
    updated_at: string
  }
  messages: {
    id: string
    chat_id: string
    role: string
    content: string
    created_at: string
    updated_at: string
  }
  models: {
    id: string
    name: string
    description?: string
    model_id: string
    provider: string
    hosted_id: string
    platform_link: string
    image_input: boolean
    created_at: string
    updated_at: string
  }
  presets: {
    id: string
    name: string
    description?: string
    prompt: string
    temperature: number
    context_length: number
    model: string
    created_at: string
    updated_at: string
  }
  prompts: {
    id: string
    name: string
    content: string
    created_at: string
    updated_at: string
  }
  tools: {
    id: string
    name: string
    description?: string
    type: string
    config: any
    created_at: string
    updated_at: string
  }
  workspaces: {
    id: string
    name: string
    default_model: string
    default_prompt: string
    default_temperature: number
    default_context_length: number
    include_profile_context: boolean
    include_workspace_instructions: boolean
    embeddings_provider: string
    created_at: string
    updated_at: string
  }
  profiles: {
    id: string
    user_id: string
    username: string
    display_name?: string
    email?: string
    has_onboarded: boolean
    created_at: string
    updated_at: string
  }
  file_items: {
    id: string
    file_id: string
    content: string
    tokens: number
    created_at: string
    updated_at: string
  }
}

export type Tables<T extends keyof TablesData> = TablesData[T]
export type TablesInsert<T extends keyof TablesData> = TablesData[T]
export type TablesUpdate<T extends keyof TablesData> = Partial<TablesData[T]>
