import {View, Text} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import React from 'react';
import {Colors} from '../colors';

const CustomTopBar = ({navigation, title, showBackButton, rightComponent}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        marginVertical: 24,
        marginHorizontal: 8,
      }}>
      {showBackButton ? (
        <ChevronLeftIcon
          color={Colors.BLACK}
          style={{position: 'absolute', alignSelf: 'flex-start'}}
          onPress={() => navigation.goBack()}
        />
      ) : (
        <></>
      )}
      <Text
        style={{
          position: 'absolute',
          color: Colors.BLACK,
          fontSize: 18,
          fontWeight: '500',
          alignSelf: 'center',
        }}>
        {title}
      </Text>
      {rightComponent}
    </View>
  );
};

export default CustomTopBar;
