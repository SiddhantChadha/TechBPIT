import {View, Text, Image,Pressable} from 'react-native';
import React from 'react';
import {Colors} from '../colors';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';

const ChatThreadHeader = ({navigation, name, image, typing}) => {
  return (
    <View className="flex-row items-center bg-primary_blue py-2 px-4 flex-wrap mb-2">
      <ArrowLeftIcon color={Colors.WHITE} onPress={() => navigation.goBack()} />
      
      <Image
        source={{
          uri: image,
        }}
        className="rounded-full h-14 w-14 bg-black mx-4"
      />
      <View className="flex-wrap ">
        <Text className="text-white font-medium text-lg">{name}</Text>
        {typing ? (
          <Text className="text-white text-xs">{typing}</Text>
        ) : (
          <View />
        )}
      </View>
    
    </View>
  );
};

export default ChatThreadHeader;
