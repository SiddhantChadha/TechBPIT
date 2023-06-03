import {View, Text, Image, Dimensions, Pressable} from 'react-native';
import React from 'react';

const PeopleMayKnowCard = ({item, navigation}) => {
  const itemData = item.item;
  console.log('aa gya items', itemData);
  return (
    <View className="w-1/2">
      <View className="rounded-lg shadow-lg bg-white p-4 m-2 items-center justify-center flex-1">
        <Pressable
          onPress={() =>
            navigation.navigate('ViewUserProfile', {
              id: itemData._id,
              name: itemData.username,
            })
          }>
          <Image
            source={{
              uri: itemData.image,
            }}
            className="rounded-full w-12 h-12"
          />
        </Pressable>
        <Text className="text-black text-base mt-2 text-center">
          {itemData.username}
        </Text>
        <Text className="mt-2 text-center text-ellipsis" numberOfLines={2}>
          {itemData.about}
        </Text>
        <View>
          <Pressable
            onPress={() =>
              navigation.navigate('Chat', {
                id: itemData._id,
                image: itemData.image,
                name: itemData.username,
              })
            }>
            <Text className="bg-white text-blue-500 px-2 py-1 rounded-lg border border-blue-500 text-sm mt-2">
              Message
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PeopleMayKnowCard;
