import { dbClient } from "@/lib/db/client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getChatById = async (chatId: string) => {
  const { data: chat } = await dbClient
    .from("chats")
    .select("*")
    .eq("id", chatId)
    .maybeSingle()

  return chat
}

export const getChatsByWorkspaceId = async (workspaceId: string) => {
  const chats = await dbClient
    .from("chats")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false })

  if (!chats) {
    throw new Error("Database operation failed")
  }

  return chats
}

export const createChat = async (chat: TablesInsert<"chats">) => {
  const createdChat = await dbClient
    .from("chats")
    .insert([chat])
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return createdChat
}

export const createChats = async (chats: TablesInsert<"chats">[]) => {
  const createdChats = await dbClient.from("chats").insert(chats).select("*")

  if (error) {
    throw new Error("Database operation failed")
  }

  return createdChats
}

export const updateChat = async (
  chatId: string,
  chat: TablesUpdate<"chats">
) => {
  const updatedChat = await dbClient
    .from("chats")
    .update(chat)
    .eq("id", chatId)
    .select("*")
    .single()

  if (error) {
    throw new Error("Database operation failed")
  }

  return updatedChat
}

export const deleteChat = async (chatId: string) => {
  const { error } = await dbClient.from("chats").delete().eq("id", chatId)

  if (error) {
    throw new Error("Database operation failed")
  }

  return true
}
