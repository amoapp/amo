// Packages:
import { combineReducers } from 'redux'
import onboardingReducer from './onboarding'
import userReducer from './user'


// Constants:
const reducer = combineReducers({ onboardingReducer, userReducer })


// Exports:
export default reducer
