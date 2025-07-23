import { dbClient } from "@/lib/db/client"
import { apiGet, apiPost, apiPut, apiDelete, withAuth } from "@/lib/api/client"
import { WorkspaceRow } from "@/supabase/types"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getHomeWorkspaceByUserId = async (
  userId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<{ id: string }>(
    `/api/users/${userId}/home-workspace`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to fetch home workspace: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Database operation failed")
  }

  return response.data.id
}

export const getWorkspaceById = async (
  workspaceId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<WorkspaceRow>(
    `/api/workspaces/${workspaceId}`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to fetch workspace: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Database operation failed")
  }

  return response.data
}

export const getWorkspacesByUserId = async (
  userId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<WorkspaceRow[]>(
    `/api/users/${userId}/workspaces`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to fetch workspaces: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Database operation failed")
  }

  return response.data
}

export const createWorkspace = async (
  workspace: TablesInsert<"workspaces">,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPost<WorkspaceRow>(
    "/api/workspaces",
    workspace,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to create workspace: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Failed to create workspace: No data returned")
  }

  return response.data
}

export const updateWorkspace = async (
  workspaceId: string,
  workspace: TablesUpdate<"workspaces">,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPut<WorkspaceRow>(
    `/api/workspaces/${workspaceId}`,
    workspace,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to update workspace: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Failed to update workspace: No data returned")
  }

  return response.data
}

export const deleteWorkspace = async (
  workspaceId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiDelete(
    `/api/workspaces/${workspaceId}`,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to delete workspace: ${response.error.message}`)
  }

  return true
}
