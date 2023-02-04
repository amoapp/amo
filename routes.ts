// Components:
import Welcome from './screens/~Index/~NonAuth/Welcome'
import OTPVerification from './screens/~Index/~NonAuth/OTPVerification'
import PreInterest from './screens/~Index/~NonAuth/~Register/PreInterest'


// Constants:
const ROUTES = {
  WELCOME: {
    name: 'welcome',
    component: Welcome
  },
  OTP_VERIFICATION: {
    name: 'otp-verification',
    component: OTPVerification
  },
  PRE_INTEREST: {
    name: 'pre-interest',
    component: PreInterest
  },
  WHAT_IS_YOUR_NAME: {
    name: 'what-is-your-name',
    component: PreInterest
  },
  CHOOSE_A_USERNAME: {
    name: 'choose-a-username',
    component: PreInterest
  },
  WHAT_IS_YOUR_GENDER: {
    name: 'what-is-your-gender',
    component: PreInterest
  },
  ADD_A_PROFILE_PICTURE: {
    name: 'add-a-profile-picture',
    component: PreInterest
  },
  ADD_FRIENDS: {
    name: 'add-friends',
    component: PreInterest
  },
  HOW_IT_WORKS: {
    name: 'how-it-works',
    component: PreInterest
  },
  SETUP_QUESTIONS: {
    name: 'setup-questions',
    component: PreInterest
  },
  HOME: {
    name: 'home',
    component: PreInterest
  }
} as const


// Exports:
export default ROUTES
