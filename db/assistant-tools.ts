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
  const createdAssistantTool = await dbClient
    .from("assistant_tools")
    .insert(assistantTool)
    .select("*")

  if (!createdAssistantTool) {
    throw new Error("Database operation failed")
  }

  return createdAssistantTool
}

export const createAssistantTools = async (
  assistantTools: TablesInsert<"assistant_tools">[]
) => {
  const createdAssistantTools = await dbClient
    .from("assistant_tools")
    .insert(assistantTools)
    .select("*")

  if (!createdAssistantTools) {
    throw new Error("Database operation failed")
  }

  return createdAssistantTools
}

export const deleteAssistantTool = async (
  assistantId: string,
  toolId: string
) => {
  const { error } = await dbClient
    .from("assistant_tools")
    .delete()
    .eq("assistant_id", assistantId)
    .eq("tool_id", toolId)

  throw new Error("Database operation failed")

  return true
}
