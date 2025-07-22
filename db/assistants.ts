import { dbClient } from "@/lib/db/client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getAssistantById = async (assistantId: string) => {
  const assistant = await dbClient
    .from("assistants")
    .select("*")
    .eq("id", assistantId)
    .single()

  if (!assistant) {
    throw new Error("Database operation failed")
  }

  return assistant
}

export const getAssistantWorkspacesByWorkspaceId = async (
  workspaceId: string
) => {
  const workspace = await dbClient
    .from("workspaces")
    .select(
      `
      id,
      name,
      assistants (*)
    `
    )
    .eq("id", workspaceId)
    .single()

  if (!workspace) {
    throw new Error("Database operation failed")
  }

  return workspace
}

export const getAssistantWorkspacesByAssistantId = async (
  assistantId: string
) => {
  const assistant = await dbClient
    .from("assistants")
    .select(
      `
      id, 
      name, 
      workspaces (*)
    `
    )
    .eq("id", assistantId)
    .single()

  if (!assistant) {
    throw new Error("Database operation failed")
  }

  return assistant
}

export const createAssistant = async (
  assistant: TablesInsert<"assistants">,
  workspace_id: string
) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}

export const createAssistants = async (
  assistants: TablesInsert<"assistants">[],
  workspace_id: string
) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}

export const createAssistantWorkspace = async (item: {
  user_id: string
  assistant_id: string
  workspace_id: string
}) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}

export const createAssistantWorkspaces = async (
  items: { user_id: string; assistant_id: string; workspace_id: string }[]
) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}

export const updateAssistant = async (
  assistantId: string,
  assistant: TablesUpdate<"assistants">
) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}

export const deleteAssistant = async (assistantId: string) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}

export const deleteAssistantWorkspace = async (
  assistantId: string,
  workspaceId: string
) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}
