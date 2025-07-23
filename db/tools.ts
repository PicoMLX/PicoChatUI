import { dbClient } from "@/lib/db/client"
import { apiGet, apiPost, apiPut, apiDelete, withAuth } from "@/lib/api/client"
import { ToolRow, WorkspaceRow } from "@/supabase/types"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

// Tool Workspace interface for the many-to-many relationship
export interface ToolWorkspaceRow {
  id: string
  user_id: string
  tool_id: string
  workspace_id: string
  created_at: string
  updated_at: string
}

export type ToolWorkspaceInsert = Omit<
  ToolWorkspaceRow,
  "id" | "created_at" | "updated_at"
>

export const getToolById = async (toolId: string, authToken?: string) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<ToolRow>(
    `/api/tools/${toolId}`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to fetch tool: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Database operation failed")
  }

  return response.data
}

export const getToolWorkspacesByWorkspaceId = async (
  workspaceId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<{
    id: string
    name: string
    tools: ToolRow[]
  }>(
    `/api/workspaces/${workspaceId}/tools`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to fetch workspace tools: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Database operation failed")
  }

  return response.data
}

export const getToolWorkspacesByToolId = async (
  toolId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<{
    id: string
    name: string
    workspaces: WorkspaceRow[]
  }>(
    `/api/tools/${toolId}/workspaces`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to fetch tool workspaces: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Database operation failed")
  }

  return response.data
}

export const createTool = async (
  tool: TablesInsert<"tools">,
  workspace_id: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPost<ToolRow>(
    "/api/tools",
    tool,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to create tool: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Failed to create tool: No data returned")
  }

  const createdTool = response.data

  // Create the tool-workspace relationship
  await createToolWorkspace(
    {
      user_id: createdTool.user_id,
      tool_id: createdTool.id,
      workspace_id
    },
    authToken
  )

  return createdTool
}

export const createTools = async (
  tools: TablesInsert<"tools">[],
  workspace_id: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend - batch creation
  const response = await apiPost<ToolRow[]>(
    "/api/tools/batch",
    { items: tools },
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to create tools: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Failed to create tools: No data returned")
  }

  const createdTools = response.data

  // Create tool-workspace relationships
  await createToolWorkspaces(
    createdTools.map(tool => ({
      user_id: tool.user_id,
      tool_id: tool.id,
      workspace_id
    })),
    authToken
  )

  return createdTools
}

export const createToolWorkspace = async (
  item: ToolWorkspaceInsert,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPost<ToolWorkspaceRow>(
    "/api/tool-workspaces",
    item,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to create tool workspace: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Failed to create tool workspace: No data returned")
  }

  return response.data
}

export const createToolWorkspaces = async (
  items: ToolWorkspaceInsert[],
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend - batch creation
  const response = await apiPost<ToolWorkspaceRow[]>(
    "/api/tool-workspaces/batch",
    { items },
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to create tool workspaces: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Failed to create tool workspaces: No data returned")
  }

  return response.data
}

export const updateTool = async (
  toolId: string,
  tool: TablesUpdate<"tools">,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPut<ToolRow>(
    `/api/tools/${toolId}`,
    tool,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to update tool: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Failed to update tool: No data returned")
  }

  return response.data
}

export const deleteTool = async (toolId: string, authToken?: string) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiDelete(
    `/api/tools/${toolId}`,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to delete tool: ${response.error.message}`)
  }

  return true
}

export const deleteToolWorkspace = async (
  toolId: string,
  workspaceId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiDelete(
    `/api/tool-workspaces/${toolId}/${workspaceId}`,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to delete tool workspace: ${response.error.message}`
    )
  }

  return true
}
