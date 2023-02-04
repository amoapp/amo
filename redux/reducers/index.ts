// Packages:
import { combineReducers } from 'redux'
import onboardingReducer from './onboarding'
import userReducer from './user'


// Constants:
const reducer = combineReducers({
  onboarding: onboardingReducer,
  user: userReducer
})


// Exports:
export default reducer
