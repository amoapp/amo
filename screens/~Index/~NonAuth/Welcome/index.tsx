// Packages:
import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { phone } from 'phone'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as Location from 'expo-location'
import * as Contacts from 'expo-contacts'
import { useDispatch } from 'react-redux'


// Typescript:
import { StackNavigatorParamList } from '../../../../types'


// Constants:
import ROUTES from '../../../../routes'
import COUNTRY_CALLING_CODES from 'country-calling-code'


// Redux:
import { setFirestoreUser } from '../../../../redux/actions/user'


// Functions:
const Welcome = () => {
  // Constants:
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParamList, typeof ROUTES.WELCOME.name>>()
  
  // State:
  const [ isButtonLoading, setIsButtonLoading ] = useState(false) // This will be used to show the button isDisabled/isLoading state
  const [ buttonText, setButtonText ] = useState('Allow Permissions') // This will be used to render the button text
  const [ canInputPhoneNumber, setCanInputPhoneNumber ] = useState(false) // This will be used to show the TextInput component
  const [ phoneNumber, setPhoneNumber ] = useState('') // This will be set by the TextInput component
  const [ locationPermission, _requestLocationPermission ] = Location.useForegroundPermissions()
  const [ geo, setGeo ] = useState({ latitude: 0, longitude: 0 })
  const [ geocodedAddress, setGeocodedAddress ] = useState<Location.LocationGeocodedAddress>()
  const [ countryCodes, setCountryCodes ] = useState<string[]>([]) // This will be used to show the country code(s) in a TextField or a DropDown list
  const [ countryCodeIndex, setCountryCodeIndex ] = useState(0) // This will be set by the DropDown list, if rendered
  const [ contactsPermission, setContactsPermission ] = useState(false)
  const [ errorPrompt, setErrorPrompt ] = useState('')

  // Functions:
  const requestLocationPermission = async () => {
    const { status } = await _requestLocationPermission()
    if (status === Location.PermissionStatus.GRANTED) await getLocation()
    else setErrorPrompt('Location permission is needed')
  }

  const getLocation = async () => {
    try {
      if (locationPermission?.granted || locationPermission?.status === Location.PermissionStatus.GRANTED) {
        const location = await Location.getCurrentPositionAsync({})
        const geocode = (await Location.reverseGeocodeAsync(location.coords))[0]
        setGeo({ latitude: location.coords.latitude, longitude: location.coords.longitude })
        setGeocodedAddress(geocode)
        setCountryCodes(COUNTRY_CALLING_CODES.find(code => code.country === geocode.country)?.countryCodes ?? [])
      } else {
        if (locationPermission?.canAskAgain) await requestLocationPermission()
        else setErrorPrompt('Location permission was denied, please enable in Settings')
      }
    } catch(e) {
      setErrorPrompt(`Failed to get location: ${ e }`)
    }
  }

  const requestContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync()
    if (status === Contacts.PermissionStatus.GRANTED) await getContactsPermission()
    else setErrorPrompt('Contacts permission is needed')
  }

  const getContactsPermission = async () => {
    try {
      const contactsPermission = await Contacts.getPermissionsAsync()
      if (contactsPermission.status === Contacts.PermissionStatus.GRANTED) {
        setContactsPermission(true)
      } else {
        if (contactsPermission.canAskAgain) await requestContactsPermission()
        else setErrorPrompt('Contacts permission was denied, please enable in Settings')
      }
    } catch(e) {
      setErrorPrompt(`Failed to get contacts: ${ e }`)
    }
  }

  const signIn = () => {
    setIsButtonLoading(true)
    if (!geocodedAddress) return setErrorPrompt('Location permission has not been given!')
    if (!contactsPermission) return setErrorPrompt('Contacts permission has not been given!')
    const phoneNumberObject = phone(`${ countryCodes[ countryCodeIndex ] }${ phoneNumber }`, { country: geocodedAddress?.isoCountryCode ?? undefined })
    if (phoneNumberObject.isValid) {
      dispatch(setFirestoreUser({
        geo,
        phoneNumber
      }))
      navigation.navigate(ROUTES.OTP_VERIFICATION.name, { phoneNumber })
    }
    else setErrorPrompt('Phone number is invalid!')
    setIsButtonLoading(false)
  }

  useEffect(() => {
    if (geocodedAddress && contactsPermission) {
      setButtonText('Next')
      setCanInputPhoneNumber(true)
    }
  }, [ geocodedAddress, contactsPermission ])
  

  // Return:
  return (
    <View>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  )
}


// Exports:
export default Welcome
