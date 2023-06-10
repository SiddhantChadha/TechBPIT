import {Pressable, Text} from 'react-native';
import React from 'react';

const CustomButton = props => {
  return (
    <Pressable
      style={{elevation: 3}}
      onPress={props.onPress}
      className="flex flex-row items-center justify-center py-4 px-8 mx-[10%] my-[5%] bg-primary_blue rounded-lg">
      {props.icon}
      <Text
        className="text-lg font-semibold text-white"
        style={{letterSpacing: 0.25}}>
        {props.title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
