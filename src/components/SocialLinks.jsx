import {View, Text, Image} from 'react-native';
import React from 'react';

const SocialLinks = () => {
  return (
    <View className="flex-row m-1 items-center">
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
        }}
        className="w-6 h-6"
      />
      <Text className="mx-3 my-1 text-base text-blue-500">
        https://twitter.com/home
      </Text>
    </View>
  );
};

export default SocialLinks;
