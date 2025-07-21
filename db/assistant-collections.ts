import { dbClient } from "@/lib/db/client"
import { apiPost } from "@/lib/api/client"

// Assistant Collections interface for the many-to-many relationship
export interface AssistantCollectionRow {
  id: string
  assistant_id: string
  collection_id: string
  user_id: string
  created_at: string
  updated_at: string
}

export type AssistantCollectionInsert = Omit<
  AssistantCollectionRow,
  "id" | "created_at" | "updated_at"
>
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

export const createAssistantCollection = async (
  assistantCollection: AssistantCollectionInsert
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPost<AssistantCollectionRow>(
    "/api/assistant-collections",
    assistantCollection
  )

  if (response.error) {
    throw new Error(
      `Failed to create assistant collection: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Failed to create assistant collection: No data returned")
  }

  return { data: response.data, error: null }
}

export const createAssistantCollections = async (
  assistantCollections: AssistantCollectionInsert[]
) => {
  // REST-native API call to Swift Hummingbird backend - batch creation
  const response = await apiPost<AssistantCollectionRow[]>(
    "/api/assistant-collections/batch",
    { items: assistantCollections }
  )

  if (response.error) {
    throw new Error(
      `Failed to create assistant collections: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Failed to create assistant collections: No data returned")
  }

  return { data: response.data, error: null }
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
