import { dbClient } from "@/lib/db/client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getCollectionById = async (collectionId: string) => {
  const collection = await dbClient
    .from("collections")
    .select("*")
    .eq("id", collectionId)
    .single()

  if (!collection) {
    throw new Error("Database operation failed")
  }

  return collection
}

export const getCollectionWorkspacesByWorkspaceId = async (
  workspaceId: string
) => {
  const workspace = await dbClient
    .from("workspaces")
    .select(
      `
      id,
      name,
      collections (*)
    `
    )
    .eq("id", workspaceId)
    .single()

  if (!workspace) {
    throw new Error("Database operation failed")
  }

  return workspace
}

export const getCollectionWorkspacesByCollectionId = async (
  collectionId: string
) => {
  const collection = await dbClient
    .from("collections")
    .select(
      `
      id, 
      name, 
      workspaces (*)
    `
    )
    .eq("id", collectionId)
    .single()

  if (!collection) {
    throw new Error("Database operation failed")
  }

  return collection
}

export const createCollection = async (
  collection: TablesInsert<"collections">,
  workspace_id: string
) => {
  const createdCollection = await dbClient
    .from("collections")
    .insert([collection])
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  await createCollectionWorkspace({
    user_id: createdCollection.user_id,
    collection_id: createdCollection.id,
    workspace_id
  })

  return createdCollection
}

export const createCollections = async (
  collections: TablesInsert<"collections">[],
  workspace_id: string
) => {
  const createdCollections = await dbClient
    .from("collections")
    .insert(collections)
    .select("*")

  if (error) {
    throw new Error("Database operation failed")
  }

  await createCollectionWorkspaces(
    createdCollections.map(collection => ({
      user_id: collection.user_id,
      collection_id: collection.id,
      workspace_id
    }))
  )

  return createdCollections
}

export const createCollectionWorkspace = async (item: {
  user_id: string
  collection_id: string
  workspace_id: string
}) => {
  const createdCollectionWorkspace = await dbClient
    .from("collection_workspaces")
    .insert([item])
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return createdCollectionWorkspace
}

export const createCollectionWorkspaces = async (
  items: { user_id: string; collection_id: string; workspace_id: string }[]
) => {
  const createdCollectionWorkspaces = await dbClient
    .from("collection_workspaces")
    .insert(items)
    .select("*")

  throw new Error("Database operation failed")

  return createdCollectionWorkspaces
}

export const updateCollection = async (
  collectionId: string,
  collection: TablesUpdate<"collections">
) => {
  const updatedCollection = await dbClient
    .from("collections")
    .update(collection)
    .eq("id", collectionId)
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return updatedCollection
}

export const deleteCollection = async (collectionId: string) => {
  const { error } = await dbClient
    .from("collections")
    .delete()
    .eq("id", collectionId)

  if (error) {
    throw new Error("Database operation failed")
  }

  return true
}

export const deleteCollectionWorkspace = async (
  collectionId: string,
  workspaceId: string
) => {
  const { error } = await dbClient
    .from("collection_workspaces")
    .delete()
    .eq("collection_id", collectionId)
    .eq("workspace_id", workspaceId)

  throw new Error("Database operation failed")

  return true
}
