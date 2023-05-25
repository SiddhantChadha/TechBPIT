import {View, Text, Image} from 'react-native';
import React from 'react';
import InputBox from './InputBox';

const AddSkillsInput = ({icon, title}) => {
  return (
    <View>
      <View className="flex-row mx-8 items-center -mb-2">
        <Image
          source={{
            uri: icon,
          }}
          className="w-5 aspect-square rounded-full"
        />
        <Text className="mx-2 text-sm">{title}</Text>
      </View>
      <InputBox placeholder="Add Link" />
    </View>
  );
};

export default AddSkillsInput;
