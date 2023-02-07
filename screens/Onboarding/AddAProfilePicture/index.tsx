// Packages:
import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { setProfilePicture } from '@api'


// Typescript:
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackNavigatorParamList } from '../../../types'
import { AppDispatch, RootState } from '@store/index'
import { UserState } from '@store/user'


// Constants:
import ROUTES from '@routes'


// Styles:
const Wrapper = styled.View``


// Functions:
const AddAProfilePicture = () => {
  // Constants:
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParamList, typeof ROUTES.ADD_A_PROFILE_PICTURE.name>>()
  const dispatch = useDispatch<AppDispatch>()
  
  // State:
  const user = useSelector<RootState, UserState>(state => state.user)
  const [ status, requestPermission ] = ImagePicker.useMediaLibraryPermissions()
  const [ profilePicture, _setProfilePicture ] = useState<string | null>(null)
  const [ errorPrompt, setErrorPrompt ] = useState('')

  const pickImage = async () => {
    if (status?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1
      })
      if (!result.canceled) _setProfilePicture(result.assets[0].uri)
    } else {
      await requestPermission()
    }
  }

  const handleContinueButtonPress = async (isSkip?: boolean) => {
    try {
      if (!isSkip) {
        if (profilePicture === null) {
          setErrorPrompt('Please select an image')
          return
        }
        const { status, payload } = await setProfilePicture({
          phoneNumber: user.firestore.phoneNumber,
          profilePicture
        })
        if (!status) {
          setErrorPrompt(`Error: ${ payload }`)
        } else {
          // TODO: Handle successful navigation here.
        }
      }
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
export default AddAProfilePicture
