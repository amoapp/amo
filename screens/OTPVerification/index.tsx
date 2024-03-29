// Packages:
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useOtpVerify } from 'react-native-otp-verify'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux'
import useContacts from '@hooks/useContacts'


// Typescript:
import { StackNavigatorParamList } from '../../types'


// Constants:
import ROUTES from '@routes'
import { DEFAULT_DATABASE_USER, DEFAULT_FIRESTORE_USER } from '@constants/defaults'
import { DATABASE_REFERENCES, FIRESTORE_REFERENCES } from '@firebase-references'


// Redux:
import { AppDispatch, RootState } from '@store/index'
import { UserState } from '@store/user'
import { segregateContacts } from '@actions/onboarding'
import { setDatabaseUser, setFirestoreUser } from '@actions/user'


// Functions:
const OTPVerification = () => {
  // Constants:
  const route = useRoute<RouteProp<StackNavigatorParamList, typeof ROUTES.OTP_VERIFICATION.name>>()
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParamList, typeof ROUTES.PRE_INTEREST.name>>()
  const dispatch = useDispatch<any>() // TODO: This might be a source of bugs in the future. Make sure this is properly typed and does not affect the rest of the application
  
  // State:
  const { getContacts, errorPrompt: useContactsErrorPrompt } = useContacts()
  const { otp, stopListener, startListener } = useOtpVerify({ numberOfDigits: 4 })
  const user = useSelector<RootState, UserState>(state => state.user)
  const [ isButtonLoading, setIsButtonLoading ] = useState(false)
  const [ confirmer, setConfirmer ] = useState<FirebaseAuthTypes.ConfirmationResult>()
  const [ errorPrompt, setErrorPrompt ] = useState('')

  // Functions:
  const shadowUserFlow = async (databaseUser: typeof DEFAULT_DATABASE_USER) => {
    try {
      const impressions = databaseUser.impressions
      const interactions = databaseUser.interactions
      await firestore()
        .collection<Partial<typeof DEFAULT_FIRESTORE_USER>>(FIRESTORE_REFERENCES.USERS)
        .doc(route.params.phoneNumber).set({
          ...user.firestore
        })
      const contacts = await getContacts()
      dispatch(segregateContacts(contacts))
      dispatch(setDatabaseUser({
        impressions,
        interactions
      }))
      navigation.navigate(ROUTES.PRE_INTEREST.name, { impressions, interactions })
    } catch(e) {
      setErrorPrompt(`Error: ${ (e as Error).message }`)
    }
  }

  const loginFlow = async (databaseUser: typeof DEFAULT_DATABASE_USER) => {
    try {
      const firestoreUser = (await firestore()
        .collection(FIRESTORE_REFERENCES.USERS)
        .doc(route.params.phoneNumber)
        .get()).data() as typeof DEFAULT_FIRESTORE_USER
      dispatch(setDatabaseUser(databaseUser))
      dispatch(setFirestoreUser(firestoreUser))
      navigation.navigate(ROUTES.HOME.name)
    } catch(e) {
      setErrorPrompt(`Error: ${ (e as Error).message }`)
    } 
  }

  const registerFlow = async () => {
    try {
      await firestore()
        .collection<Partial<typeof DEFAULT_FIRESTORE_USER>>(FIRESTORE_REFERENCES.USERS)
        .doc(route.params.phoneNumber).set(user.firestore)
      const contacts = await getContacts()
      dispatch(segregateContacts(contacts))
      navigation.navigate(ROUTES.WHAT_IS_YOUR_NAME.name)
    } catch(e) {
      setErrorPrompt(`Error: ${ (e as Error).message }`)
    }
  }

  const handleUserFlow = async () => {
    const databaseUserSnapshot = await database().ref(`${ DATABASE_REFERENCES.USERS }/${ route.params.phoneNumber }`).once('value')
    const doesUserAlreadyExist = databaseUserSnapshot.exists()
    if (doesUserAlreadyExist) {
      const databaseUser = databaseUserSnapshot.val() as typeof DEFAULT_DATABASE_USER
      const isShadowAccount = !databaseUser.verified
      if (isShadowAccount) await shadowUserFlow(databaseUser)
      else await loginFlow(databaseUser)
    } else await registerFlow()
  }

  const verifyOTP = async () => {
    try {
      if (!otp || !confirmer) return false
      setErrorPrompt('')
      setIsButtonLoading(true)
      await confirmer.confirm(otp) // TODO: Check if confirmation passes. Test and see.
      dispatch(setDatabaseUser({ verified: true }))
      dispatch(setFirestoreUser({ phoneNumber: route.params.phoneNumber }))
      stopListener()
      handleUserFlow()
    } catch(e) {
      setErrorPrompt('Invalid OTP!')
    } finally {
      setIsButtonLoading(false)
    }
  }

  // Effects:
  useEffect(() => {
    auth()
      .signInWithPhoneNumber(route.params.phoneNumber)
      .then(confirmerFunction => {
        setConfirmer(confirmerFunction)
        startListener()
      })
  }, [])

  useEffect(() => {
    if (otp && confirmer) verifyOTP()
  }, [ otp, confirmer ])

  useEffect(() => {
    if (useContactsErrorPrompt.length > 0) setErrorPrompt(useContactsErrorPrompt)
  }, [ useContactsErrorPrompt ])

  // Return:
  return (
    <View>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  )
}

// Exports:
export default OTPVerification
