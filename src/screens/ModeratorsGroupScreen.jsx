import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchedItem from '../components/SearchedItem';
import CustomTopBar from '../components/CustomTopBar';

const ModeratorsGroupScreen = ({navigation}) => {
  return (
    <View>
      <CustomTopBar
        title={'Manage Groups'}
        showBackButton={true}
        navigation={navigation}
      />
    </View>
  );
};

export default ModeratorsGroupScreen;
