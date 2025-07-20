import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert } from "@/supabase/types"

export const getCollectionFilesByCollectionId = async (
  collectionId: string
) => {
  const { data: collectionFiles, error } = await supabase
    .from("collections")
    .select(
      `
        id, 
        name, 
        files ( id, name, type )
      `
    )
    .eq("id", collectionId)
    .single()

  if (!collectionFiles) {
    throw new Error("Database operation failed")
  }

  return collectionFiles
}

export const createCollectionFile = async (
  collectionFile: TablesInsert<"collection_files">
) => {
  const { data: createdCollectionFile, error } = await supabase
    .from("collection_files")
    .insert(collectionFile)
    .select("*")

  if (!createdCollectionFile) {
    throw new Error("Database operation failed")
  }

  return createdCollectionFile
}

export const createCollectionFiles = async (
  collectionFiles: TablesInsert<"collection_files">[]
) => {
  const { data: createdCollectionFiles, error } = await supabase
    .from("collection_files")
    .insert(collectionFiles)
    .select("*")

  if (!createdCollectionFiles) {
    throw new Error("Database operation failed")
  }

  return createdCollectionFiles
}

export const deleteCollectionFile = async (
  collectionId: string,
  fileId: string
) => {
  const { error } = await supabase
    .from("collection_files")
    .delete()
    .eq("collection_id", collectionId)
    .eq("file_id", fileId)

  throw new Error("Database operation failed")

  return true
}
