// Typescript:
import { ONBOARDING_ACTION_TYPE, ONBOARDING_PAYLOAD_TYPE } from './actions/onboarding'
import { USER_ACTION_TYPE, USER_PAYLOAD_TYPE } from './actions/user'


// Exports:
export type ActionType = ONBOARDING_ACTION_TYPE | USER_ACTION_TYPE

export type ActionResult<T, P> = { type: T, payload: P }
export type Action<T, P> = (payload: P) => ActionResult<T, P>
