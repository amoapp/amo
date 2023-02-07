// Packages:
import React, { useState } from 'react'
import * as Location from 'expo-location'


// Constants:
import COUNTRY_CALLING_CODES from 'country-calling-code'
export const USE_LOCATION_ERRORS = {
  PERMISSION_DENIED: 'Location permission was denied, please enable in Settings',
  GENERIC: (e: Error) => `Failed to get location: ${ e.message }`
}


// Functions:
/**
 * React hook for handling location.
 */
const useLocation = () => {
  // Constants:
  const [ locationPermission, _requestLocationPermission ] = Location.useForegroundPermissions()

  // State:
  const [ permission, setPermission ] = useState(false)
  const [ isGeoSet, setIsGeoSet ] = useState(false)
  const [ geo, setGeo ] = useState({ latitude: 0, longitude: 0 })
  const [ geocodedAddress, setGeocodedAddress ] = useState<Location.LocationGeocodedAddress>()
  const [ countryCodes, setCountryCodes ] = useState<string[]>([])
  const [ errorPrompt, setErrorPrompt ] = useState('')

  // Functions:
  const requestLocationPermission = async (options = { getLocationAfterGrant: true }) => {
    const { status } = await _requestLocationPermission()
    if (status === Location.PermissionStatus.GRANTED) {
      setPermission(true)
      if (options.getLocationAfterGrant) await getGeo()
    }
    else setErrorPrompt(USE_LOCATION_ERRORS.PERMISSION_DENIED)
  }

  const getGeo = async () => {
    try {
      if (locationPermission?.granted || locationPermission?.status === Location.PermissionStatus.GRANTED) {
        const location = await Location.getCurrentPositionAsync({})
        setGeo({ latitude: location.coords.latitude, longitude: location.coords.longitude })
        setIsGeoSet(true)
      } else {
        if (locationPermission?.canAskAgain) await requestLocationPermission()
        else setErrorPrompt(USE_LOCATION_ERRORS.PERMISSION_DENIED)
      }
    } catch(e) {
      setErrorPrompt(USE_LOCATION_ERRORS.GENERIC(e as Error))
    }
  }

  const getGeocodedAddress = async () => {
    try {
      if (
        locationPermission?.granted ||
        locationPermission?.status === Location.PermissionStatus.GRANTED
      ) {
        if (!isGeoSet) await getGeo()
        const geocode = (await Location.reverseGeocodeAsync(geo))[0]
        setGeocodedAddress(geocode)
      } else {
        if (locationPermission?.canAskAgain) await requestLocationPermission()
        else setErrorPrompt(USE_LOCATION_ERRORS.PERMISSION_DENIED)
      }
    } catch(e) {
      setErrorPrompt(USE_LOCATION_ERRORS.GENERIC(e as Error))
    }
  }

  const getCountryCodes = async () => {
    try {
      if (
        locationPermission?.granted ||
        locationPermission?.status === Location.PermissionStatus.GRANTED
      ) {
        if (!geocodedAddress) await getGeocodedAddress()
        if (geocodedAddress) setCountryCodes(COUNTRY_CALLING_CODES.find(code => code.country === geocodedAddress.country)?.countryCodes ?? [])
      } else {
        if (locationPermission?.canAskAgain) await requestLocationPermission()
        else setErrorPrompt(USE_LOCATION_ERRORS.PERMISSION_DENIED)
      }
    } catch(e) {
      setErrorPrompt(USE_LOCATION_ERRORS.GENERIC(e as Error))
    }
  }

  return {
    countryCodes,
    errorPrompt,
    geo,
    geocodedAddress,
    isGeoSet,
    permission,
    requestLocationPermission,
    getGeo,
    getGeocodedAddress,
    getCountryCodes
  }
}


// Exports:
export default useLocation
