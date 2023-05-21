import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProfileScreen from './ProfileScreen';
import EventScreen from './EventScreen';

const Tab = createMaterialTopTabNavigator();

const RecentChatScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Personal" component={ProfileScreen} />
      <Tab.Screen name="Groups" component={EventScreen} />
    </Tab.Navigator>
  );
};

export default RecentChatScreen;
