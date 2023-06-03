import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';

const PeopleMayKnowCard = ({item}) => {
  const itemData = item.item;
  console.log('aa gya items', itemData);
  return (
    <View className="w-1/2">
      <View className="rounded-lg shadow-lg bg-white p-4 m-2 items-center justify-center flex-1">
        <Image
          source={{
            uri: itemData.image,
          }}
          className="rounded-full w-12 h-12"
        />
        <Text className="text-black text-base mt-2 text-center">
          {itemData.username}
        </Text>
        <Text className="mt-2 text-center text-ellipsis" numberOfLines={2}>
          {itemData.about}
        </Text>
        <View>
          <Text className="bg-white text-blue-500 px-2 py-1 rounded-lg border border-blue-500 text-sm mt-2">
            Message
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PeopleMayKnowCard;
