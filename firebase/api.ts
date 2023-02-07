// Packages:
import storage from '@react-native-firebase/storage'
import database from '@react-native-firebase/database'


// Typescript:
export interface APISuccessResponse<T> {
  status: true
  payload: T
}

export interface APIFailureResponse {
  status: false
  payload: unknown
}

export type APIResponse<T> = APISuccessResponse<T> | APIFailureResponse


// Redux:
import { setDatabaseUser } from '@actions/user'
import { store } from '@store/index'


// Constants:
import { DATABASE_REFERENCES, STORAGE_REFERENCES } from '@firebase-references'


// Exports:

/**
 * Sets the profile picture for the user, returns the download URL for the profile picture as
 * payload if it succeeds without error.
 */
export const setProfilePicture = async ({
  phoneNumber,
  profilePicture
}: {
  phoneNumber: string
  profilePicture: string
}): Promise<APIResponse<string>> => {
  try {
    const reference = storage().ref(`${ STORAGE_REFERENCES.USERS }/${ phoneNumber }`)
    await reference.putFile(profilePicture)
    const profilePictureURL = await reference.getDownloadURL()
    store.dispatch(setDatabaseUser({ profilePicture: profilePictureURL }))
    return { status: true, payload: profilePictureURL }
  } catch(e) {
    return { status: false, payload: e }
  }
}

export const checkUsernameExistence = async (username: string): Promise<APIResponse<boolean>> => {
  try {
    const usernameExists = (await database()
      .ref(DATABASE_REFERENCES.USERS)
      .orderByChild('username')
      .equalTo(username)
      .once('value'))
      .exists()
    return { status: true, payload: usernameExists }
  } catch(e) {
    return { status: false, payload: e }
  }
}

/**
 * Generates username suggestions and checks their validity before
 * returning them.
 */
export const generateUsernameSuggestions = async (name: string): Promise<APIResponse<string[]>> => {
  try {
    const nameChunks = name.trim().split(' ')
    const suggestionCandidates = [
      nameChunks[0],
      `${ nameChunks[0] }${ nameChunks[ nameChunks.length - 1 ] }`,
      `${ nameChunks[0] }.${ nameChunks[ nameChunks.length - 1 ] }`,
      `${ nameChunks[0] }${ nameChunks[ nameChunks.length - 1 ][0] }`,
      `${ nameChunks[0] }.${ nameChunks[ nameChunks.length - 1 ][0] }`,
      `${ nameChunks[0][0] }${ nameChunks[ nameChunks.length - 1 ] }`,
      `${ nameChunks[0][0] }.${ nameChunks[ nameChunks.length - 1 ] }`,
      `${ nameChunks[0] }${ Math.ceil(Math.random() * 999) }`,
      `${ nameChunks[0] }${ Math.ceil(Math.random() * 999) }`
    ]
    const suggestions: string[] = []
    for await (const suggestionCandidate of suggestionCandidates) {
      if (suggestions.length > 3) break
      const result = await checkUsernameExistence(suggestionCandidate)
      if (result.status) if (!result.payload) suggestions.push(suggestionCandidate)
    }
    return { status: true, payload: suggestions }
  } catch(e) {
    return { status: false, payload: e }
  }
}
