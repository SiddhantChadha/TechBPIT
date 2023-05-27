import {View, Text, Image} from 'react-native';
import React from 'react';

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

function convertToLocalTime(timestamp){
  const d = new Date(Number(timestamp));
  let result='';
  
  if(d.getHours()%12 > 0 ){
    result += '0' + d.getHours()%12 + ':' + (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()) + ' pm';
  }else{
    result += d.getHours() + ':' + (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()) + ' am';
  }

  return result;
}

export default ChatThreadCard;
