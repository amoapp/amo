// Typescript:
import { Contact } from '../../types'


// Exports:
export interface OnboardingState { 
  contacts: Contact[]
  haveContactsBeenSegregated: boolean
}

export const DEFAULT_ONBOARDING_STATE: OnboardingState = {
  contacts: [],
  haveContactsBeenSegregated: false
}
