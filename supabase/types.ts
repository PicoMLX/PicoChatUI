// Database types for compatibility during transition to Swift backend
// These types mirror the database schema structure

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow
        Insert: ProfileInsert
        Update: ProfileUpdate
      }
      workspaces: {
        Row: WorkspaceRow
        Insert: WorkspaceInsert
        Update: WorkspaceUpdate
      }
      chats: {
        Row: ChatRow
        Insert: ChatInsert
        Update: ChatUpdate
      }
      messages: {
        Row: MessageRow
        Insert: MessageInsert
        Update: MessageUpdate
      }
      files: {
        Row: FileRow
        Insert: FileInsert
        Update: FileUpdate
      }
      assistants: {
        Row: AssistantRow
        Insert: AssistantInsert
        Update: AssistantUpdate
      }
      collections: {
        Row: CollectionRow
        Insert: CollectionInsert
        Update: CollectionUpdate
      }
      tools: {
        Row: ToolRow
        Insert: ToolInsert
        Update: ToolUpdate
      }
      prompts: {
        Row: PromptRow
        Insert: PromptInsert
        Update: PromptUpdate
      }
      presets: {
        Row: PresetRow
        Insert: PresetInsert
        Update: PresetUpdate
      }
      models: {
        Row: ModelRow
        Insert: ModelInsert
        Update: ModelUpdate
      }
      folders: {
        Row: FolderRow
        Insert: FolderInsert
        Update: FolderUpdate
      }
      collection_files: {
        Row: CollectionFileRow
        Insert: CollectionFileInsert
        Update: CollectionFileUpdate
      }
      chat_files: {
        Row: ChatFileRow
        Insert: ChatFileInsert
        Update: ChatFileUpdate
      }
      file_items: {
        Row: FileItemRow
        Insert: FileItemInsert
        Update: FileItemUpdate
      }
    }
  }
}

// API Response Types for database client responses
export interface AssistantFilesResponse {
  data: {
    files: FileRow[]
  }
}

export interface AssistantCollectionsResponse {
  data: {
    collections: CollectionRow[]
  }
}

export interface AssistantToolsResponse {
  data: {
    tools: ToolRow[]
  }
}

export interface CollectionFilesResponse {
  data: {
    files: FileRow[]
  }
}

export interface MessageFileItemsResponse {
  data: {
    file_items: FileItemRow[]
  }
}

export interface ChatFilesResponse {
  data: {
    files: FileRow[]
  }
}

// Table row types
export interface ProfileRow {
  id: string
  user_id: string
  created_at: string
  updated_at: string
  display_name: string
  username: string
  bio: string
  profile_context: string
  has_onboarded: boolean
  image_url: string
  image_path: string
  anthropic_api_key: string
  azure_openai_35_turbo_id: string
  azure_openai_45_turbo_id: string
  azure_openai_45_vision_id: string
  azure_openai_api_key: string
  azure_openai_endpoint: string
  azure_openai_embeddings_id: string
  google_gemini_api_key: string
  mistral_api_key: string
  openai_api_key: string
  openai_organization_id: string
  perplexity_api_key: string
  groq_api_key: string
  openrouter_api_key: string
  use_azure_openai: boolean
}

export interface WorkspaceRow {
  id: string
  user_id: string
  created_at: string
  updated_at: string
  name: string
  description: string
  instructions: string
  image_url: string
  image_path: string
  is_home: boolean
  include_profile_context: boolean
  include_workspace_instructions: boolean
  default_context_length: number
  default_model: string
  default_prompt: string
  default_temperature: number
  embeddings_provider: string
}

export interface ChatRow {
  id: string
  user_id: string
  workspace_id: string
  assistant_id: string | null
  folder_id: string | null
  created_at: string
  updated_at: string
  name: string
  context_length: number
  embeddings_provider: string
  include_profile_context: boolean
  include_workspace_instructions: boolean
  model: string
  prompt: string
  temperature: number
}

export interface MessageRow {
  id: string
  user_id: string
  chat_id: string
  assistant_id: string | null
  created_at: string
  updated_at: string
  content: string
  role: string
  model: string
  sequence_number: number
  image_paths: string[]
}

export interface FileRow {
  id: string
  user_id: string
  folder_id: string | null
  created_at: string
  updated_at: string
  name: string
  description: string
  file_path: string
  size: number
  tokens: number
  type: string
}

export interface AssistantRow {
  id: string
  user_id: string
  folder_id: string | null
  created_at: string
  updated_at: string
  name: string
  description: string
  instructions: string | null
  image_url: string | null
  image_path: string
  context_length: number
  embeddings_provider: string
  include_profile_context: boolean
  include_workspace_instructions: boolean
  model: string
  prompt: string
  temperature: number
}

