// Packages:
import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useSocialMediaShare } from '@hooks/index'

// Typescript:
import { StackNavigatorParamList } from '../../../types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


// Constants:
import ROUTES from '@routes'

//State:
const {
  getServiceAvailabilities
} = useSocialMediaShare()

// Functions:
// TODO: Reduce this file.
const PreInterest = () => {
  // Constants:
  const route = useRoute<RouteProp<StackNavigatorParamList, typeof ROUTES.PRE_INTEREST.name>>()
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorParamList, typeof ROUTES.PRE_INTEREST.name>>()
  const shareableMessage = route.params.interactions > 5 
    ? `${ route.params.interactions } people are already discussing you on amo 👀`
    : route.params.impressions > 15
      ? `${ route.params.impressions } people are already viewing you on amo 👀`
      : `${ Math.floor(Math.random() * 15) } people are already viewing you on amo 👀`

  // Ref:
  const shareableRef = useRef<View | null>(null)

const handleContinueButtonPress = () => {
  navigation.navigate(ROUTES.WHAT_IS_YOUR_NAME.name)
}

  // Effects:
  useEffect(() => {
    getServiceAvailabilities()
  }, [])


  // Return:
  return (
    <View ref={ shareableRef }>

    </View>
  )
}


// Exports:
export default PreInterest