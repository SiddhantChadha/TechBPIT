import {View, Text, Image} from 'react-native';
import React from 'react';
import {convertToLocalTime} from '../Utils/DateTimeUtils';

const ChatThreadCard = ({id, name, image, lastMessage}) => {
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
          {lastMessage && lastMessage.msgType === 'direct-message' ? (
            id === lastMessage.sender ? (
              <Text>
                {name} : {lastMessage.message}
              </Text>
            ) : (
              <Text>You : {lastMessage.message}</Text>
            )
          ) : lastMessage &&
            lastMessage.msgType === 'direct-message-with-image' ? (
            id === lastMessage.sender ? (
              <Text>{name} : Image</Text>
            ) : (
              <Text>You : Image</Text>
            )
          ) : lastMessage && lastMessage.msgType === 'group-message' ? (
            <Text>
              {lastMessage.sender.username} : {lastMessage.message}
            </Text>
          ) : lastMessage &&
            lastMessage.msgType === 'group-message-with-image' ? (
            <Text>{lastMessage.sender.username} : Image</Text>
          ) : (
            <></>
          )}
        </View>
      </View>
      <View>
        <Text className="text-GRAY_70 text-md flex-1">
          {lastMessage && convertToLocalTime(lastMessage.timestamp)}
        </Text>
      </View>
    </View>
  );
};

export default ChatThreadCard;
