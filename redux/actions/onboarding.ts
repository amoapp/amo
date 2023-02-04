// Packages:
import { createAsyncThunk } from '@reduxjs/toolkit'
import database from '@react-native-firebase/database'


// Typescript:
import { Contact } from '../../types'
import { ActionResult } from '../types'
export type ONBOARDING_ACTION_TYPE = typeof SEGREGATE_CONTACTS
export type ONBOARDING_PAYLOAD_TYPE = Contact[]


// Constants:
import { DATABASE_REFERENCES } from '../../firebase/references'
export const SEGREGATE_CONTACTS = 'SEGREGATE_CONTACTS'


// Functions:
/**
 * Segregates contacts based on whether the contact is on Amo or not.
 * Passes segregated contacts to the userReducer.
 */
export const segregateContacts = createAsyncThunk<
  ActionResult<typeof SEGREGATE_CONTACTS, Contact[]>,
  Contact[]
>(SEGREGATE_CONTACTS, async (contacts) => {
  for await (const contact of contacts) {
    const contactSnapshot = await database().ref(`${ DATABASE_REFERENCES.USERS }/${ contact.phoneNumber }`).once('value')
    if (contactSnapshot.exists()) contact.isOnAmo = true
    else contact.isOnAmo = false
  }
  return { type: SEGREGATE_CONTACTS, payload: contacts }
})
