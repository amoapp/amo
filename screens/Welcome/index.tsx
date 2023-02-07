// Packages:
import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { phone } from 'phone'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useDispatch } from 'react-redux'
import { useContacts, useLocation } from '@hooks/index'


// Typescript:
import { StackNavigatorParamList } from '../../types'


// Constants:
import ROUTES from '@routes'


// Redux:
import { setFirestoreUser } from '@actions/user'


// Functions:
const Welcome = () => {
  // Constants:
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParamList, typeof ROUTES.WELCOME.name>>()
  
  // State:
  const {
    countryCodes,
    errorPrompt: useLocationErrorPrompt,
    geo,
    geocodedAddress,
    permission: locationPermission,
    getCountryCodes
  } = useLocation()
  const {
    errorPrompt: useContactsErrorPrompt,
    permission: contactsPermission,
    requestContactsPermission
  } = useContacts()
  const [ isButtonLoading, setIsButtonLoading ] = useState(false) // This will be used to show the button isDisabled/isLoading state
  const [ buttonText, setButtonText ] = useState('Allow Permissions') // This will be used to render the button text
  const [ canInputPhoneNumber, setCanInputPhoneNumber ] = useState(false) // This will be used to show the TextInput component
  const [ phoneNumber, setPhoneNumber ] = useState('') // This will be set by the TextInput component
  const [ countryCodeIndex, setCountryCodeIndex ] = useState(0) // This will be set by the DropDown list, if rendered
  const [ errorPrompt, setErrorPrompt ] = useState('')

  // Functions:
  const signIn = () => {
    setIsButtonLoading(true)
    setErrorPrompt('')
    if (!locationPermission || !geocodedAddress) {
      setIsButtonLoading(false)
      return setErrorPrompt('Location permission has not been given!')
    }
    if (!contactsPermission) {
      setIsButtonLoading(false)
      return setErrorPrompt('Contacts permission has not been given!')
    }
    const phoneNumberObject = phone(`${ countryCodes[ countryCodeIndex ] }${ phoneNumber }`, { country: geocodedAddress?.isoCountryCode ?? undefined })
    if (!phoneNumberObject.isValid) {
      setIsButtonLoading(false)
      return setErrorPrompt('Phone number is invalid!')
    }
    dispatch(setFirestoreUser({
      geo,
      phoneNumber
    }))
    navigation.navigate(ROUTES.OTP_VERIFICATION.name, { phoneNumber })
  }

  useEffect(() => {
    if (locationPermission && geocodedAddress && contactsPermission) {
      setButtonText('Next')
      setCanInputPhoneNumber(true)
    }
  }, [ locationPermission, geocodedAddress, contactsPermission ])

  useEffect(() => {
    if (useLocationErrorPrompt.length > 0) setErrorPrompt(useLocationErrorPrompt)
    if (useContactsErrorPrompt.length > 0) setErrorPrompt(useContactsErrorPrompt)
  }, [ useLocationErrorPrompt, useContactsErrorPrompt ])

  // Return:
  return (
    <View>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  )
}


// Exports:
export default Welcome
