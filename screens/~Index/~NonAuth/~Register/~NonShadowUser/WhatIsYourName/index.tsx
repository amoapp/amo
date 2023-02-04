// Packages:
import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import database from '@react-native-firebase/database'


// Typescript:
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackNavigatorParamList } from '../../../../../../types'
import { AppDispatch } from '../../../../../../redux/store'


// Constants:
import ROUTES from '../../../../../../routes'
import { DATABASE_REFERENCES } from '../../../../../../firebase/references'


// Redux:
import { setFirestoreUser } from '../../../../../../redux/actions/user'


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
  const generateUsernameSuggestions = async () => {
    const nameChunks = name.trim().split(' ')
    const suggestionCandidates = [
      nameChunks[0],
      `${ nameChunks[0] }${ nameChunks[ nameChunks.length - 1 ] }`,
      `${ nameChunks[0] }.${ nameChunks[ nameChunks.length - 1 ] }`,
      `${ nameChunks[0] }${ nameChunks[ nameChunks.length - 1 ][0] }`,
      `${ nameChunks[0] }.${ nameChunks[ nameChunks.length - 1 ][0] }`,
      `${ nameChunks[0][0] }${ nameChunks[ nameChunks.length - 1 ] }`,
      `${ nameChunks[0][0] }.${ nameChunks[ nameChunks.length - 1 ] }`,
      `${ nameChunks[0] }${ Math.ceil(Math.random() * 999) }`,
      `${ nameChunks[0] }${ Math.ceil(Math.random() * 999) }`
    ]
    const suggestions: string[] = []
    for await (const suggestionCandidate of suggestionCandidates) {
      if (suggestions.length > 3) break
      const usernameExists = (await database()
        .ref(DATABASE_REFERENCES.USERS)
        .orderByChild('username')
        .equalTo(suggestionCandidate)
        .once('value'))
        .exists()
      if (!usernameExists) suggestions.push(suggestionCandidate)
    }
    return suggestions
  }

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
      const suggestions = await generateUsernameSuggestions()
      navigation.navigate(ROUTES.CHOOSE_A_USERNAME.name, { suggestions })
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
