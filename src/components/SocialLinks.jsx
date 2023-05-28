import {View, Text, Image} from 'react-native';
import React from 'react';

const SocialLinks = ({image,link}) => {
  return (
    <View className="flex-row m-1 items-center">
      <Image
        source={{
          uri: image,
        }}
        className="w-6 h-6"
      />
      <Text className="mx-3 my-1 text-base text-blue-500">
        {link}
      </Text>
    </View>
  );
};

export default SocialLinks;
