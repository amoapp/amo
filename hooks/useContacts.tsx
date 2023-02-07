// Packages:
import React, { useState } from 'react'
import * as Contacts from 'expo-contacts'
import phone from 'phone'


// Typescript:
import { Contact } from 'types'


// Constants:
export const USE_CONTACTS_ERRORS = {
  PERMISSION_DENIED: 'Contacts permission was denied, please enable in Settings',
  GENERIC: (e: Error) => `Failed to get contacts: ${ e.message }`
}


// Functions:
/**
 * React hook for handling contacts.
 */
const useContacts = () => {
  // State:
  const [ contactsPermission, setLocationPermission ] = useState<Contacts.PermissionResponse>()
  const [ permission, setPermission ] = useState(false)
  const [ contacts, setContacts ] = useState<Contact[]>([])
  const [ errorPrompt, setErrorPrompt ] = useState('')

  // Functions:
  const requestContactsPermission = async (options = { getContactsAfterGrant: true }) => {
    const _contactsPermission = await Contacts.requestPermissionsAsync()
    setLocationPermission(_contactsPermission)
    if (_contactsPermission.status === Contacts.PermissionStatus.GRANTED) {
      setPermission(true)
      if (options.getContactsAfterGrant) await getContacts()
    }
    else setErrorPrompt(USE_CONTACTS_ERRORS.PERMISSION_DENIED)
  }

  const getContacts = async () => {
    try {
      if (contactsPermission?.granted || contactsPermission?.status === Contacts.PermissionStatus.GRANTED) {
        const fetchedContacts = (await Contacts.getContactsAsync({
          fields: [ Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails ],
        }))
          .data
          .filter(contact => {
            if (contact.phoneNumbers) if (contact.phoneNumbers[0].number) return phone(contact.phoneNumbers[0].number).isValid
            else return false
          })
          .filter(contact => {
            const contactPhoneNumber = phone(contact.phoneNumbers?.[0].number as string).phoneNumber
            if (contactPhoneNumber !== null) return true
            return false
          }) as Contact[]
        setContacts(fetchedContacts)
        return fetchedContacts
      } else {
        if (contactsPermission?.canAskAgain) await requestContactsPermission()
        else setErrorPrompt(USE_CONTACTS_ERRORS.PERMISSION_DENIED)
        return []
      }
    } catch(e) {
      setErrorPrompt(USE_CONTACTS_ERRORS.GENERIC(e as Error))
      return []
    }
  }

  return {
    contacts,
    errorPrompt,
    permission,
    requestContactsPermission,
    getContacts
  }
}


// Exports:
export default useContacts
