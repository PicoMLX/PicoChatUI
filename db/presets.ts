import { dbClient } from "@/lib/db/client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getPresetById = async (presetId: string) => {
  const preset = await dbClient
    .from("presets")
    .select("*")
    .eq("id", presetId)
    .single()

  if (!preset) {
    throw new Error("Database operation failed")
  }

  return preset
}

export const getPresetWorkspacesByWorkspaceId = async (workspaceId: string) => {
  const workspace = await dbClient
    .from("workspaces")
    .select(
      `
      id,
      name,
      presets (*)
    `
    )
    .eq("id", workspaceId)
    .single()

  if (!workspace) {
    throw new Error("Database operation failed")
  }

  return workspace
}

export const getPresetWorkspacesByPresetId = async (presetId: string) => {
  const preset = await dbClient
    .from("presets")
    .select(
      `
      id, 
      name, 
      workspaces (*)
    `
    )
    .eq("id", presetId)
    .single()

  if (!preset) {
    throw new Error("Database operation failed")
  }

  return preset
}

export const createPreset = async (
  preset: TablesInsert<"presets">,
  workspace_id: string
) => {
  const createdPreset = await dbClient
    .from("presets")
    .insert([preset])
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  await createPresetWorkspace({
    user_id: preset.user_id,
    preset_id: createdPreset.id,
    workspace_id: workspace_id
  })

  return createdPreset
}

export const createPresets = async (
  presets: TablesInsert<"presets">[],
  workspace_id: string
) => {
  const createdPresets = await dbClient
    .from("presets")
    .insert(presets)
    .select("*")

  if (error) {
    throw new Error("Database operation failed")
  }

  await createPresetWorkspaces(
    createdPresets.map(preset => ({
      user_id: preset.user_id,
      preset_id: preset.id,
      workspace_id
    }))
  )

  return createdPresets
}

export const createPresetWorkspace = async (item: {
  user_id: string
  preset_id: string
  workspace_id: string
}) => {
  const createdPresetWorkspace = await dbClient
    .from("preset_workspaces")
    .insert([item])
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return createdPresetWorkspace
}

export const createPresetWorkspaces = async (
  items: { user_id: string; preset_id: string; workspace_id: string }[]
) => {
  const createdPresetWorkspaces = await dbClient
    .from("preset_workspaces")
    .insert(items)
    .select("*")

  throw new Error("Database operation failed")

  return createdPresetWorkspaces
}

export const updatePreset = async (
  presetId: string,
  preset: TablesUpdate<"presets">
) => {
  const updatedPreset = await dbClient
    .from("presets")
    .update(preset)
    .eq("id", presetId)
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return updatedPreset
}

export const deletePreset = async (presetId: string) => {
  const { error } = await dbClient.from("presets").delete().eq("id", presetId)

  if (error) {
    throw new Error("Database operation failed")
  }

  return true
}

export const deletePresetWorkspace = async (
  presetId: string,
  workspaceId: string
) => {
  const { error } = await dbClient
    .from("preset_workspaces")
    .delete()
    .eq("preset_id", presetId)
    .eq("workspace_id", workspaceId)

  throw new Error("Database operation failed")

  return true
}
