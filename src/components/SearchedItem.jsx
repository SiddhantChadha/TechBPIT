import {View, Text, Image} from 'react-native';
import React from 'react';

const SearchedItem = ({item}) => {
  const itemData = item.item;
  console.log('ye h jo h', itemData);
  return (
    <View className="flex-row items-center shadow-lg m-4 p-4 bg-white rounded-lg">
      <Image
        source={{
          uri: itemData.image,
        }}
        className="rounded-full w-12 h-12"
      />
      <Text className="text-black text-lg px-4">{itemData.groupName}</Text>
    </View>
  );
};

export default SearchedItem;
