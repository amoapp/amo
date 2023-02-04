// Packages:
import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'


// Typescript:
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackNavigatorParamList } from '../../../../../../types'
import { AppDispatch } from '@store/index'


// Constants:
import ROUTES from '@routes'


// Redux:
import { setFirestoreUser } from '@actions/user'
import { generateUsernameSuggestions } from '@api'


// Styles:
const Wrapper = styled.View``


// Functions:
const WhatIsYourName = () => {
  // Constants:
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParamList, typeof ROUTES.WHAT_IS_YOUR_NAME.name>>()
  const dispatch = useDispatch<AppDispatch>()

  // State:
  const [ isButtonLoading, setIsButtonLoading ] = useState(false)
  const [ name, setName ] = useState('')
  const [ errorPrompt, setErrorPrompt ] = useState('')

  // Functions:
  const handleContinueButtonPress = async () => {
    try {
      if (name.trim().length === 0) {
        setErrorPrompt('Please enter your name')
        return
      }
      if (name.trim().length > 50) {
        setErrorPrompt('Your name is too long, can you shorten it a little?')
        return
      }
      setIsButtonLoading(true)
      dispatch(setFirestoreUser({ name: name.trim() }))
      const { status, payload } = await generateUsernameSuggestions(name)
      if (!status) setErrorPrompt(`Error: ${ payload }`)
      else navigation.navigate(ROUTES.CHOOSE_A_USERNAME.name, { suggestions: payload })
    } catch(e) {
      console.error('Error: ', e)
    } finally {
      setIsButtonLoading(false)
    }
  }

  // Return:
  return (
    <Wrapper>
      
    </Wrapper>
  )
}


// Exports:
export default WhatIsYourName
