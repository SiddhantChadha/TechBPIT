
import React from 'react'
import LoginScreen from './src/screens/LoginScreen'
import WelcomeScreen from './src/screens/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}}>
      <Stack.Screen name ="Welcome" component={WelcomeScreen}/>
      <Stack.Screen name ="Login" component={LoginScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App