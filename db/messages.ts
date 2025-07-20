import { dbClient } from "@/lib/db/client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getMessageById = async (messageId: string) => {
  const { data: message } = await dbClient
    .from("messages")
    .select("*")
    .eq("id", messageId)
    .single()

  if (!message) {
    throw new Error("Message not found")
  }

  return message
}

export const getMessagesByChatId = async (chatId: string) => {
  const { data: messages } = await dbClient
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)

  if (!messages) {
    throw new Error("Messages not found")
  }

  return messages
}

export const createMessage = async (message: TablesInsert<"messages">) => {
  const createdMessage = await dbClient
    .from("messages")
    .insert([message])
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return createdMessage
}

export const createMessages = async (messages: TablesInsert<"messages">[]) => {
  const createdMessages = await dbClient
    .from("messages")
    .insert(messages)
    .select("*")

  if (error) {
    throw new Error("Database operation failed")
  }

  return createdMessages
}

export const updateMessage = async (
  messageId: string,
  message: TablesUpdate<"messages">
) => {
  const updatedMessage = await dbClient
    .from("messages")
    .update(message)
    .eq("id", messageId)
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return updatedMessage
}

export const deleteMessage = async (messageId: string) => {
  const { error } = await dbClient.from("messages").delete().eq("id", messageId)

  if (error) {
    throw new Error("Database operation failed")
  }

  return true
}

export async function deleteMessagesIncludingAndAfter(
  userId: string,
  chatId: string,
  sequenceNumber: number
) {
  const { error } = await dbClient.rpc("delete_messages_including_and_after", {
    p_user_id: userId,
    p_chat_id: chatId,
    p_sequence_number: sequenceNumber
  })

  if (error) {
    return {
      error: "Failed to delete messages."
    }
  }

  return true
}
