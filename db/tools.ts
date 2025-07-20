import { dbClient } from "@/lib/db/client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getToolById = async (toolId: string) => {
  const tool = await dbClient
    .from("tools")
    .select("*")
    .eq("id", toolId)
    .single()

  if (!tool) {
    throw new Error("Database operation failed")
  }

  return tool
}

export const getToolWorkspacesByWorkspaceId = async (workspaceId: string) => {
  const workspace = await dbClient
    .from("workspaces")
    .select(
      `
      id,
      name,
      tools (*)
    `
    )
    .eq("id", workspaceId)
    .single()

  if (!workspace) {
    throw new Error("Database operation failed")
  }

  return workspace
}

export const getToolWorkspacesByToolId = async (toolId: string) => {
  const tool = await dbClient
    .from("tools")
    .select(
      `
      id, 
      name, 
      workspaces (*)
    `
    )
    .eq("id", toolId)
    .single()

  if (!tool) {
    throw new Error("Database operation failed")
  }

  return tool
}

export const createTool = async (
  tool: TablesInsert<"tools">,
  workspace_id: string
) => {
  const createdTool = await dbClient
    .from("tools")
    .insert([tool])
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  await createToolWorkspace({
    user_id: createdTool.user_id,
    tool_id: createdTool.id,
    workspace_id
  })

  return createdTool
}

export const createTools = async (
  tools: TablesInsert<"tools">[],
  workspace_id: string
) => {
  const createdTools = await dbClient.from("tools").insert(tools).select("*")

  if (error) {
    throw new Error("Database operation failed")
  }

  await createToolWorkspaces(
    createdTools.map(tool => ({
      user_id: tool.user_id,
      tool_id: tool.id,
      workspace_id
    }))
  )

  return createdTools
}

export const createToolWorkspace = async (item: {
  user_id: string
  tool_id: string
  workspace_id: string
}) => {
  const createdToolWorkspace = await dbClient
    .from("tool_workspaces")
    .insert([item])
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return createdToolWorkspace
}

export const createToolWorkspaces = async (
  items: { user_id: string; tool_id: string; workspace_id: string }[]
) => {
  const createdToolWorkspaces = await dbClient
    .from("tool_workspaces")
    .insert(items)
    .select("*")

  throw new Error("Database operation failed")

  return createdToolWorkspaces
}

export const updateTool = async (
  toolId: string,
  tool: TablesUpdate<"tools">
) => {
  const updatedTool = await dbClient
    .from("tools")
    .update(tool)
    .eq("id", toolId)
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return updatedTool
}

export const deleteTool = async (toolId: string) => {
  const { error } = await dbClient.from("tools").delete().eq("id", toolId)

  if (error) {
    throw new Error("Database operation failed")
  }

  return true
}

export const deleteToolWorkspace = async (
  toolId: string,
  workspaceId: string
) => {
  const { error } = await dbClient
    .from("tool_workspaces")
    .delete()
    .eq("tool_id", toolId)
    .eq("workspace_id", workspaceId)

  throw new Error("Database operation failed")

  return true
}
