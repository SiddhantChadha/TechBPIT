import React, {useEffect, useState} from 'react';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OTPScreen from './src/screens/OTPScreen';
import SignupScreen from './src/screens/SignupScreen';

import {Colors} from './src/colors';
import {getAccessToken, getSelfId} from './src/EncryptedStorageHelper';
import {LoggedInContext} from './src/context/LoggedInContext';
import {loggedInStateSetter} from './src/APIController/controller';
import ProfileScreen from './src/screens/ProfileScreen';
import RecentChatScreen from './src/screens/RecentChatScreen';
import SetupProfileScreen from './src/screens/SetupProfileScreen';
import {StatusBar} from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import {UserContext} from './src/context/UserIdContext';
import HomeTabs from './src/components/HomeTabs';
const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selfId, setSelfId] = useState(null);
  const checkIfLoggedIn = async () => {
    if ((await getAccessToken()) != null) {
      setSelfId(await getSelfId());
      setIsLoggedIn(true);
    }
  };
  loggedInStateSetter(setIsLoggedIn);
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <LoggedInContext.Provider value={setIsLoggedIn}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={Colors.PRIMARY_BLUE}
      />
      <NavigationContainer>
        {isLoggedIn ? (
          <UserContext.Provider value={selfId}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="HomeTabs" component={HomeTabs} />
              <Stack.Screen name="RecentChat" component={RecentChatScreen} />
              <Stack.Screen
                name="SetupProfile"
                component={SetupProfileScreen}
              />
              <Stack.Screen name="Chat" component={ChatScreen} />
              <Stack.Screen name="ViewUserProfile" component={ProfileScreen} />
            </Stack.Navigator>
          </UserContext.Provider>
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Otp" component={OTPScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </LoggedInContext.Provider>
  );
};

export default App;
