import {View, Text} from 'react-native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import React from 'react';
import {Colors} from '../colors';

const CustomTopBar = ({
  navigation,
  title,
  showBackButton,
  rightComponent,
  leftComponent,
  showLeftComponent,
}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        marginBottom: 24,
        marginTop: 36,
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
      {leftComponent}
      {rightComponent}
    </View>
  );
};

export default CustomTopBar;
