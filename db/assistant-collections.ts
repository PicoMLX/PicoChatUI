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
  assistantCollections: any[]
) => {
  const createdAssistantCollections = await dbClient
    .from("assistant_collections")
    .insert(assistantCollections)
    .select("*")

  if (!createdAssistantCollections) {
    throw new Error("Failed to create assistant collections")
  }

  return createdAssistantCollections
}

export const deleteAssistantCollection = async (
  assistantId: string,
  collectionId: string
) => {
  try {
    // Note: Current dbClient only supports single eq condition
    // This needs to be updated when client supports multiple conditions
    await dbClient
      .from("assistant_collections")
      .delete()
      .eq("assistant_id", assistantId)
      .execute()
  } catch (error: any) {
    throw new Error("Failed to delete assistant collection")
  }

  return true
}
