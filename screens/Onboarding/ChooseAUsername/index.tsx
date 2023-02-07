// Packages:
import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useDispatch } from 'react-redux'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import database from '@react-native-firebase/database'


// Typescript:
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackNavigatorParamList } from '../../../types'
import { AppDispatch } from '@store/index'


// Constants:
import ROUTES from '@routes'
import { DATABASE_REFERENCES } from '@firebase-references'


// Redux:
import { setDatabaseUser, setFirestoreUser } from '@actions/user'


// Styles:
const Wrapper = styled.View``


// Functions:
const ChooseAUsername = () => {
  // Constants:
  const route = useRoute<RouteProp<StackNavigatorParamList, typeof ROUTES.CHOOSE_A_USERNAME.name>>()
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParamList, typeof ROUTES.CHOOSE_A_USERNAME.name>>()
  const dispatch = useDispatch<AppDispatch>()
  const suggestions = route.params.suggestions

  // State:
  const [ isButtonLoading, setIsButtonLoading ] = useState(false)
  const [ username, setUsername ] = useState('')
  const [ attempts, setAttempts ] = useState(0)
  const [ errorPrompt, setErrorPrompt ] = useState('')

  const handleContinueButtonPress = async () => {
    try {
      if (attempts > 10) {
        setErrorPrompt('Too many attempts, please try again later!')
        return
      }
      setAttempts(attempts => attempts + 1)
      const _username = username.trim()
      if (_username.length === 0) {
        setErrorPrompt('Please enter a username')
        return
      }
      if (_username.length > 50) {
        setErrorPrompt('Your username is too long, can you shorten it a little?')
        return
      }
      setIsButtonLoading(true)
      const usernameExists = (await database()
        .ref(DATABASE_REFERENCES.USERS)
        .orderByChild('username')
        .equalTo(_username)
        .once('value'))
        .exists()
      if (usernameExists) {
        setErrorPrompt('Username already exists')
        setIsButtonLoading(false)
        return
      }
      dispatch(setFirestoreUser({ username: _username }))
      dispatch(setDatabaseUser({ username: _username }))
      navigation.navigate(ROUTES.WHAT_IS_YOUR_GENDER.name)
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
export default ChooseAUsername

