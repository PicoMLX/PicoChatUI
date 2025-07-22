import { dbClient } from "@/lib/db/client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getChatById = async (chatId: string) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}

export const getChatsByWorkspaceId = async (workspaceId: string) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}

export const createChat = async (chat: TablesInsert<"chats">) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}

export const createChats = async (chats: TablesInsert<"chats">[]) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}

export const updateChat = async (
  chatId: string,
  chat: TablesUpdate<"chats">
) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}

export const deleteChat = async (chatId: string) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}
