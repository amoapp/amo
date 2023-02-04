// Typescript:
export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNSPECIFIED = ''
}


// Exports:
export const DEFAULT_DATABASE_USER = {
  username: '',
  profilePicture: '',
  impressions: 0,
  interactions: 0,
  gender: GENDER.UNSPECIFIED,
  verified: false
}

export const DEFAULT_FIRESTORE_USER = {
  username: '',
  name: '',
  email: '',
  phoneNumber: '',
  geo: {
    latitude: 0,
    longitude: 0,
  },
  impressions: {
    poll: 0,
    profile: 0
  },
  interactions: {
    poll: 0,
    profile: {
      feed: 0
    }
  },
  notifications: {
    list: [],
    unreadCount: 0
  },
  gender: GENDER.UNSPECIFIED
}