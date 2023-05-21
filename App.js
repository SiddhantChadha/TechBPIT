import React, {useEffect, useState} from 'react';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OTPScreen from './src/screens/OTPScreen';
import SignupScreen from './src/screens/SignupScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  UserIcon,
  HomeIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {Colors} from './src/colors';
import HomeScreen from './src/screens/HomeScreen';
import {getAccessToken} from './src/EncryptedStorageHelper';
import {LoggedInContext} from './src/context/LoggedInContext';
import {loggedInStateSetter} from './src/APIController/controller';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkIfLoggedIn = async () => {
    if ((await getAccessToken()) != null) {
      setIsLoggedIn(true);
    }
  };
  loggedInStateSetter(setIsLoggedIn);
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <LoggedInContext.Provider value={setIsLoggedIn}>
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarInactiveTintColor: Colors.BLACK,
              tabBarLabelPosition: 'beside-icon',
            }}
            shifting={true}
            >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: () => {
                  return <HomeIcon color={Colors.BLACK} />;
                },
              }}
            />
            <Tab.Screen
              name="Explore"
              component={HomeScreen}
              options={{
                tabBarIcon: () => {
                  return <MagnifyingGlassIcon color={Colors.BLACK} />;
                },
              }}
            />
            <Tab.Screen
              name="Events"
              component={HomeScreen}
              options={{
                tabBarIcon: () => {
                  return <CalendarDaysIcon color={Colors.BLACK} />;
                },
              }}
            />
            <Tab.Screen
              name="Profile"
              component={HomeScreen}
              options={{
                tabBarIcon: ({color}) => {
                  return <UserIcon color={color} />;
                },
              }}
            />
          </Tab.Navigator>
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