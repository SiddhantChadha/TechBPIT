import {View, Text} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import React from 'react';
import {Colors} from '../colors';

const CustomTopBar = ({navigation, title}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', marginVertical: 24}}>
      <ChevronLeftIcon
        color={Colors.BLACK}
        style={{position: 'absolute'}}
        onPress={() => navigation.goBack()}
      />
      <Text
        style={{
          color: Colors.BLACK,
          fontSize: 18,
          fontWeight: '600',
          alignSelf: 'center',
          marginHorizontal: '20%',
        }}>
        {title}
      </Text>
      <ChevronLeftIcon
        color={Colors.GREEN}
        style={{position: 'absolute'}}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default CustomTopBar;
