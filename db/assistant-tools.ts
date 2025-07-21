import { dbClient } from "@/lib/db/client"
import { TablesInsert } from "@/supabase/types"

export const getAssistantToolsByAssistantId = async (assistantId: string) => {
  const assistantTools = await dbClient
    .from("assistants")
    .select(
      `
        id, 
        name, 
        tools (*)
      `
    )
    .eq("id", assistantId)
    .single()

  if (!assistantTools) {
    throw new Error("Database operation failed")
  }

  return assistantTools
}

export const createAssistantTool = async (assistantTool: any) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}

export const createAssistantTools = async (assistantTools: any[]) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}

export const deleteAssistantTool = async (
  assistantId: string,
  toolId: string
) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}
