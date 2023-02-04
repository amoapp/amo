// Packages:
import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import storage from '@react-native-firebase/storage'


// Typescript:
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackNavigatorParamList } from '../../../../../../types'
import { AppDispatch, RootState } from '../../../../../../redux/store'
import { UserState } from '../../../../../../redux/store/user'


// Constants:
import ROUTES from '../../../../../../routes'
import { STORAGE_REFERENCES } from '../../../../../../firebase/references'


// Redux:
import { setDatabaseUser } from '../../../../../../redux/actions/user'


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
  const [ profilePicture, setProfilePicture ] = useState<string | null>(null)
  const [ errorPrompt, setErrorPrompt ] = useState('')

  const pickImage = async () => {
    if (status?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1
      })
      if (!result.canceled) setProfilePicture(result.assets[0].uri)
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
        storage().ref(`${ STORAGE_REFERENCES.USERS }/${ user.firestore.phoneNumber }`)
        dispatch(setDatabaseUser({ profilePicture }))
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
