import React from "react";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
    UserIcon,
    HomeIcon,
    CalendarDaysIcon,
    MagnifyingGlassIcon,
  } from 'react-native-heroicons/outline';

import { Colors } from "../colors";
import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EventScreen from "../screens/EventScreen";
import useUser from "../hooks/useUser";

const Tab = createMaterialBottomTabNavigator();

const HomeTabs = ()=>{
  const selfId = useUser();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: Colors.BLACK,
        tabBarLabelPosition: 'beside-icon',
      }}
      shifting={true}>
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
        component={ExploreScreen}
        options={{
          tabBarIcon: () => {
            return <MagnifyingGlassIcon color={Colors.BLACK} />;
          },
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventScreen}
        options={{
          tabBarIcon: () => {
            return <CalendarDaysIcon color={Colors.BLACK} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        initialParams={{id:selfId,test:"test"}}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <UserIcon color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeTabs;