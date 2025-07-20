import { dbClient } from "@/lib/db/client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getFoldersByWorkspaceId = async (workspaceId: string) => {
  const folders = await dbClient
    .from("folders")
    .select("*")
    .eq("workspace_id", workspaceId)

  if (!folders) {
    throw new Error("Database operation failed")
  }

  return folders
}

export const createFolder = async (folder: TablesInsert<"folders">) => {
  const createdFolder = await dbClient
    .from("folders")
    .insert([folder])
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return createdFolder
}

export const updateFolder = async (
  folderId: string,
  folder: TablesUpdate<"folders">
) => {
  const updatedFolder = await dbClient
    .from("folders")
    .update(folder)
    .eq("id", folderId)
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return updatedFolder
}

export const deleteFolder = async (folderId: string) => {
  const { error } = await dbClient.from("folders").delete().eq("id", folderId)

  if (error) {
    throw new Error("Database operation failed")
  }

  return true
}
