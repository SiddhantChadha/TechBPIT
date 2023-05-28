import {View, Text, Image} from 'react-native';
import React from 'react';
import { convertToLocalTime } from '../Utils/DateTimeUtils';

const ChatThreadCard = ({id,name,image,lastMessage}) => {
  return (
    <View className="flex flex-row bg-white p-3">
      <View className="">
        <Image
          source={{
            uri: image,
          }}
          className="rounded-full h-14 w-14 bg-black"
        />
      </View>

      <View className="flex-grow mx-3">
        <Text className="text-black text-lg">{name}</Text>
        <View className="flex flex-row">
          {(lastMessage.msgType==='direct-message' || lastMessage.msgType==='direct-message-with-image')?
          (id === lastMessage.sender) ? (
            <Text>{name} : </Text>
          ) : (
            <Text>You : </Text>
          ):<Text>{lastMessage.sender.username} : </Text>}
          {(lastMessage.msgType === 'direct-message' || lastMessage.msgType==='group-message') ? (
            <Text>{lastMessage.message}</Text>
          ) : (
            <Text>Image</Text>
          )}
        </View>
      </View>
      <View>
        <Text className="text-GRAY_70 text-md flex-1">
          {convertToLocalTime(lastMessage.timestamp)}
        </Text>
      </View>
    </View>
  );
};


export default ChatThreadCard;