export interface CollectionRow {
  id: string
  user_id: string
  folder_id: string | null
  created_at: string
  updated_at: string
  name: string
  description: string
}

export interface ToolRow {
  id: string
  user_id: string
  folder_id: string | null
  created_at: string
  updated_at: string
  name: string
  description: string
  url: string
  custom_headers: any
  schema: any
}

export interface PromptRow {
  id: string
  user_id: string
  folder_id: string | null
  created_at: string
  updated_at: string
  name: string
  content: string
}

export interface PresetRow {
  id: string
  user_id: string
  folder_id: string | null
  created_at: string
  updated_at: string
  name: string
  description: string
  context_length: number
  embeddings_provider: string
  include_profile_context: boolean
  include_workspace_instructions: boolean
  model: string
  prompt: string
  temperature: number
}

export interface ModelRow {
  id: string
  user_id: string
  folder_id: string | null
  created_at: string
  updated_at: string
  name: string
  model_id: string
  description: string
  api_key: string
  base_url: string
  context_length: number
}

export interface FolderRow {
  id: string
  user_id: string
  workspace_id: string
  created_at: string
  updated_at: string
  name: string
  description: string
  type: string
}

export interface FileItemRow {
  id: string
  user_id: string
  file_id: string
  created_at: string
  updated_at: string
  content: string
  tokens: number
  embedding: number[]
}

export interface CollectionFileRow {
  id: string
  user_id: string
  collection_id: string
  file_id: string
  created_at: string
  updated_at: string
}

export interface ChatFileRow {
  id: string
  user_id: string
  chat_id: string
  file_id: string
  created_at: string
  updated_at: string
}

// Insert types (typically optional id, created_at, updated_at)
export type ProfileInsert = Omit<ProfileRow, 'id' | 'created_at' | 'updated_at'>
export type WorkspaceInsert = Omit<WorkspaceRow, 'id' | 'created_at' | 'updated_at'>
export type ChatInsert = Omit<ChatRow, 'id' | 'created_at' | 'updated_at'>
export type MessageInsert = Omit<MessageRow, 'id' | 'created_at' | 'updated_at'>
export type FileInsert = Omit<FileRow, 'id' | 'created_at' | 'updated_at'>
export type AssistantInsert = Omit<AssistantRow, 'id' | 'created_at' | 'updated_at'>
export type CollectionInsert = Omit<CollectionRow, 'id' | 'created_at' | 'updated_at'>
export type ToolInsert = Omit<ToolRow, 'id' | 'created_at' | 'updated_at'>
export type PromptInsert = Omit<PromptRow, 'id' | 'created_at' | 'updated_at'>
export type PresetInsert = Omit<PresetRow, 'id' | 'created_at' | 'updated_at'>
export type ModelInsert = Omit<ModelRow, 'id' | 'created_at' | 'updated_at'>
export type FolderInsert = Omit<FolderRow, 'id' | 'created_at' | 'updated_at'>
export type FileItemInsert = Omit<FileItemRow, 'id' | 'created_at' | 'updated_at'>
export type CollectionFileInsert = Omit<CollectionFileRow, 'id' | 'created_at' | 'updated_at'>
export type ChatFileInsert = Omit<ChatFileRow, 'id' | 'created_at' | 'updated_at'>

// Update types (all fields optional except for id and created_at)
export type ProfileUpdate = Partial<Omit<ProfileRow, 'id' | 'created_at'>>
export type WorkspaceUpdate = Partial<Omit<WorkspaceRow, 'id' | 'created_at'>>
export type ChatUpdate = Partial<Omit<ChatRow, 'id' | 'created_at'>>
export type MessageUpdate = Partial<Omit<MessageRow, 'id' | 'created_at'>>
export type FileUpdate = Partial<Omit<FileRow, 'id' | 'created_at'>>
export type AssistantUpdate = Partial<Omit<AssistantRow, 'id' | 'created_at'>>
export type CollectionUpdate = Partial<Omit<CollectionRow, 'id' | 'created_at'>>
export type ToolUpdate = Partial<Omit<ToolRow, 'id' | 'created_at'>>
export type PromptUpdate = Partial<Omit<PromptRow, 'id' | 'created_at'>>
export type PresetUpdate = Partial<Omit<PresetRow, 'id' | 'created_at'>>
export type ModelUpdate = Partial<Omit<ModelRow, 'id' | 'created_at'>>
export type FolderUpdate = Partial<Omit<FolderRow, 'id' | 'created_at'>>
export type FileItemUpdate = Partial<Omit<FileItemRow, 'id' | 'created_at'>>
export type CollectionFileUpdate = Partial<Omit<CollectionFileRow, 'id' | 'created_at'>>
export type ChatFileUpdate = Partial<Omit<ChatFileRow, 'id' | 'created_at'>>

// Helper types for easy access
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']