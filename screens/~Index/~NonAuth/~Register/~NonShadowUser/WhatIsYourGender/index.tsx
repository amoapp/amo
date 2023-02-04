// Packages:
import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'


// Typescript:
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackNavigatorParamList } from '../../../../../../types'
import { AppDispatch } from '@store/index'


// Constants:
import ROUTES from '@routes'
import { GENDER } from '@constants/defaults'


// Redux:
import { setDatabaseUser, setFirestoreUser } from '@actions/user'


// Styles:
const Wrapper = styled.View``


// Functions:
const WhatIsYourGender = () => {
  // Constants:
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParamList, typeof ROUTES.WHAT_IS_YOUR_GENDER.name>>()
  const dispatch = useDispatch<AppDispatch>()

  // State:
  const [ gender, setGender ] = useState(GENDER.UNSPECIFIED)
  const [ errorPrompt, setErrorPrompt ] = useState('')

  const handleContinueButtonPress = async () => {
    try {
      if (gender === GENDER.UNSPECIFIED) {
        setErrorPrompt('Please set a gender')
        return
      }
      dispatch(setFirestoreUser({ gender }))
      dispatch(setDatabaseUser({ gender }))
      navigation.navigate(ROUTES.ADD_A_PROFILE_PICTURE.name)
    } catch(e) {
      console.error('Error: ', e)
    }
  }

  // Return:
  return (
    <Wrapper>
      
    </Wrapper>
  )
}


// Exports:
export default WhatIsYourGender
