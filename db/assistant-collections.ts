import { dbClient } from "@/lib/db/client"
export const getAssistantCollectionsByAssistantId = async (
  assistantId: string
) => {
  const assistantCollections = await dbClient
    .from("assistants")
    .select(
      `
        id, 
        name, 
        collections (*)
      `
    )
    .eq("id", assistantId)
    .single()

  if (!assistantCollections) {
    throw new Error("Failed to fetch assistant collections")
  }

  return assistantCollections
}

export const createAssistantCollection = async (assistantCollection: any) => {
  const createdAssistantCollection = await dbClient
    .from("assistant_collections")
    .insert(assistantCollection)
    .select("*")

  if (!createdAssistantCollection) {
    throw new Error("Failed to create assistant collection")
  }

  return createdAssistantCollection
}

export const createAssistantCollections = async (
  assistantCollections: TablesInsert<"assistant_collections">[]
) => {
  const { data: createdAssistantCollections, error } = await supabase
    .from("assistant_collections")
    .insert(assistantCollections)
    .select("*")

  if (!createdAssistantCollections) {
    throw new Error(error.message)
  }

  return createdAssistantCollections
}

export const deleteAssistantCollection = async (
  assistantId: string,
  collectionId: string
) => {
  const { error } = await supabase
    .from("assistant_collections")
    .delete()
    .eq("assistant_id", assistantId)
    .eq("collection_id", collectionId)

  if (error) throw new Error(error.message)

  return true
}
