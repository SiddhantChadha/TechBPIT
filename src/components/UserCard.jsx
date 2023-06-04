import {View, Text, Image} from 'react-native';
import React from 'react';
import {Colors} from '../colors';

const UserCard = ({itemData}) => {
  return (
    <View className="bg-white ">
      <View className="flex-row items-center shadow-lg p-4 bg-white rounded-lg">
        <Image
          source={{
            uri: itemData.image,
          }}
          className="rounded-full w-12 h-12"
        />
        <Text className="text-black text-lg px-4">{itemData.username}</Text>
      </View>
      <View
        style={{
          borderColor: Colors.GREY_70,
          borderBottomWidth: 1,
          marginLeft: 64,
          marginRight: 24,
        }}
      />
    </View>
  );
};

export default UserCard;
