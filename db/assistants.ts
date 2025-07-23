import { dbClient } from "@/lib/db/client"
import { apiGet, apiPost, apiPut, apiDelete, withAuth } from "@/lib/api/client"
import { AssistantRow, WorkspaceRow } from "@/supabase/types"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

// Assistant Workspace interface for the many-to-many relationship
export interface AssistantWorkspaceRow {
  id: string
  user_id: string
  assistant_id: string
  workspace_id: string
  created_at: string
  updated_at: string
}

export type AssistantWorkspaceInsert = Omit<
  AssistantWorkspaceRow,
  "id" | "created_at" | "updated_at"
>

export const getAssistantById = async (
  assistantId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<AssistantRow>(
    `/api/assistants/${assistantId}`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to fetch assistant: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Database operation failed")
  }

  return response.data
}

export const getAssistantWorkspacesByWorkspaceId = async (
  workspaceId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<{
    id: string
    name: string
    assistants: AssistantRow[]
  }>(
    `/api/workspaces/${workspaceId}/assistants`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to fetch workspace assistants: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Database operation failed")
  }

  return response.data
}

export const getAssistantWorkspacesByAssistantId = async (
  assistantId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<{
    id: string
    name: string
    workspaces: WorkspaceRow[]
  }>(
    `/api/assistants/${assistantId}/workspaces`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to fetch assistant workspaces: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Database operation failed")
  }

  return response.data
}

export const createAssistant = async (
  assistant: TablesInsert<"assistants">,
  workspace_id: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPost<AssistantRow>(
    "/api/assistants",
    assistant,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to create assistant: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Failed to create assistant: No data returned")
  }

  const createdAssistant = response.data

  // Create the assistant-workspace relationship
  await createAssistantWorkspace(
    {
      user_id: createdAssistant.user_id,
      assistant_id: createdAssistant.id,
      workspace_id
    },
    authToken
  )

  return createdAssistant
}

export const createAssistants = async (
  assistants: TablesInsert<"assistants">[],
  workspace_id: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend - batch creation
  const response = await apiPost<AssistantRow[]>(
    "/api/assistants/batch",
    { items: assistants },
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to create assistants: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Failed to create assistants: No data returned")
  }

  const createdAssistants = response.data

  // Create assistant-workspace relationships
  await createAssistantWorkspaces(
    createdAssistants.map(assistant => ({
      user_id: assistant.user_id,
      assistant_id: assistant.id,
      workspace_id
    })),
    authToken
  )

  return createdAssistants
}

export const createAssistantWorkspace = async (
  item: AssistantWorkspaceInsert,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPost<AssistantWorkspaceRow>(
    "/api/assistant-workspaces",
    item,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to create assistant workspace: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Failed to create assistant workspace: No data returned")
  }

  return response.data
}

export const createAssistantWorkspaces = async (
  items: AssistantWorkspaceInsert[],
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend - batch creation
  const response = await apiPost<AssistantWorkspaceRow[]>(
    "/api/assistant-workspaces/batch",
    { items },
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to create assistant workspaces: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Failed to create assistant workspaces: No data returned")
  }

  return response.data
}

export const updateAssistant = async (
  assistantId: string,
  assistant: TablesUpdate<"assistants">,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPut<AssistantRow>(
    `/api/assistants/${assistantId}`,
    assistant,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to update assistant: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Failed to update assistant: No data returned")
  }

  return response.data
}

export const deleteAssistant = async (
  assistantId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiDelete(
    `/api/assistants/${assistantId}`,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to delete assistant: ${response.error.message}`)
  }

  return true
}

export const deleteAssistantWorkspace = async (
  assistantId: string,
  workspaceId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiDelete(
    `/api/assistant-workspaces/${assistantId}/${workspaceId}`,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to delete assistant workspace: ${response.error.message}`
    )
  }

  return true
}
