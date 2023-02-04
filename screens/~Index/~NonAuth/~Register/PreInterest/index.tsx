// Packages:
import React, { useEffect, useRef, useState } from 'react'
import { Linking, Platform, View } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { captureRef } from 'react-native-view-shot'
import Share from 'react-native-share'


// Typescript:
import { StackNavigatorParamList } from '../../../../../types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


// Constants:
import ROUTES from '@routes'


// Functions:
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

  // State:
  const [ shareableServicesAvailabilitiesLoaded, setShareableServicesAvailabilitiesLoaded ] = useState(false)
  const [ shareableServices, setShareableServices ] = useState<Record<string, { url: string, package: string, canOpen: boolean }>>({
    'fb': {
      url: 'fb://',
      package: 'com.facebook.android',
      canOpen: false
    },
    'whatsapp': {
      url: 'whatsapp://',
      package: 'com.whatsapp',
      canOpen: false
    },
    'twitter': {
      url: 'twitter://',
      package: 'com.twitter.android',
      canOpen: false
    },
    'instagram': {
      url: 'instagram://',
      package: 'com.instagram.android',
      canOpen: false
    },
    'snapchat': {
      url: 'snapchat://',
      package: 'com.snapchat.android',
      canOpen: false
    }
  }) // NOTE: We will probably prune this depending on testing to only limit to Instagram Story, WhatsApp and Snapchat - or just IG Story
  const [ isCapturingScreenshot, setIsCapturingScreenshot ] = useState(false)
  const [ shareableImage, setShareableImage ] = useState('')

  // Functions:
  const getServiceAvailabilities = async () => {
    try {
      for await (const service of Object.entries(shareableServices)) {
        let canOpen = false
        if (Platform.OS === 'ios') canOpen = await Linking.canOpenURL(service[1].url)
        else canOpen = (await Share.isPackageInstalled(service[1].package)).isInstalled
        setShareableServices(shareableServices => ({
          ...shareableServices,
          [ service[0] ]: {
            ...shareableServices[service[0]],
            canOpen
          }
        }))
      }
      setShareableServicesAvailabilitiesLoaded(true)
    } catch(e) {
      console.error('Error: ', e)
    }
  }

  const shareToFacebook = async () => {
    try {
      if (shareableImage.length === 0) return
      if (shareableServices.instagram.canOpen) {
        await Share.shareSingle({
          backgroundImage: shareableImage,
          stickerImage: shareableImage,
          url: shareableImage,
          backgroundBottomColor: '#000000',
          backgroundTopColor: '#000000',
          type: 'image/png',
          filename: 'amo-preinterest',
          social: Share.Social.FACEBOOK_STORIES,
          appId: '219376304',
          message: shareableMessage
        })
      } else await Share.open({ url: shareableImage })
    } catch(e) {
      console.error('Error: ', e)
    }
  }

  const shareToWhatsApp = async () => {
    try {
      if (shareableImage.length === 0) return
      if (shareableServices.instagram.canOpen) {
        await Share.shareSingle({
          url: shareableImage,
          type: 'image/png',
          filename: 'amo-preinterest',
          social: Share.Social.WHATSAPP,
          message: shareableMessage
        })
      } else await Share.open({ url: shareableImage })
    } catch(e) {
      console.error('Error: ', e)
    }
  }

  const shareToTwitter = async () => {
    try {
      if (shareableImage.length === 0) return
      if (shareableServices.instagram.canOpen) {
        await Share.shareSingle({
          url: shareableImage,
          type: 'image/png',
          filename: 'amo-preinterest',
          social: Share.Social.TWITTER,
          message: shareableMessage
        })
      } else await Share.open({ url: shareableImage })
    } catch(e) {
      console.error('Error: ', e)
    }
  }

  const shareToInstagramStory = async () => {
    try {
      if (shareableImage.length === 0) return
      if (shareableServices.instagram.canOpen) {
        await Share.shareSingle({
          stickerImage: shareableImage,
          social: Share.Social.INSTAGRAM_STORIES,
          backgroundBottomColor: '#000000',
          backgroundTopColor: '#000000',
          appId: 'FACEBOOK_APP_ID',
          attributionURL: 'https://getamoapp.com',
          message: shareableMessage,
          backgroundImage: shareableImage,
        })
      } else await Share.open({ url: shareableImage })
    } catch(e) {
      console.error('Error: ', e)
    }
  }

  const shareToSnapchat = async () => {
    try {
      if (shareableImage.length === 0) return
      if (shareableServices.instagram.canOpen) {
        await Share.shareSingle({
          url: shareableImage,
          type: 'image/png',
          filename: 'amo-preinterest',
          social: Share.Social.SNAPCHAT,
          message: shareableMessage
        })
      } else await Share.open({ url: shareableImage })
    } catch(e) {
      console.error('Error: ', e)
    }
  }

  const captureScreenshot = async () => {
    setIsCapturingScreenshot(true)
    try {
      const uri = await captureRef(shareableRef, {
        format: 'png',
        quality: 0.8
      })
      setShareableImage(uri)
    } catch(e) {
      console.error('Error: ', e)
    }
    setIsCapturingScreenshot(false)
  }

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
