// Components:
import Welcome from '@screens/Welcome'
import OTPVerification from '@screens/OTPVerification'
import PreInterest from '@screens/Onboarding/PreInterest'
import WhatIsYourName from '@screens/Onboarding/WhatIsYourName'
import ChooseAUsername from '@screens/Onboarding/ChooseAUsername'
import WhatIsYourGender from '@screens/Onboarding/WhatIsYourGender'
import AddAProfilePicture from '@screens/Onboarding/AddAProfilePicture'


// Constants:
export const LANDING_ROUTES = {
  WELCOME: {
    name: 'welcome',
    component: Welcome
  },
  OTP_VERIFICATION: {
    name: 'otp-verification',
    component: OTPVerification
  }
} as const

export const ONBOARDING_ROUTES = {
  PRE_INTEREST: {
    name: 'pre-interest',
    component: PreInterest
  },
  WHAT_IS_YOUR_NAME: {
    name: 'what-is-your-name',
    component: WhatIsYourName
  },
  CHOOSE_A_USERNAME: {
    name: 'choose-a-username',
    component: ChooseAUsername
  },
  WHAT_IS_YOUR_GENDER: {
    name: 'what-is-your-gender',
    component: WhatIsYourGender
  },
  ADD_A_PROFILE_PICTURE: {
    name: 'add-a-profile-picture',
    component: AddAProfilePicture
  },
  // ADD_FRIENDS: {
  //   name: 'add-friends',
  //   component: AddFriends
  // },
  // HOW_IT_WORKS: {
  //   name: 'how-it-works',
  //   component: HowItWorks
  // },
  // SETUP_QUESTIONS: {
  //   name: 'setup-questions',
  //   component: SetupQuestions
  // },
} as const

export const AUTHENTICATED_ROUTES = {
  HOME: {
    name: 'home',
    component: Welcome
  }
} as const

const ROUTES = {
  ...LANDING_ROUTES,
  ...ONBOARDING_ROUTES,
  ...AUTHENTICATED_ROUTES
} as const


// Exports:
export default ROUTES
