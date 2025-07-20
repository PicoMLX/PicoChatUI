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
  const createdChatFile = await dbClient
    .from("chat_files")
    .insert(chatFile)
    .select("*")

  if (!createdChatFile) {
    throw new Error("Database operation failed")
  }

  return createdChatFile
}

export const createChatFiles = async (
  chatFiles: TablesInsert<"chat_files">[]
) => {
  const createdChatFiles = await dbClient
    .from("chat_files")
    .insert(chatFiles)
    .select("*")

  if (!createdChatFiles) {
    throw new Error("Database operation failed")
  }

  return createdChatFiles
}
