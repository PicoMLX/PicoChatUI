import { dbClient } from "@/lib/db/client"
import { apiGet, apiPost, apiDelete, withAuth } from "@/lib/api/client"
import { ToolRow } from "@/supabase/types"
import { TablesInsert } from "@/supabase/types"

// Assistant Tools interface for the many-to-many relationship
export interface AssistantToolRow {
  id: string
  assistant_id: string
  tool_id: string
  user_id: string
  created_at: string
  updated_at: string
}

export type AssistantToolInsert = Omit<
  AssistantToolRow,
  "id" | "created_at" | "updated_at"
>

export const getAssistantToolsByAssistantId = async (
  assistantId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<{
    id: string
    name: string
    tools: ToolRow[]
  }>(
    `/api/assistants/${assistantId}/tools`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to fetch assistant tools: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Database operation failed")
  }

  return response.data
}

export const createAssistantTool = async (
  assistantTool: AssistantToolInsert,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPost<AssistantToolRow>(
    "/api/assistant-tools",
    assistantTool,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to create assistant tool: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Failed to create assistant tool: No data returned")
  }

  return { data: response.data, error: null }
}

export const createAssistantTools = async (
  assistantTools: AssistantToolInsert[],
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend - batch creation
  const response = await apiPost<AssistantToolRow[]>(
    "/api/assistant-tools/batch",
    { items: assistantTools },
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to create assistant tools: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Failed to create assistant tools: No data returned")
  }

  return { data: response.data, error: null }
}

export const deleteAssistantTool = async (
  assistantId: string,
  toolId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiDelete(
    `/api/assistant-tools/${assistantId}/${toolId}`,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to delete assistant tool: ${response.error.message}`
    )
  }

  return true
}
