import React from 'react';
import {View} from 'react-native';
import {Colors} from '../colors';

const HorizontalLine = () => {
  return (
    <View
      style={{
        borderColor: Colors.GREY_70,
        borderBottomWidth: 1,
        marginVertical: 10,
      }}
    />
  );
};

export default HorizontalLine;
