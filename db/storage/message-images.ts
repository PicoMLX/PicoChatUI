import { dbClient } from "@/lib/db/client"

export const uploadMessageImage = async (path: string, image: File) => {
  const bucket = "message_images"

  const imageSizeLimit = 6000000 // 6MB

  if (image.size > imageSizeLimit) {
    throw new Error(`Image must be less than ${imageSizeLimit / 1000000}MB`)
  }

  const { error } = await dbClient.storage.from(bucket).upload(path, image, {
    upsert: true
  })

  if (error) {
    throw new Error("Error uploading image")
  }

  return path
}

export const getMessageImageFromStorage = async (filePath: string) => {
  const { data, error } = await dbClient.storage
    .from("message_images")
    .createSignedUrl(filePath, 60 * 60 * 24) // 24hrs

  if (error) {
    throw new Error("Error downloading message image")
  }

  return data.signedUrl
}
