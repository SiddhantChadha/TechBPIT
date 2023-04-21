import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostDetailsScreen from './src/screens/PostDetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Colors } from './src/colors';
import ExploreScreen from './src/screens/ExploreScreen';
import EventScreen from './src/screens/EventScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
        initialRouteName="Home"
        activeColor={Colors.PRIMARY_BLUE}
        inactiveColor={Colors.GREEN}
        barStyle={{backgroundColor: Colors.WHITE}}
        shifting={true}
       
        >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Events" component={EventScreen} />
        <Tab.Screen
          name="Profile"
          component={PostDetailsScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" color={Colors.GREEN} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
