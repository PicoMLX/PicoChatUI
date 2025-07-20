import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert } from "@/supabase/types"

export const getAssistantFilesByAssistantId = async (assistantId: string) => {
  const { data: assistantFiles, error } = await supabase
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
  const { data: createdAssistantFile, error } = await supabase
    .from("assistant_files")
    .insert(assistantFile)
    .select("*")

  if (!createdAssistantFile) {
    throw new Error(error.message)
  }

  return createdAssistantFile
}

export const createAssistantFiles = async (
  assistantFiles: TablesInsert<"assistant_files">[]
) => {
  const { data: createdAssistantFiles, error } = await supabase
    .from("assistant_files")
    .insert(assistantFiles)
    .select("*")

  if (!createdAssistantFiles) {
    throw new Error(error.message)
  }

  return createdAssistantFiles
}

export const deleteAssistantFile = async (
  assistantId: string,
  fileId: string
) => {
  const { error } = await supabase
    .from("assistant_files")
    .delete()
    .eq("assistant_id", assistantId)
    .eq("file_id", fileId)

  if (error) throw new Error(error.message)

  return true
}
