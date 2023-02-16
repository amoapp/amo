//Packages:
import { useState } from 'react'
import { Linking, Platform } from 'react-native'
import { captureRef } from 'react-native-view-shot'
import Share from 'react-native-share'

//Functions:

const useSocialMediaShare = () => {
  //Constants:
    const [ shareableServicesAvailabilitiesLoaded, setShareableServicesAvailabilitiesLoaded ] = useState(false)
    const [ shareableServices, setShareableServices ] = useState<Record<string, { url: string, package: string, canOpen: boolean }>>({
      'whatsapp': {
        url: 'whatsapp://',
        package: 'com.whatsapp',
        canOpen: false
      },
      'instagram': {
        url: 'instagram://',
        package: 'com.instagram.android',
        canOpen: false
      }
    }) // NOTE: We will probably prune this depending on testing to only limit to Instagram Story, WhatsApp and Snapchat - or just IG Story
    const [ isCapturingScreenshot, setIsCapturingScreenshot ] = useState(false)
    const [ shareableImage, setShareableImage ] = useState('')

    // Functions:

    //TODO:Check this function, does it need to return anything?
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
        //return True ?
      } catch(e) {
        console.error('Error: ', e)
      }
    }

    const shareToWhatsApp = async (shareableMessage:string, shareableImage:string) => {
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

    const shareToInstagramStory = async (shareableMessage:string, shareableImage:string) => {
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

    //TODO:Check argument trype lel ✌
    const captureScreenshot = async (shareableRef:any) => {
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

    return {
      captureScreenshot,
      shareToInstagramStory,
      shareToWhatsApp,
      getServiceAvailabilities
    }
}

//Exports:
export default useSocialMediaShare