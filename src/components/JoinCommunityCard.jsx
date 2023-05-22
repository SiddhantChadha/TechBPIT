import {View, Text, Image} from 'react-native';
import React from 'react';

const JoinCommunityCard = () => {
  return (
    <View className="p-4 rounded-lg shadow-lg my-4 mx-6 bg-gray-50 w-11/12">
      <View className="flex-row justify-between">
        <View className="flex-row items-center">
          <Image
            source={{
              uri: 'https://i.pinimg.com/736x/44/9d/d1/449dd1f38a8bd87b41f7b960db0fefff--mobile-ui-ux.jpg',
            }}
            className="w-12 h-12 rounded-full"
          />
          <Text className="m-4 text-base font-semibold text-black">
            UI Development
          </Text>
        </View>
        <View>
          <Text className="bg-gray-500 text-white px-2 py-1 rounded-lg text-sm">
            Join
          </Text>
        </View>
      </View>
      <Text className="self-center mt-2 text-sm" numberOfLines={2}>
        The Ui Development aims to create an interface that behaves as users
        would expected. The Ui Development aims to create an interface that
        behaves as users would expected.
      </Text>
      <Text className="self-center mt-2 font-semibold">
        Joined by: {'5'} student(s)
      </Text>
    </View>
  );
};

export default JoinCommunityCard;
