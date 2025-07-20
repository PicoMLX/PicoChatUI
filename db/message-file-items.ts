import { dbClient } from "@/lib/db/client"
import { TablesInsert } from "@/supabase/types"

export const getMessageFileItemsByMessageId = async (messageId: string) => {
  const messageFileItems = await dbClient
    .from("messages")
    .select(
      `
      id,
      file_items (*)
    `
    )
    .eq("id", messageId)
    .single()

  if (!messageFileItems) {
    throw new Error("Database operation failed")
  }

  return messageFileItems
}

export const createMessageFileItems = async (
  messageFileItems: TablesInsert<"message_file_items">[]
) => {
  const createdMessageFileItems = await dbClient
    .from("message_file_items")
    .insert(messageFileItems)
    .select("*")

  if (!createdMessageFileItems) {
    throw new Error("Database operation failed")
  }

  return createdMessageFileItems
}
