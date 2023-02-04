// Typescript:
import { ActionResult, ActionType } from '../types'


// Constants:
import { DEFAULT_ONBOARDING_STATE, OnboardingState } from '../store/onboarding'
import { SEGREGATE_CONTACTS } from '../actions/onboarding'


// Functions:
const onboardingReducer = (state = DEFAULT_ONBOARDING_STATE, action: ActionResult<ActionType, any>): OnboardingState => {
  switch (action.type) {
    case SEGREGATE_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        haveContactsBeenSegregated: true
      }
    default:
      return state
  }
}

// Exports:
export default onboardingReducer
