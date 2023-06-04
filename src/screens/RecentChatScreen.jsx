import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomTopBar from '../components/CustomTopBar';
import {PlusIcon} from 'react-native-heroicons/outline';
import {Colors} from '../colors';
import {Text, ScrollView} from 'react-native';
import PersonalRecent from './PersonalRecent';
import GroupRecent from './GroupRecent';

const Tab = createMaterialTopTabNavigator();

const RecentChatScreen = ({navigation}) => {
  const newChatButton = (
    <PlusIcon
      color={Colors.BLACK}
      style={{position: 'absolute', alignSelf: 'flex-end'}}
      onPress={() => navigation.navigate('StartNewChat')}
    />
  );
  return (
    <>
      <CustomTopBar title={'Recent Chats'} rightComponent={newChatButton} />
      <Tab.Navigator>
        <Tab.Screen name="Personal" component={PersonalRecent} />
        <Tab.Screen name="Groups" component={GroupRecent} />
      </Tab.Navigator>
    </>
  );
};

export default RecentChatScreen;
