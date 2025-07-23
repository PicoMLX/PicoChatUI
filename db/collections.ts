import { dbClient } from "@/lib/db/client"
import { apiGet, apiPost, apiPut, apiDelete, withAuth } from "@/lib/api/client"
import { CollectionRow, WorkspaceRow } from "@/supabase/types"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

// Collection Workspace interface for the many-to-many relationship
export interface CollectionWorkspaceRow {
  id: string
  user_id: string
  collection_id: string
  workspace_id: string
  created_at: string
  updated_at: string
}

export type CollectionWorkspaceInsert = Omit<
  CollectionWorkspaceRow,
  "id" | "created_at" | "updated_at"
>

export const getCollectionById = async (
  collectionId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<CollectionRow>(
    `/api/collections/${collectionId}`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to fetch collection: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Database operation failed")
  }

  return response.data
}

export const getCollectionWorkspacesByWorkspaceId = async (
  workspaceId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<{
    id: string
    name: string
    collections: CollectionRow[]
  }>(
    `/api/workspaces/${workspaceId}/collections`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to fetch workspace collections: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Database operation failed")
  }

  return response.data
}

export const getCollectionWorkspacesByCollectionId = async (
  collectionId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<{
    id: string
    name: string
    workspaces: WorkspaceRow[]
  }>(
    `/api/collections/${collectionId}/workspaces`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to fetch collection workspaces: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Database operation failed")
  }

  return response.data
}

export const createCollection = async (
  collection: TablesInsert<"collections">,
  workspace_id: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPost<CollectionRow>(
    "/api/collections",
    collection,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to create collection: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Failed to create collection: No data returned")
  }

  const createdCollection = response.data

  // Create the collection-workspace relationship
  await createCollectionWorkspace(
    {
      user_id: createdCollection.user_id,
      collection_id: createdCollection.id,
      workspace_id
    },
    authToken
  )

  return createdCollection
}

export const createCollections = async (
  collections: TablesInsert<"collections">[],
  workspace_id: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend - batch creation
  const response = await apiPost<CollectionRow[]>(
    "/api/collections/batch",
    { items: collections },
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to create collections: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Failed to create collections: No data returned")
  }

  const createdCollections = response.data

  // Create collection-workspace relationships
  await createCollectionWorkspaces(
    createdCollections.map(collection => ({
      user_id: collection.user_id,
      collection_id: collection.id,
      workspace_id
    })),
    authToken
  )

  return createdCollections
}

export const createCollectionWorkspace = async (
  item: CollectionWorkspaceInsert,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPost<CollectionWorkspaceRow>(
    "/api/collection-workspaces",
    item,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to create collection workspace: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Failed to create collection workspace: No data returned")
  }

  return response.data
}

export const createCollectionWorkspaces = async (
  items: CollectionWorkspaceInsert[],
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend - batch creation
  const response = await apiPost<CollectionWorkspaceRow[]>(
    "/api/collection-workspaces/batch",
    { items },
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to create collection workspaces: ${response.error.message}`
    )
  }

  if (!response.data) {
    throw new Error("Failed to create collection workspaces: No data returned")
  }

  return response.data
}

export const updateCollection = async (
  collectionId: string,
  collection: TablesUpdate<"collections">,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPut<CollectionRow>(
    `/api/collections/${collectionId}`,
    collection,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to update collection: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Failed to update collection: No data returned")
  }

  return response.data
}

export const deleteCollection = async (
  collectionId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiDelete(
    `/api/collections/${collectionId}`,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to delete collection: ${response.error.message}`)
  }

  return true
}

export const deleteCollectionWorkspace = async (
  collectionId: string,
  workspaceId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiDelete(
    `/api/collection-workspaces/${collectionId}/${workspaceId}`,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(
      `Failed to delete collection workspace: ${response.error.message}`
    )
  }

  return true
}
