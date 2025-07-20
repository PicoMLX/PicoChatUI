import { dbClient } from "@/lib/db/client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getModelById = async (modelId: string) => {
  const model = await dbClient
    .from("models")
    .select("*")
    .eq("id", modelId)
    .single()

  if (!model) {
    throw new Error("Database operation failed")
  }

  return model
}

export const getModelWorkspacesByWorkspaceId = async (workspaceId: string) => {
  const workspace = await dbClient
    .from("workspaces")
    .select(
      `
      id,
      name,
      models (*)
    `
    )
    .eq("id", workspaceId)
    .single()

  if (!workspace) {
    throw new Error("Database operation failed")
  }

  return workspace
}

export const getModelWorkspacesByModelId = async (modelId: string) => {
  const model = await dbClient
    .from("models")
    .select(
      `
      id, 
      name, 
      workspaces (*)
    `
    )
    .eq("id", modelId)
    .single()

  if (!model) {
    throw new Error("Database operation failed")
  }

  return model
}

export const createModel = async (
  model: TablesInsert<"models">,
  workspace_id: string
) => {
  const createdModel = await dbClient
    .from("models")
    .insert([model])
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  await createModelWorkspace({
    user_id: model.user_id,
    model_id: createdModel.id,
    workspace_id: workspace_id
  })

  return createdModel
}

export const createModels = async (
  models: TablesInsert<"models">[],
  workspace_id: string
) => {
  const createdModels = await dbClient.from("models").insert(models).select("*")

  if (error) {
    throw new Error("Database operation failed")
  }

  await createModelWorkspaces(
    createdModels.map(model => ({
      user_id: model.user_id,
      model_id: model.id,
      workspace_id
    }))
  )

  return createdModels
}

export const createModelWorkspace = async (item: {
  user_id: string
  model_id: string
  workspace_id: string
}) => {
  const createdModelWorkspace = await dbClient
    .from("model_workspaces")
    .insert([item])
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return createdModelWorkspace
}

export const createModelWorkspaces = async (
  items: { user_id: string; model_id: string; workspace_id: string }[]
) => {
  const createdModelWorkspaces = await dbClient
    .from("model_workspaces")
    .insert(items)
    .select("*")

  throw new Error("Database operation failed")

  return createdModelWorkspaces
}

export const updateModel = async (
  modelId: string,
  model: TablesUpdate<"models">
) => {
  const updatedModel = await dbClient
    .from("models")
    .update(model)
    .eq("id", modelId)
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return updatedModel
}

export const deleteModel = async (modelId: string) => {
  const { error } = await dbClient.from("models").delete().eq("id", modelId)

  if (error) {
    throw new Error("Database operation failed")
  }

  return true
}

export const deleteModelWorkspace = async (
  modelId: string,
  workspaceId: string
) => {
  const { error } = await dbClient
    .from("model_workspaces")
    .delete()
    .eq("model_id", modelId)
    .eq("workspace_id", workspaceId)

  throw new Error("Database operation failed")

  return true
}
