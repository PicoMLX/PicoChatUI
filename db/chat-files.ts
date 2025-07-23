import { dbClient } from "@/lib/db/client"
import { TablesInsert } from "@/supabase/types"

export const getChatFilesByChatId = async (chatId: string) => {
  const chatFiles = await dbClient
    .from("chats")
    .select(
      `
      id, 
      name, 
      files (*)
    `
    )
    .eq("id", chatId)
    .single()

  if (!chatFiles) {
    throw new Error("Database operation failed")
  }

  return chatFiles
}

export const createChatFile = async (chatFile: TablesInsert<"chat_files">) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}

export const createChatFiles = async (
  chatFiles: TablesInsert<"chat_files">[]
) => {
  // Temporarily disabled for static export testing
  // TODO: Migrate to REST API like assistant-collections
  throw new Error("Function not yet migrated to REST API")
}
