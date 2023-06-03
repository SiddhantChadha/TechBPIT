import {View, Text, Image} from 'react-native';
import React from 'react';

const ProjectCard = ({item}) => {
  console.log('data aa gya', item);
  const itemData = item.item;
  return (
    <View className="mx-1 my-4 rounded-xl shadow-xl bg-white">
      <Image
        source={{
          uri: itemData.image
            ? itemData.image
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROA1nkRAnQd11TU_uwpvfyM9mvkcw_FsgsvQ&usqp=CAU',
        }}
        className="w-full aspect-video rounded-t-xl"
      />
      <Text className="text-lg text-black mx-4 my-1">{itemData.title}</Text>
      <Text className="text-base text-gray-500 mx-4 mb-3">
        {itemData.duration}
      </Text>
    </View>
  );
};

export default ProjectCard;
