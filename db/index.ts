// Comprehensive mock database exports - will be replaced by Swift server

// Generic mock function generator
const createMockFunction = (name: string) => {
  return async (...args: any[]) => {
    console.log(`Mock ${name} called with:`, args)
    return { id: `mock-${name}-id`, success: true }
  }
}

// Generic mock function that returns arrays with proper structure
const createMockArrayFunction = (name: string) => {
  return async (...args: any[]) => {
    console.log(`Mock ${name} called with:`, args)
    const key = name.split("get")[1].toLowerCase()
    return { [key]: [] }
  }
}

// Mock function for workspace data that returns proper structure
const createMockWorkspaceDataFunction = (name: string) => {
  return async (...args: any[]) => {
    console.log(`Mock ${name} called with:`, args)
    const key = name.split("get")[1].toLowerCase()
    return {
      [key]: [
        {
          id: "mock-id",
          name: "Mock Item",
          image_path: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
    }
  }
}

// Helper: mock array of items
const mockArray = (type: string) => {
  const baseItem = {
    id: "mock-id",
    name: "Mock Item",
    image_path: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  switch (type) {
    case "assistant":
      return [
        {
          ...baseItem,
          description: "Mock assistant description",
          instructions: "Mock assistant instructions",
          model: "gpt-4-1106-preview"
        }
      ]
    case "chat":
      return [
        {
          ...baseItem,
          workspace_id: "mock-workspace-id",
          assistant_id: "mock-assistant-id"
        }
      ]
    case "collection":
      return [
        {
          ...baseItem,
          description: "Mock collection description"
        }
      ]
    case "file":
      return [
        {
          ...baseItem,
          type: "text/plain",
          size: 1024,
          file_path: "/mock/file.txt"
        }
      ]
    case "folder":
      return [
        {
          ...baseItem,
          workspace_id: "mock-workspace-id"
        }
      ]
    case "model":
      return [
        {
          ...baseItem,
          description: "Mock model description",
          model_id: "mock-model-id",
          provider: "openai",
          hosted_id: "mock-hosted-id",
          platform_link: "https://mock-platform.com",
          image_input: false
        }
      ]
    case "preset":
      return [
        {
          ...baseItem,
          description: "Mock preset description",
          prompt: "Mock preset prompt",
          temperature: 0.5,
          context_length: 4096,
          model: "gpt-4-1106-preview"
        }
      ]
    case "prompt":
      return [
        {
          ...baseItem,
          content: "Mock prompt content"
        }
      ]
    case "tool":
      return [
        {
          ...baseItem,
          description: "Mock tool description",
          type: "function",
          config: {}
        }
      ]
    default:
      return [baseItem]
  }
}

// Export all commonly used functions as mocks
export const createAssistant = createMockFunction("createAssistant")
export const updateAssistant = createMockFunction("updateAssistant")
export const deleteAssistant = createMockFunction("deleteAssistant")
export const getAssistants = createMockFunction("getAssistants")
export const getAssistantWorkspacesByWorkspaceId = async (
  workspaceId?: string
) => [
  {
    id: "mock-assistant-id",
    name: "Mock Assistant",
    description: "Mock assistant description",
    instructions: "Mock assistant instructions",
    model: "gpt-4-1106-preview",
    image_path: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]
export const getAssistantWorkspacesByAssistantId = async (
  assistantId?: string
) => mockArray("assistant")
export const deleteAssistantWorkspace = createMockFunction(
  "deleteAssistantWorkspace"
)
export const createAssistantWorkspaces = createMockFunction(
  "createAssistantWorkspaces"
)

export const createChat = createMockFunction("createChat")
export const updateChat = createMockFunction("updateChat")
export const deleteChat = createMockFunction("deleteChat")
export const getChats = createMockFunction("getChats")
export const getChatsByWorkspaceId = async (workspaceId?: string) => [
  {
    id: "mock-chat-id",
    name: "Mock Chat",
    workspace_id: workspaceId || "mock-workspace-id",
    assistant_id: "mock-assistant-id",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]
export const getChatById = createMockFunction("getChatById")

export const createCollection = createMockFunction("createCollection")
export const updateCollection = createMockFunction("updateCollection")
export const deleteCollection = createMockFunction("deleteCollection")
export const getCollections = createMockFunction("getCollections")
export const getCollectionWorkspacesByWorkspaceId = async (
  workspaceId?: string
) => mockArray("collection")
export const getCollectionWorkspacesByCollectionId = async (
  collectionId?: string
) => mockArray("collection")
export const deleteCollectionWorkspace = createMockFunction(
  "deleteCollectionWorkspace"
)
export const createCollectionWorkspaces = createMockFunction(
  "createCollectionWorkspaces"
)

export const createFile = createMockFunction("createFile")
export const updateFile = createMockFunction("updateFile")
export const deleteFile = createMockFunction("deleteFile")
export const getFiles = createMockFunction("getFiles")
export const getFileWorkspacesByWorkspaceId = async (workspaceId?: string) =>
  mockArray("file")
export const getFileWorkspacesByFileId = async (fileId?: string) =>
  mockArray("file")
export const deleteFileWorkspace = createMockFunction("deleteFileWorkspace")
export const createFileWorkspaces = createMockFunction("createFileWorkspaces")
export const createFileBasedOnExtension = createMockFunction(
  "createFileBasedOnExtension"
)
export const createDocXFile = createMockFunction("createDocXFile")
export const processFile = createMockFunction("processFile")
export const processDocxFile = createMockFunction("processDocxFile")

export const createFolder = createMockFunction("createFolder")
export const updateFolder = createMockFunction("updateFolder")
export const deleteFolder = createMockFunction("deleteFolder")
export const getFolders = createMockFunction("getFolders")
export const getFoldersByWorkspaceId = async (workspaceId?: string) =>
  mockArray("folder")

export const createModel = createMockFunction("createModel")
export const updateModel = createMockFunction("updateModel")
export const deleteModel = createMockFunction("deleteModel")
export const getModels = createMockFunction("getModels")
export const getModelWorkspacesByWorkspaceId = async (workspaceId?: string) =>
  mockArray("model")
export const getModelWorkspacesByModelId = async (modelId?: string) =>
  mockArray("model")
export const deleteModelWorkspace = createMockFunction("deleteModelWorkspace")
export const createModelWorkspaces = createMockFunction("createModelWorkspaces")

export const createPreset = createMockFunction("createPreset")
export const updatePreset = createMockFunction("updatePreset")
export const deletePreset = createMockFunction("deletePreset")
export const getPresets = createMockFunction("getPresets")
export const getPresetWorkspacesByWorkspaceId = async (workspaceId?: string) =>
  mockArray("preset")
export const getPresetWorkspacesByPresetId = async (presetId?: string) =>
  mockArray("preset")
export const deletePresetWorkspace = createMockFunction("deletePresetWorkspace")
export const createPresetWorkspaces = createMockFunction(
  "createPresetWorkspaces"
)

export const createPrompt = createMockFunction("createPrompt")
export const updatePrompt = createMockFunction("updatePrompt")
export const deletePrompt = createMockFunction("deletePrompt")
export const getPrompts = createMockFunction("getPrompts")
export const getPromptWorkspacesByWorkspaceId = async (workspaceId?: string) =>
  mockArray("prompt")
export const getPromptWorkspacesByPromptId = async (promptId?: string) =>
  mockArray("prompt")
export const deletePromptWorkspace = createMockFunction("deletePromptWorkspace")
export const createPromptWorkspaces = createMockFunction(
  "createPromptWorkspaces"
)

export const createTool = createMockFunction("createTool")
export const updateTool = createMockFunction("updateTool")
export const deleteTool = createMockFunction("deleteTool")
export const getTools = createMockFunction("getTools")
export const getToolWorkspacesByWorkspaceId = async (workspaceId?: string) =>
  mockArray("tool")
export const getToolWorkspacesByToolId = async (toolId?: string) =>
  mockArray("tool")
export const deleteToolWorkspace = createMockFunction("deleteToolWorkspace")
export const createToolWorkspaces = createMockFunction("createToolWorkspaces")

export const createWorkspace = createMockFunction("createWorkspace")
export const updateWorkspace = createMockFunction("updateWorkspace")
export const deleteWorkspace = createMockFunction("deleteWorkspace")
export const getWorkspaces = createMockFunction("getWorkspaces")
export const getWorkspaceById = async (workspaceId?: string) => ({
  id: workspaceId || "mock-workspace-id",
  name: "Mock Workspace",
  default_model: "gpt-4-1106-preview",
  default_prompt: "You are a friendly, helpful AI assistant.",
  default_temperature: 0.5,
  default_context_length: 4096,
  include_profile_context: true,
  include_workspace_instructions: true,
  embeddings_provider: "local",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
})
export const getHomeWorkspaceByUserId = createMockFunction(
  "getHomeWorkspaceByUserId"
)
export const getWorkspacesByUserId = async (userId?: string) => [
  {
    id: "mock-workspace-id",
    user_id: userId || "mock-user-id",
    name: "Mock Workspace",
    is_home: true,
    default_model: "gpt-4-1106-preview",
    default_prompt: "You are a friendly, helpful AI assistant.",
    default_temperature: 0.5,
    default_context_length: 4096,
    include_profile_context: true,
    include_workspace_instructions: true,
    embeddings_provider: "local",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const updateProfile = createMockFunction("updateProfile")
export const getProfile = createMockFunction("getProfile")
export const getProfileByUserId = async (userId?: string) => ({
  id: userId || "mock-user-id",
  user_id: userId || "mock-user-id",
  username: "mockuser",
  has_onboarded: true,
  display_name: "Mock User",
  email: "mockuser@example.com",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
})

export const createMessages = createMockFunction("createMessages")
export const updateMessage = createMockFunction("updateMessage")
export const getMessages = createMockFunction("getMessages")
export const getMessagesByChatId = createMockFunction("getMessagesByChatId")
export const deleteMessagesIncludingAndAfter = createMockFunction(
  "deleteMessagesIncludingAndAfter"
)

export const createChatFiles = createMockFunction("createChatFiles")
export const getChatFiles = createMockFunction("getChatFiles")
export const getChatFilesByChatId = createMockFunction("getChatFilesByChatId")

export const createMessageFileItems = createMockFunction(
  "createMessageFileItems"
)
export const getMessageFileItems = createMockFunction("getMessageFileItems")
export const getMessageFileItemsByMessageId = createMockFunction(
  "getMessageFileItemsByMessageId"
)

export const createAssistantFiles = createMockFunction("createAssistantFiles")
export const createAssistantFile = createMockFunction("createAssistantFile")
export const getAssistantFiles = createMockFunction("getAssistantFiles")
export const getAssistantFilesByAssistantId = createMockFunction(
  "getAssistantFilesByAssistantId"
)
export const deleteAssistantFile = createMockFunction("deleteAssistantFile")

export const createAssistantCollections = createMockFunction(
  "createAssistantCollections"
)
export const createAssistantCollection = createMockFunction(
  "createAssistantCollection"
)
export const getAssistantCollections = createMockFunction(
  "getAssistantCollections"
)
export const getAssistantCollectionsByAssistantId = createMockFunction(
  "getAssistantCollectionsByAssistantId"
)
export const deleteAssistantCollection = createMockFunction(
  "deleteAssistantCollection"
)

export const createAssistantTools = createMockFunction("createAssistantTools")
export const createAssistantTool = createMockFunction("createAssistantTool")
export const getAssistantTools = createMockFunction("getAssistantTools")
export const getAssistantToolsByAssistantId = createMockFunction(
  "getAssistantToolsByAssistantId"
)
export const deleteAssistantTool = createMockFunction("deleteAssistantTool")

export const createCollectionFiles = createMockFunction("createCollectionFiles")
export const createCollectionFile = createMockFunction("createCollectionFile")
export const getCollectionFiles = createMockFunction("getCollectionFiles")
export const getCollectionFilesByCollectionId = createMockFunction(
  "getCollectionFilesByCollectionId"
)
export const deleteCollectionFile = createMockFunction("deleteCollectionFile")

// Storage functions
export const uploadFile = createMockFunction("uploadFile")
export const deleteFileFromStorage = createMockFunction("deleteFileFromStorage")
export const getFileFromStorage = async (...args: any[]) => {
  console.log("Mock getFileFromStorage called with:", args)
  return "mock-url"
}

export const uploadProfileImage = createMockFunction("uploadProfileImage")
export const uploadWorkspaceImage = createMockFunction("uploadWorkspaceImage")
export const getWorkspaceImageFromStorage = async (...args: any[]) => {
  console.log("Mock getWorkspaceImageFromStorage called with:", args)
  return "mock-url"
}
export const uploadAssistantImage = createMockFunction("uploadAssistantImage")
export const getAssistantImageFromStorage = async (...args: any[]) => {
  console.log("Mock getAssistantImageFromStorage called with:", args)
  return "mock-url"
}
export const uploadMessageImage = createMockFunction("uploadMessageImage")
export const getMessageImageFromStorage = async (...args: any[]) => {
  console.log("Mock getMessageImageFromStorage called with:", args)
  return "mock-url"
}

// Limits
export const PROFILE_USERNAME_MIN = 3
export const PROFILE_USERNAME_MAX = 20
export const PROFILE_DISPLAY_NAME_MAX = 50
export const PROFILE_CONTEXT_MAX = 4000
export const ASSISTANT_NAME_MAX = 100
export const ASSISTANT_DESCRIPTION_MAX = 500
export const ASSISTANT_INSTRUCTIONS_MAX = 32000
export const CHAT_NAME_MAX = 100
export const COLLECTION_NAME_MAX = 100
export const COLLECTION_DESCRIPTION_MAX = 500
export const FOLDER_NAME_MAX = 100
export const FILE_NAME_MAX = 100
export const FILE_DESCRIPTION_MAX = 500
export const PRESET_NAME_MAX = 100
export const PRESET_DESCRIPTION_MAX = 500
export const PROMPT_NAME_MAX = 100
export const PROMPT_CONTENT_MAX = 32000
export const TOOL_NAME_MAX = 100
export const TOOL_DESCRIPTION_MAX = 500
export const MODEL_NAME_MAX = 100
export const MODEL_DESCRIPTION_MAX = 500
export const WORKSPACE_INSTRUCTIONS_MAX = 4000
