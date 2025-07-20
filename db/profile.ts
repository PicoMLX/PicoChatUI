import { dbClient } from "@/lib/db/client"

export const getProfileByUserId = async (userId: string) => {
  try {
    const { data: profile } = await dbClient
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single()

    if (!profile) {
      throw new Error("Profile not found")
    }

    return profile
  } catch (error: any) {
    throw new Error("Database operation failed")
  }
}

export const getProfilesByWorkspaceId = async (workspaceId: string) => {
  try {
    const { data: profiles } = await dbClient
      .from("profiles")
      .select("*")
      .eq("workspace_id", workspaceId)

    return profiles || []
  } catch (error: any) {
    throw new Error("Database operation failed")
  }
}

export const createProfile = async (profile: any) => {
  try {
    const { data: createdProfile } = await dbClient
      .from("profiles")
      .insert([profile])
      .select("*")
      .single()

    return createdProfile
  } catch (error: any) {
    throw new Error("Database operation failed")
  }
}

export const updateProfile = async (profileId: string, profile: any) => {
  try {
    const { data: updatedProfile } = await dbClient
      .from("profiles")
      .update(profile)
      .eq("id", profileId)
      .select("*")
      .single()

    return updatedProfile
  } catch (error: any) {
    throw new Error("Database operation failed")
  }
}

export const deleteProfile = async (profileId: string) => {
  try {
    await dbClient.from("profiles").delete().eq("id", profileId).execute()
  } catch (error: any) {
    throw new Error("Database operation failed")
  }
}
