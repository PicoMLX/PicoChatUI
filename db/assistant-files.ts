import { dbClient } from "@/lib/db/client"

export const getAssistantFilesByAssistantId = async (assistantId: string) => {
  const assistantFiles = await dbClient
    .from("assistants")
    .select(
      `
        id, 
        name, 
        files (*)
      `
    )
    .eq("id", assistantId)
    .single()

  if (!assistantFiles) {
    throw new Error("Failed to fetch assistant files")
  }

  return assistantFiles
}

export const createAssistantFile = async (assistantFile: any) => {
  const createdAssistantFile = await dbClient
    .from("assistant_files")
    .insert(assistantFile)

  if (!createdAssistantFile) {
    throw new Error("Failed to create assistant file")
  }

  return createdAssistantFile
}

export const createAssistantFiles = async (assistantFiles: any[]) => {
  const createdAssistantFiles = await dbClient
    .from("assistant_files")
    .insert(assistantFiles)

  if (!createdAssistantFiles) {
    throw new Error("Failed to create assistant files")
  }

  return createdAssistantFiles
}

export const deleteAssistantFile = async (
  assistantId: string,
  fileId: string
) => {
  try {
    await dbClient
      .from("assistant_files")
      .delete()
      .eq("assistant_id", assistantId)
      .execute()
  } catch (error: any) {
    throw new Error("Failed to delete assistant file")
  }

  return true
}
