import React from 'react';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OTPScreen from './src/screens/OTPScreen';
import SignupScreen from './src/screens/SignupScreen';
import EventItem from './src/components/EventItem';
import EventPostItem from './src/components/EventPostItem';
import PostDetailsScreen from './src/screens/PostDetailsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ChevronLeftIcon,
  UserIcon,
  HomeIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {Colors} from './src/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     initialRouteName="Welcome"
    //     screenOptions={{headerShown: false}}>
    //     <Stack.Screen name="Welcome" component={WelcomeScreen} />
    //     <Stack.Screen name="Login" component={LoginScreen} />
    //     <Stack.Screen name="Otp" component={OTPScreen} />
    //     <Stack.Screen name="Signup" component={SignupScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: Colors.BLACK,
        }}>
        <Tab.Screen
          name="Home"
          component={WelcomeScreen}
          options={{
            tabBarIcon: () => {
              return <HomeIcon color={Colors.BLACK} />;
            },
          }}
        />
        <Tab.Screen
          name="Explore"
          component={SignupScreen}
          options={{
            tabBarIcon: () => {
              return <MagnifyingGlassIcon color={Colors.BLACK} />;
            },
          }}
        />

        <Tab.Screen
          name="Events"
          component={OTPScreen}
          options={{
            tabBarIcon: () => {
              return <CalendarDaysIcon color={Colors.BLACK} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={OTPScreen}
          options={{
            tabBarActiveTintColor: 'blue',
            tabBarIcon: ({focused, color, size}) => {
              return <UserIcon color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
