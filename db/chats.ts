import { dbClient } from "@/lib/db/client"
import { apiGet, apiPost, apiPut, apiDelete, withAuth } from "@/lib/api/client"
import { ChatRow } from "@/supabase/types"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getChatById = async (chatId: string, authToken?: string) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<ChatRow>(
    `/api/chats/${chatId}`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to fetch chat: ${response.error.message}`)
  }

  return response.data
}

export const getChatsByWorkspaceId = async (
  workspaceId: string,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiGet<ChatRow[]>(
    `/api/workspaces/${workspaceId}/chats`,
    {},
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to fetch chats: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Database operation failed")
  }

  return response.data
}

export const createChat = async (
  chat: TablesInsert<"chats">,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPost<ChatRow>(
    "/api/chats",
    chat,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to create chat: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Failed to create chat: No data returned")
  }

  return response.data
}

export const createChats = async (
  chats: TablesInsert<"chats">[],
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend - batch creation
  const response = await apiPost<ChatRow[]>(
    "/api/chats/batch",
    { items: chats },
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to create chats: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Failed to create chats: No data returned")
  }

  return response.data
}

export const updateChat = async (
  chatId: string,
  chat: TablesUpdate<"chats">,
  authToken?: string
) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiPut<ChatRow>(
    `/api/chats/${chatId}`,
    chat,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to update chat: ${response.error.message}`)
  }

  if (!response.data) {
    throw new Error("Failed to update chat: No data returned")
  }

  return response.data
}

export const deleteChat = async (chatId: string, authToken?: string) => {
  // REST-native API call to Swift Hummingbird backend
  const response = await apiDelete(
    `/api/chats/${chatId}`,
    authToken ? withAuth(authToken) : undefined
  )

  if (response.error) {
    throw new Error(`Failed to delete chat: ${response.error.message}`)
  }

  return true
}
