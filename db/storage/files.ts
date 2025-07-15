import { dbClient } from "@/lib/db/client"
import { toast } from "sonner"

export const uploadFile = async (
  file: File,
  payload: {
    name: string
    user_id: string
    file_id: string
  }
) => {
  const SIZE_LIMIT = parseInt(
    process.env.NEXT_PUBLIC_USER_FILE_SIZE_LIMIT || "10000000"
  )

  if (file.size > SIZE_LIMIT) {
    throw new Error(
      `File must be less than ${Math.floor(SIZE_LIMIT / 1000000)}MB`
    )
  }

  const filePath = `${payload.user_id}/${Buffer.from(payload.file_id).toString("base64")}`

  try {
    const { error } = await dbClient.storage
      .from("files")
      .upload(filePath, file, {
        upsert: true
      })

    if (error) {
      throw new Error("Error uploading file")
    }

    return filePath
  } catch (error: any) {
    throw new Error("Error uploading file")
  }
}

export const deleteFileFromStorage = async (filePath: string) => {
  const { error } = await dbClient.storage.from("files").remove([filePath])

  if (error) {
    toast.error("Failed to remove file!")
    return
  }
}

export const getFileFromStorage = async (filePath: string) => {
  const { data, error } = await dbClient.storage
    .from("files")
    .createSignedUrl(filePath, 60 * 60 * 24) // 24hrs

  if (error) {
    console.error(`Error uploading file with path: ${filePath}`, error)
    throw new Error("Error downloading file")
  }

  return data.signedUrl
}
