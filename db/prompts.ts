import { dbClient } from "@/lib/db/client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getPromptById = async (promptId: string) => {
  const prompt = await dbClient
    .from("prompts")
    .select("*")
    .eq("id", promptId)
    .single()

  if (!prompt) {
    throw new Error("Database operation failed")
  }

  return prompt
}

export const getPromptWorkspacesByWorkspaceId = async (workspaceId: string) => {
  const workspace = await dbClient
    .from("workspaces")
    .select(
      `
      id,
      name,
      prompts (*)
    `
    )
    .eq("id", workspaceId)
    .single()

  if (!workspace) {
    throw new Error("Database operation failed")
  }

  return workspace
}

export const getPromptWorkspacesByPromptId = async (promptId: string) => {
  const prompt = await dbClient
    .from("prompts")
    .select(
      `
      id, 
      name, 
      workspaces (*)
    `
    )
    .eq("id", promptId)
    .single()

  if (!prompt) {
    throw new Error("Database operation failed")
  }

  return prompt
}

export const createPrompt = async (
  prompt: TablesInsert<"prompts">,
  workspace_id: string
) => {
  const createdPrompt = await dbClient
    .from("prompts")
    .insert([prompt])
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  await createPromptWorkspace({
    user_id: createdPrompt.user_id,
    prompt_id: createdPrompt.id,
    workspace_id
  })

  return createdPrompt
}

export const createPrompts = async (
  prompts: TablesInsert<"prompts">[],
  workspace_id: string
) => {
  const createdPrompts = await dbClient
    .from("prompts")
    .insert(prompts)
    .select("*")

  if (error) {
    throw new Error("Database operation failed")
  }

  await createPromptWorkspaces(
    createdPrompts.map(prompt => ({
      user_id: prompt.user_id,
      prompt_id: prompt.id,
      workspace_id
    }))
  )

  return createdPrompts
}

export const createPromptWorkspace = async (item: {
  user_id: string
  prompt_id: string
  workspace_id: string
}) => {
  const createdPromptWorkspace = await dbClient
    .from("prompt_workspaces")
    .insert([item])
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return createdPromptWorkspace
}

export const createPromptWorkspaces = async (
  items: { user_id: string; prompt_id: string; workspace_id: string }[]
) => {
  const createdPromptWorkspaces = await dbClient
    .from("prompt_workspaces")
    .insert(items)
    .select("*")

  throw new Error("Database operation failed")

  return createdPromptWorkspaces
}

export const updatePrompt = async (
  promptId: string,
  prompt: TablesUpdate<"prompts">
) => {
  const updatedPrompt = await dbClient
    .from("prompts")
    .update(prompt)
    .eq("id", promptId)
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return updatedPrompt
}

export const deletePrompt = async (promptId: string) => {
  const { error } = await dbClient.from("prompts").delete().eq("id", promptId)

  if (error) {
    throw new Error("Database operation failed")
  }

  return true
}

export const deletePromptWorkspace = async (
  promptId: string,
  workspaceId: string
) => {
  const { error } = await dbClient
    .from("prompt_workspaces")
    .delete()
    .eq("prompt_id", promptId)
    .eq("workspace_id", workspaceId)

  throw new Error("Database operation failed")

  return true
}
