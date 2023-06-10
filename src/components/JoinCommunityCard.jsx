import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';

const JoinCommunityCard = ({item, navigation}) => {
  const itemData = item.item;

  return (
    <View className="p-4 rounded-lg shadow-lg my-4 mx-6 bg-white w-11/12">
      <View className="flex-row justify-between">
        <View className="flex-row items-center">
          <Image
            source={{
              uri: itemData.image,
            }}
            className="w-12 h-12 rounded-full"
          />
          <Text className="m-4 text-base font-semibold text-black">
            {itemData.groupName}
          </Text>
        </View>
        <View>
          <Text className="bg-gray-500 text-white px-2 py-1 rounded-lg text-sm">
            Join
          </Text>
        </View>
      </View>
      <Pressable
        onPress={() =>
          navigation.navigate('CommunityDetail', {
            name: itemData.groupName,
            id: itemData._id,
          })
        }>
        <Text className="self-center mt-2 text-sm" numberOfLines={2}>
          {itemData.description}
        </Text>
        <Text className="self-center mt-2 font-semibold">
          Joined by: {itemData.totalUsers} student(s)
        </Text>
      </Pressable>
    </View>
  );
};

export default JoinCommunityCard;
