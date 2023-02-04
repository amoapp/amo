// Packages:
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import {
  useFonts,
  UbuntuCondensed_400Regular
} from '@expo-google-fonts/ubuntu-condensed'
import { setCustomText } from 'react-native-global-props'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { store } from '@store/index'


// Constants:
import ROUTES from '@routes'


// Functions:
const Stack = createNativeStackNavigator()

const AppLoading = () => {
  return (
    <View>
      <Text>Loading..</Text>
    </View>
  )
}

const App = () => {
  // State:
  const [ fontsLoaded ] = useFonts({
    UbuntuCondensed_400Regular
  })
  const [ authUser, setAuthUser ] = useState<false | FirebaseAuthTypes.User | null>(false)
  const [ customComponentsSet, setCustomComponentsSet ] = useState(false)
  
  // Effects:
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) setAuthUser(user)
      else setAuthUser(null)
    })
    return subscriber
  }, [])

  useEffect(() => {
    if (fontsLoaded && !customComponentsSet) {
      setCustomText({ style: { fontFamily: 'UbuntuCondensed_400Regular' } })
      setCustomComponentsSet(true)
    }
  }, [ fontsLoaded, customComponentsSet ])

  // Return:
  if ([ fontsLoaded, authUser ].includes(false)) {
    return <AppLoading />
  } else {
    return (
      <Provider store={ store }>
        <NavigationContainer>
          <Stack.Navigator>
            { Object.values(ROUTES).map(route => <Stack.Screen { ...route } />) }
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}


// Exports:
export default App
