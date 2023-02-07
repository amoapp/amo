// Packages:
import React, { useState } from 'react'
import * as Contacts from 'expo-contacts'


// Constants:
export const USE_LOCATION_ERRORS = {
  PERMISSION_DENIED: 'Contacts permission was denied, please enable in Settings',
  GENERIC: (e: Error) => `Failed to get contacts: ${ e.message }`
}


// Functions:
/**
 * React hook for handling contacts.
 */
const useContacts = () => {
  // State:
  const [ permission, setPermission ] = useState(false)
  const [ errorPrompt, setErrorPrompt ] = useState('')

  // Functions:
  const requestContactsPermission = async (options = { getContactsAfterGrant: true }) => {
    const { status } = await Contacts.requestPermissionsAsync()
    if (status === Contacts.PermissionStatus.GRANTED) {
      setPermission(true)
      if (options.getContactsAfterGrant) await getContacts()
    }
    else setErrorPrompt(USE_LOCATION_ERRORS.PERMISSION_DENIED)
  }

  const getContacts = async () => {}

  return {
    errorPrompt,
    permission,
    requestContactsPermission
  }
}


// Exports:
export default useContacts
