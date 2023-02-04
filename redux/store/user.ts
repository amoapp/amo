// Typescript:
import {
  DEFAULT_DATABASE_USER,
  DEFAULT_FIRESTORE_USER
} from '@constants/defaults'


// Exports:
export interface UserState { 
  database: typeof DEFAULT_DATABASE_USER
  firestore: typeof DEFAULT_FIRESTORE_USER
}

export const DEFAULT_USER_STATE: UserState = {
  database: DEFAULT_DATABASE_USER,
  firestore: DEFAULT_FIRESTORE_USER
}
