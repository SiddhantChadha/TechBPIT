import {View, Text, Image} from 'react-native';
import React from 'react';

const ChatThreadCard = ({obj}) => {
  return (
    <View className="flex flex-row bg-white p-3">
      <View className="">
        <Image
          source={{
            uri: obj.image,
          }}
          className="rounded-full h-14 w-14 bg-black"
        />
      </View>

      <View className="flex">
        <Text className="text-black text-lg">{obj.username}</Text>
        <Text>You:Image</Text>
      </View>
      <View className="self-end">
        <Text className="text-GRAY_70 text-md flex-1">
          {obj.lastMessage.timestamp}
        </Text>
      </View>
    </View>
  );
};

export default ChatThreadCard;
