// Packages:
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import reducer from '../reducers'


// Typescript:
import { DEFAULT_ONBOARDING_STATE, OnboardingState } from './onboarding'
import { DEFAULT_USER_STATE, UserState } from './user'


// Exports:
export interface RootState {
  onboarding: OnboardingState
  user: UserState
}


export const preloadedState: RootState = {
  onboarding: DEFAULT_ONBOARDING_STATE,
  user: DEFAULT_USER_STATE
}

export const store = configureStore({
  middleware: [ thunk ],
  preloadedState,
  reducer
})

export type AppDispatch = typeof store.dispatch
