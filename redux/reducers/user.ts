// Typescript:
import { ActionResult, ActionType } from '../types'


// Constants:
import { DEFAULT_USER_STATE, UserState } from '../store/user'
import { SET_DATABASE_USER, SET_FIRESTORE_USER } from '../actions/user'


// Functions:
const userReducer = (state = DEFAULT_USER_STATE, action: ActionResult<ActionType, any>): UserState => {
  switch (action.type) {
    case SET_DATABASE_USER:
      return {
        ...state,
        database: {
          ...state.database,
          ...action.payload
        }
      }
    case SET_FIRESTORE_USER:
      return {
        ...state,
        firestore: {
          ...state.firestore,
          ...action.payload
        }
      }
    default:
      return state
  }
}

// Exports:
export default userReducer
