import {View, Text} from 'react-native';
import {
  ChatBubbleLeftIcon,
  ChevronLeftIcon,
} from 'react-native-heroicons/outline';
import React from 'react';
import {Colors} from '../colors';

const CustomTopBar = ({navigation, title}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginVertical: 24,
        marginHorizontal: 8,
      }}>
      <ChevronLeftIcon
        color={Colors.BLACK}
        style={{position: 'absolute', alignSelf: 'flex-start'}}
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
      <ChatBubbleLeftIcon
        color={Colors.BLACK}
        style={{position: 'absolute', alignSelf: 'flex-end'}}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default CustomTopBar;
