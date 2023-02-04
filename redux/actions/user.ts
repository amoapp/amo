// Typescript:
import { ActionResult } from '../types'
export type USER_ACTION_TYPE = typeof SET_DATABASE_USER | typeof SET_FIRESTORE_USER
export type USER_PAYLOAD_TYPE = typeof DEFAULT_DATABASE_USER | typeof DEFAULT_FIRESTORE_USER


// Constants:
import { DEFAULT_DATABASE_USER, DEFAULT_FIRESTORE_USER } from '@constants/defaults'
export const SET_DATABASE_USER = 'SET_DATABASE_USER'
export const SET_FIRESTORE_USER = 'SET_FIRESTORE_USER'
export const SET_PROFILE_PICTURE = 'SET_PROFILE_PICTURE'


// Functions:
/**
 * Sets the database user defined in {@link DEFAULT_DATABASE_USER}. 
 */
export const setDatabaseUser =
  (payload: Partial<typeof DEFAULT_DATABASE_USER>): ActionResult<typeof SET_DATABASE_USER, Partial<typeof DEFAULT_DATABASE_USER>> =>
  ({ type: SET_DATABASE_USER, payload })

/**
 * Sets the firestore user defined in {@link DEFAULT_FIRESTORE_USER}.
 */
export const setFirestoreUser =
  (payload: Partial<typeof DEFAULT_FIRESTORE_USER>): ActionResult<typeof SET_FIRESTORE_USER, Partial<typeof DEFAULT_FIRESTORE_USER>> =>
  ({ type: SET_FIRESTORE_USER, payload })
