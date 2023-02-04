// NOTE: The aim with this file is to break it up into more specialized units as
// the application grows in size.

// Typescript:
import { Contact as ExpoContact } from 'expo-contacts'


// Constants:
import ROUTES from '@routes'


// Exports:
export interface Contact extends ExpoContact {
  isOnAmo: boolean | null
  phoneNumber: string
}

export type StackNavigatorParamList = {
  [ ROUTES.WELCOME.name ]: undefined
  [ ROUTES.OTP_VERIFICATION.name ]: {
    phoneNumber: string
  }
  [ ROUTES.PRE_INTEREST.name ]: {
    impressions: number
    interactions: number
  }
  [ ROUTES.WHAT_IS_YOUR_NAME.name ]: undefined
  [ ROUTES.CHOOSE_A_USERNAME.name ]: {
    suggestions: string[]
  }
  [ ROUTES.WHAT_IS_YOUR_GENDER.name ]: undefined
  [ ROUTES.ADD_A_PROFILE_PICTURE.name ]: undefined
  [ ROUTES.ADD_FRIENDS.name ]: undefined
  [ ROUTES.HOW_IT_WORKS.name ]: undefined
  [ ROUTES.SETUP_QUESTIONS.name ]: undefined
  [ ROUTES.HOME.name ]: undefined
}
